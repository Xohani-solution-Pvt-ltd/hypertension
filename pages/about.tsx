import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import { APP_INFO } from "../environments/index";
import Loading from "../components/Loading";
import React, { useState, useEffect } from "react";
// import styles from "./about.module.css"; // Import your CSS module

export default function About() {
  const { TITLE } = APP_INFO;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout title={`About | ${TITLE}`}>
      <Container
        className="d-flex justify-content-center pt-5"
        fluid
        style={{ marginTop: "60px" }}
      >
        <div className="wrapper">
          <h1 className="text-center" style={{ color: "#ed6436" }}>
            About us
          </h1>
          <main className="d-flex justify-content-center mt-8 font-primary">
            <p className="font-primary hover:underline text-secondary-300 pt-5">
              Welcome to our platform dedicated to optimizing hypertension
              treatment through technology. We leverage AI algorithms to provide
              personalized risk assessments, treatment optimization, and remote
              monitoring solutions. Our goal is to empower patients and
              healthcare providers with innovative tools for better blood
              pressure control and improved health outcomes.
            </p>
          </main>
        </div>
      </Container>
    </Layout>
  );
}
