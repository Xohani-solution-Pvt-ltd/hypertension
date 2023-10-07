import React from "react";
import Layout from "../components/Layout";
import { APP_INFO } from "../environments/index";
import { Container } from 'react-bootstrap';
import Loading from "../components/Loading";
import { useState, useEffect } from "react";



export default function contact() {
  const { TITLE } = APP_INFO;


  return (
    <Layout title={`Contact | ${TITLE}`}>
      <Container className="mt-8 d-flex justify-content-center">
          <h1 className="font-primary text-secondary-300">
            Contact
          </h1>
      </Container>
    </Layout>
  );
}
