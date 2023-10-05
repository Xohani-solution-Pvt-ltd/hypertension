import React from "react";
import Layout from "../components/Layout";
import { APP_INFO } from "../environments/index";
import { Container } from 'react-bootstrap';
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";



export default function contact() {
  const [loading, setLoading] = useState(true);
  const { TITLE } = APP_INFO;

  useEffect(() => {
    // Simulate page loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout title={`Contact | ${TITLE}`}>
      <Container className="mt-8 d-flex justify-content-center">
        {loading ? (
          <BeatLoader color="#039dfc" size={20} />
        ) : (
          <h1 className="font-primary text-secondary-300">
            Contact
          </h1>
        )
        }
      </Container>
    </Layout>
  );
}
