import React from "react";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { SOCIAL_URL, APP_INFO } from "../environments/index";
import Image from "next/image";
import { useState } from "react";
import { Twitter, Instagram, Youtube, Clock, Key } from "react-bootstrap-icons";
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
    <section>
      <footer className="d-flex align-items-end bg-gray">
        <Container fluid className="pt-5 pb-3">
          <Row className="gap-15 md:gap-4 foot-res">
            <Col md={3} className="">
              <h5 className="mb-3 text-sm font-semibold text-primary-300 uppercase">
                <Image
                  src={LockPrimaryImg}
                  className="cursor-pointer"
                  width={30}
                  height={30}
                  alt="lock image"
                />
                Hypertension
                <div className="d-flex foot-res">
                  <div className="social-icon">
                    <a
                      href="https://twitter.com"
                      className="twitter me-3 tfiy-icons "
                    >
                      <i className="fab fa-twitter ">
                        <Twitter />
                      </i>
                    </a>
                    <a
                      href="https://instagram.com"
                      className="instagram me-3 tfiy-icons"
                    >
                      <i className="fab fa-instagram"></i>
                      <Instagram />
                    </a>
                    <a
                      href="https://youtube.com"
                      className="youtube me-3 tfiy-icons"
                    >
                      <i className="fab fa-youtube">
                        <Youtube />
                      </i>
                    </a>
                  </div>
                </div>
              </h5>
            </Col>
            <Col md={3} className="foot-res">
              <h2 className="mb-3 text-sm font-semibold font-color">About</h2>
              <div className="item-wrap">
                <h6>
                  <i className="fab fa-key">
                    <Key /> PO BOX Collins Street West
                  </i>
                </h6>
              </div>
              <div className="item-wrap">
                <h6>
                  <i className="fab fa-clock">
                    <Clock /> +2342 5446 67
                  </i>
                </h6>
              </div>
              <div className="item-wrap">
                <h6>
                  <i className="fab fa-pinfill">Mon - Sun: 8AM - 8PM</i>
                </h6>
              </div>
            </Col>
            <Col md={3} className="foot-res">
              <h2 className="mb-3 text-sm font-semibold font-color">
                Our Links
              </h2>
              <ul
                className="text-secondary-300"
                style={{ listStyleType: "none" }}
              >
                <li className="mb-2">
                  <Link href="/about" className="link-color mouse-hover">
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="link-color mouse-hover">
                    Careers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="link-color mouse-hover">
                    Blog
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3} className="flex justify-center items-center">
              <div className="flex items-center">
                <div className="max-w-[40px] sm:max-w-[70px] foot-res">
                  <h2 className="mb-3 text-sm font-semibold font-color">
                    Newsletter
                  </h2>
                  <div className="font-primary text-secondary-300 hover:underline">
                    <span className="text-xs text-secondary-300">
                      <div className="container">
                        <Form>
                          <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
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
            </Col>
          </Row>
        </Container>
      </footer>
      <div className="footer">
        <Container className="d-flex justify-content-center" fluid>
          <span
            className="text-align-center mt-3"
            style={{ paddingBottom: "10px", color: "white" }}
          >
            <h3 style={{ fontSize: "22px" }}>
              {" "}
              © 2023 Hypertension All Rights Reserved.
            </h3>
          </span>
        </Container>
      </div>
    </section>
  );
}
