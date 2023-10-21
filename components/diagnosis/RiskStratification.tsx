import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Card, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const RiskStratification = ({ submit, preview }) => {

  const [riskOne, setRiskOne] = useState("Low Risk");
  const [riskTwo, setRiskTwo] = useState("Low Risk");
  const [riskThree, setRiskThree] = useState("Low Risk");
  const [riskFour, setRiskFour] = useState("Low Risk");
  const [isClient, setIsClient] = useState(false);

  const [criteria, setCriteria] = useState({
    'cva': false,
    'coronaryArteryDisease': false,
    'previousHeartAttacks': false,
    'breathlessness': false,
    'cad': false,
    'heartFailure': false,
    'ejectInterpretation': false,
    'hfrEF': false,
    'hfpeEF': false,
    'eGFR': undefined
  });

  const fetchCriteriaData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/allFetchData');
      const data = response.data;

      if (
        data &&
        data.data &&
        data.data.userData &&
        data.data.comorbiditiesData &&
        data.data.bloodTestData &&
        data.data.symptomsData
      ) {
        const userData = data.data.userData;
        const comorbiditiesData = data.data.comorbiditiesData;
        const bloodTestData = data.data.bloodTestData;
        const symptomsData = data.data.symptomsData;

        setCriteria((prevCriteria) => ({
          ...prevCriteria,
          'cva': comorbiditiesData.cva === true,
          'coronaryArteryDisease': comorbiditiesData.coronaryArteryDisease === true,
          'previousHeartAttacks': symptomsData.previousHeartAttacks === true,
          'breathlessness': symptomsData.breathlessness === true,
          'cad': bloodTestData.ejectionInterpretation === "CAD",
          'heartFailure': comorbiditiesData.heartFailure === true,
          'hfrEF': bloodTestData.ejectionInterpretation === "HfrEF",
          'hfpeEF': bloodTestData.ejectionInterpretation === "HfpeEF",
          'eGFR': bloodTestData.eGFRResult,
        }));
      } else {
        console.error("Required data properties are undefined");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCriteriaData();
    checkRisk1();
    checkRisk2();
    checkRisk3();
    checkRisk4();
  }, []);

  useEffect(() => {
    checkRisk1();
  }, [criteria]);

  const checkRisk1 = () => {

    let RiskOneLevel = 'Low Risk'

    if (criteria["cva"]) {
      RiskOneLevel = ("High Risk (Probable CVA)");
    }
    setRiskOne(RiskOneLevel)
  };

  useEffect(() => {
    checkRisk2();
  }, [criteria]);

  const checkRisk2 = () => {
    let RiskTwoLevel = 'Low Risk'
    if (
      criteria["coronaryArteryDisease"] ||
      criteria["previousHeartAttacks"] ||
      criteria["breathlessness"] ||
      criteria["cad"]
    ) {
      RiskTwoLevel = ("High Risk (Probable CAD)");
    }
    setRiskTwo(RiskTwoLevel)
  };

  useEffect(() => {
    checkRisk3();
  }, [criteria]);

  const checkRisk3 = () => {
    let RiskTHreeLevel = 'Low Risk'
    if (
      criteria["heartFailure"] ||
      criteria["breathlessness"] ||
      criteria["hfrEF"] ||
      criteria["hfpeEF"]
    ) {
      RiskTHreeLevel = ("High Risk (Probable Heart failure)");
    }
    setRiskThree(RiskTHreeLevel)
  };

  useEffect(() => {
    checkRisk4();
  }, [criteria]);

  const checkRisk4 = () => {
    let RiskFourLevel = 'Low Risk'
    if (criteria["eGFR"] < 60) {
      RiskFourLevel = ('High Risk (CKD)');
    }
    setRiskFour(RiskFourLevel)
  };

  useEffect(() => {
    setIsClient(true)
  }, []);

  return (
    <section>
      <h1 className="align_check">{isClient ? 'Risk Checker' : 'Prerendered'}</h1>
    <Container className="d-flex justify-content-center " fluid>
      <Row>
        <Card className=" border pt-5 bg-white" style={{ width: '50rem', height: '20rem' }}>
          <Row style={{ height: '140px', overflowX: 'hidden', overflowY: 'scroll' }} className="scrollable-container">
            <Col md={6}>
              <Row>
                <p>|<bdo />welcome</p>
                <p>|<bdo />patient</p>
                <p>|<bdo />symptoms</p>
                <p>|<bdo />Disease</p>
              </Row>
            </Col>
            <Col md={6}>
              <p><u>Risk One: {riskOne}</u></p>
              <p><u>Risk Two: {riskTwo}</u></p>
              <p><u>Risk Three: {riskThree}</u></p>
              <p><u>Risk Four: {riskFour}</u></p>
            </Col>
          </Row>
          <div className=" mt-4 pt-5">
            <button type="button" className=" text-start btn btn-primary " onClick={() => preview("bloodTest")}
            >Preview</button>
            <button type="submit" className=" float-end btn btn-primary" onClick={() => submit("contraindications")}
            >Submit</button>
          </div>
        </Card>
      </Row>
    </Container>
    </section>
  );
};
export default RiskStratification;
