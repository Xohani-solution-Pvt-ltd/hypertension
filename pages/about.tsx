import Layout from "../components/Layout";
import { Container } from 'react-bootstrap';
import { APP_INFO } from "../environments/index";
import Loading from "../components/Loading";
import React, { useState, useEffect } from 'react';


export default function about() {
  const { TITLE } = APP_INFO;

  return (
    <Layout title={`About | ${TITLE}`}>
      <Container className="d-flex justify-content-center" fluid>
        <div className="{styles.wrapper}">
            <main className="d-flex justify-content-center mt-8 font-primary">
              <h1 className="font-primary hover:underline text-secondary-300">
                About Page
              </h1>
            </main>
        </div>
      </Container>
    </Layout>
  );
}





