import React from "react";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { SOCIAL_URL, WEBSITE_LINK, APP_INFO } from "../environments/index";
import Image from "next/image";
import { useState } from "react";
import { Twitter, Facebook, Instagram, Youtube } from "react-bootstrap-icons";
import LockPrimaryImg from "../assets/images/lock-primary-100.png";

export default function Footer() {
  const { TITLE, DESCRIPTION } = APP_INFO;
  const [email, setEmail] = useState("");
  const { GITHUB_URL, INSTA_URL, FB_URL, TWITTER_URL, DISCORD_SERVER } =
    SOCIAL_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://hypertension.com/?email=${email}`, {
        method: "POST",
      });

      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Subscription successful!");
      } else {
        console.error("Subscription failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <footer className="d-flex align-items-end w-full bg-white-500 container-lg">
      <Container fluid>
        <Row className="gap-15 px-6 py-8 md:gap-4">
          <Col md={3}>
            <h2 className="mb-3 text-sm font-semibold text-primary-300 uppercase">
              Company
            </h2>
            <div className="container-fluid">
              <div className="social-icon gap-5 md:gap-5">
                <a href="https://twitter.com" className="twitter me-3">
                  <i className="fab fa-twitter">
                    <Twitter />
                  </i>
                </a>
                <a href="https://facebook.com" className="facebook me-3">
                  <i className="fab fa-facebook">
                    <Facebook />
                  </i>
                </a>
                <a href="https://instagram.com" className="instagram me-3">
                  <i className="fab fa-instagram"></i>
                  <Instagram />
                </a>
                <a href="https://youtube.com" className="youtube me-3">
                  <i className="fab fa-youtube">
                    <Youtube />
                  </i>
                </a>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <h2 className="mb-3 text-sm font-semibold text-danger-emphasis uppercase">
              Help center
            </h2>
          </Col>
          <Col md={3}>
            <h2 className="mb-3 text-sm font-semibold text-danger-emphasis uppercase">
              our links
            </h2>
            <ul className="text-secondary-300">
              <li className="mb-2">
                <Link href="/about" className="hover:underline text-xs">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline text-xs">
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:underline text-xs">
                  Blog
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="flex justify-center items-center">
            <div>
              <div className="flex items-center">
                <div className="max-w-[40px] sm:max-w-[70px]">
                  {/* <Image
                    src={LockPrimaryImg}
                    className="cursor-pointer"
                    width={70}
                    height={70}
                    alt="lock image"
                  /> */}
                  <div className="font-primary text-secondary-300 hover:underline">
                    <span className="text-xs text-secondary-300">
                      {/* form fillup  */}
                      <div className="container">
                        <Form>
                          <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                          <Button variant="primary" onClick={handleSubscribe}>
                            Subscribe
                          </Button>
                        </Form>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <div className=" border border-primary container-lg">
            <Container fluid className="d-flex justify-content-center ">
              <span className="text-align-center">
                <h3>
                  {" "}
                  © 2023 <a href={WEBSITE_LINK}>{TITLE}</a>. All Rights
                  Reserved.
                </h3>
              </span>
            </Container>
          </div>
        </Row>
      </Container>
    </footer>
  );
}
