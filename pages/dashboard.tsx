import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Nav, Tab, Card, Tabs } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { HouseExclamationFill, PersonFillUp } from 'react-bootstrap-icons';
import Layout from "../components/Layout";
import DisplayUser from "../components/DisplayUser";
import { useRouter } from "next/router";
import { AuthContext } from "../context/authentication";
import { APP_INFO } from "../environments/index";
import Diagnosis from "../components/diagnosis/Diagnosis";
import Comorbidities from "../components/diagnosis/Comorbidities";
import Symptoms from "../components/diagnosis/Symptoms";
import BloodTest from "../components/diagnosis/BloodTest";
import RiskStratification from "../components/diagnosis/RiskStratification";
import TreatmentModality from "../components/diagnosis/TreatmentModality";
import DecideContraindication from "../components/diagnosis/DecideContraindication";
import NoContraindication from "../components/diagnosis/NoContraindication";
import { LoginFormInterface, initialLoginValues } from "../interfaces/login";
import * as Yup from 'yup';
import { getCookie } from 'cookies-next';
import Link from "next/link";

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

const Dashboard = () => {
  const { isAuthenticated, userInfo, LoginToAccount } = useContext(AuthContext);
  const [diagnosisId, setDiagnosisId] = useState(undefined);
  const [activeTab, setActiveTab] = useState("diagnosis");
  const { TITLE } = APP_INFO;
  const router = useRouter();

  useEffect(() => {
    const id = getCookie('diagnosisId');
    setDiagnosisId(id);
  }, []);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleButtonClick = (submit) => {
    // Call the onSubmitLogic function with the necessary data
    setActiveTab(submit)
  };
  const handlePreButtonClick = (preview) => {
    setActiveTab(preview)
  };



  return (
    <Layout title={`Login | ${TITLE}`}>
      <section className="features1 cid-rGtBGu0BpJ" id="features5-11">
        <Container className="d-flex justify-content-center" fluid>
            <Row className="justify-content-center pt-5">
              <Tabs
                activeKey={activeTab}
                onSelect={handleTabChange}
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="diagnosis" title="Diagnosis">
                  <Diagnosis submit={handleButtonClick}  />
                </Tab>
                <Tab eventKey="comorbidities" title="Comorbidities" disabled={!diagnosisId}>
                  <Comorbidities submit={handleButtonClick} preview={handlePreButtonClick} />
                </Tab>
                <Tab eventKey="symptoms" title="Symptoms Monitoring" disabled={!diagnosisId}>
                  <Symptoms submit={handleButtonClick} preview={handlePreButtonClick}  />
                </Tab>
                <Tab eventKey="bloodTest" title="Blood Test" disabled={!diagnosisId}>
                  <BloodTest submit={handleButtonClick} preview={handlePreButtonClick} />
                </Tab>
                <Tab eventKey="stratification" title="Risk Stratification" disabled={!diagnosisId}>
                  <RiskStratification />
                </Tab>
                <Tab eventKey="contraindications" title="Contraindications" disabled={!diagnosisId}>
                  <DecideContraindication />
                </Tab>
                <Tab eventKey="treatment" title="Treatment" disabled={!diagnosisId}>
                  <TreatmentModality />
                </Tab>
              </Tabs>
            </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Dashboard;


