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
      <main className="justify-center mt-8 font-primary home-res">
        {isAuthenticated === true ? (
          <></>
        ) : (
          <section className="bg-white">
            <Container>
              <Row className="align-items-center body-content justify-content-xs-start justify-content-sm-between">
                <Col md={12} lg={5} className="content align-left py-4">
                  <h1 className="align-left pb-3 custom-font">My BP Coach</h1>
                  <p className="mbr-text pb-3 align-left display-7">
                    Do you have uncontrolled blood pressure records and regret
                    long waiting queues at a hospital, just for a 5 minute
                    consultation. Presenting digital personalized care your high
                    blood pressures at the click of your phone buttons.
                  </p>

                  <div className="align-left mbr-section-btn ">
                    <Button className="btn btn-md btn-primary" href="/signup">
                      CHECK NOW
                    </Button>
                  </div>
                </Col>
                <Col md={12} lg={5} className="py-4 img-res">
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
