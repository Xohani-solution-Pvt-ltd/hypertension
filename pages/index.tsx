import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { AuthContext } from "../context/authentication";
import { APP_INFO } from "../environments/index";
import Image from "next/image";
import artboardImg from "../assets/images/Artboard.svg";

const IndexPage = () => {
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const { TITLE } = APP_INFO;
  const router = useRouter();


  return (
    <Layout title={`Dashboard | ${TITLE}`}>
      <main className="justify-center mt-8 font-primary">
        {isAuthenticated === true ? (
          <></>
        ) : (
          <section className="bg-white">
            <Container className="py-4">
              <Row className="align-items-center body-content">
                <Col md={12} lg={5} className="content align-left py-4">
                  <h1 className="align-left pb-3 custom-font">
                    Hypertension Training School
                  </h1>
                  <p className="mbr-text pb-3 align-left display-7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu dui non diam eleifend egestas id a ligula.
                  </p>
                  <div className="align-wrap align-left">
                    <div className="icons-wrap">
                      <div className="icon-wrap">
                        <span className="mbr-iconfont mbrib-apple"></span>
                        <h3 className="icon-title mbr-bold display-7">EAT</h3>
                      </div>
                      <div className="icon-wrap">
                        <span className="mbr-iconfont mbrib-globe"></span>
                        <h3 className="icon-title mbr-bold display-7">PLAY</h3>
                      </div>
                      <div className="icon-wrap">
                        <span className="mbr-iconfont mbrib-github"></span>
                        <h3 className="icon-title mbr-bold display-7">BRUSH</h3>
                      </div>
                    </div>
                  </div>
                  <div className="align-left mbr-section-btn ">
                    <Button
                      className="btn btn-md btn-primary display-4 "
                      href="https://hypertension.co"
                    >
                      VIEW MORE
                    </Button>
                    <Button
                      className="btn btn-md btn-primary display-4"
                      href="https://hypertension.co"
                    >
                      BOOK NOW
                    </Button>
                  </div>
                </Col>
                <Col md={12} lg={5} className="content align-right py-4 artboard-img">
                  <Image
                    src={artboardImg}
                    height={450}
                    width={450}
                    alt="Hypertension"
                  />
                </Col>
              </Row>
            </Container>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default IndexPage;
