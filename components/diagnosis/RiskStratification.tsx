import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import { Card, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import RiskcheckerImg from '../../assets/images/Riskchecker.jpg';
import axios from "axios";

const RiskStratification = ({ submit, preview }) => {

  const [risk, setRisk] = useState(" ");


  const [criteria, setCriteria] = useState({
    'cva': false,
    'coronaryArteryDisease': false,
    'previousHeartAttacks': false,
    'breathlessness': false,
    'cad': false,
    'heartFailure': false,
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

      }
      else {
        console.error("Required data properties are undefined");
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCriteriaData();
    checkRisk();
  }, []);

  useEffect(() => {
    checkRisk();
  }, [criteria]);


  const checkRisk = () => {
    let RiskLevel = 'Low Risk';

    if (
      criteria["cva"] ||
      criteria["coronaryArteryDisease"] ||
      criteria["previousHeartAttacks"] ||
      criteria["breathlessness"] ||
      criteria["cad"] ||
      criteria["heartFailure"] ||
      criteria["hfrEF"] ||
      criteria["hfpeEF"] ||
      criteria["eGFR"]
    ) {
      RiskLevel = "High Risk";

      if (criteria["cva"]) {
        RiskLevel += " (Probable CVA)";
      }


      if (
        criteria["coronaryArteryDisease"] ||
        criteria["previousHeartAttacks"] ||
        criteria["breathlessness"] ||
        criteria["cad"]
      ) {
        RiskLevel += " (Probable CAD)";
      }


      if (
        criteria["heartFailure"] ||
        criteria["breathlessness"] ||
        criteria["hfrEF"] ||
        criteria["hfpeEF"]
      ) {
        RiskLevel += " (Probable Heart failure)";
      }


      if (criteria["eGFR"] < 60) {
        RiskLevel += " (Probable CKD)";
      }
    }


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
    <section className="bg-white">
      <h1 className="align_check">{isClient ? 'Risk Checker' : 'Prerendered'}</h1>
      <Container className="d-flex justify-content-center " fluid>
        <Row>
          <Card className=" border pt-5 bg-white" style={{ width: '50rem', height: '20rem' }}>
            <Row style={{ height: '140px' }} className="mx-5">
              <Col md={7}>
                <p>Risk One:--_________________________________________{riskOne}</p>
                <p>Risk Two:-__________________________________________{riskTwo}</p>
                <p>Risk Three:-_______________________________________{riskThree}</p>
                <p>Risk Four:-________________________________________ {riskFour}</p>
              </Col>
              <Col className="mb-5" md={5}>
                <Image
                  src={RiskcheckerImg}
                  height={300}
                  width={300}
                  alt="Hypertension"
                />
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







// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const RiskStratification = ({ submit, preview }) => {

//   const [riskOne, setRiskOne] = useState(" ");
//   const [riskTwo, setRiskTwo] = useState(" ");
//   const [riskThree, setRiskThree] = useState(" ");
//   const [riskFour, setRiskFour] = useState(" ");

//   const [criteria, setCriteria] = useState({
//     'cva': false,
//     'coronaryArteryDisease': false,
//     'previousHeartAttacks': false,
//     'breathlessness': false,
//     'cad': false,
//     'heartFailure': false,
//     'hfrEF': false,
//     'hfpeEF': false,
//     'eGFR': undefined
//   });

//   const fetchCriteriaData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/allFetchData');
//       const data = response.data;

//       if (
//         data &&
//         data.data &&
//         data.data.userData &&
//         data.data.comorbiditiesData &&
//         data.data.bloodTestData &&
//         data.data.symptomsData
//       ) {
//         const comorbiditiesData = data.data.comorbiditiesData;
//         const bloodTestData = data.data.bloodTestData;
//         const symptomsData = data.data.symptomsData;

//         setCriteria((prevCriteria) => ({
//           ...prevCriteria,
//           'cva': comorbiditiesData.cva === true,
//           'coronaryArteryDisease': comorbiditiesData.coronaryArteryDisease === true,
//           'previousHeartAttacks': symptomsData.previousHeartAttacks === true,
//           'breathlessness': symptomsData.breathlessness === true,
//           'cad': bloodTestData.ejectionInterpretation === "CAD",
//           'heartFailure': comorbiditiesData.heartFailure === true,
//           'hfrEF': bloodTestData.ejectionInterpretation === "HfrEF",
//           'hfpeEF': bloodTestData.ejectionInterpretation === "HfpeEF",
//           'eGFR': bloodTestData.eGFRResult,
//         }));
//       } else {
//         console.error("Required data properties are undefined");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCriteriaData();
//     checkRisk1();
//     checkRisk2();
//     checkRisk3();
//     checkRisk4();
//   }, []);

//   useEffect(() => {
//     checkRisk1();
//   }, [criteria]);

//   const checkRisk1 = () => {

//     let RiskOneLevel = 'Low Risk( Probable CVA )'

//     if (criteria["cva"]) {
//       RiskOneLevel = ("High Risk ( Probable CVA )");
//     }
//     setRiskOne(RiskOneLevel)
//   };

//   useEffect(() => {
//     checkRisk2();
//   }, [criteria]);

//   const checkRisk2 = () => {
//     let RiskTwoLevel = 'Low Risk( Probable CAD )'
//     if (
//       criteria["coronaryArteryDisease"] ||
//       criteria["previousHeartAttacks"] ||
//       criteria["breathlessness"] ||
//       criteria["cad"]
//     ) {
//       RiskTwoLevel = ("High Risk ( Probable CAD )");
//     }
//     setRiskTwo(RiskTwoLevel)
//   };

//   useEffect(() => {
//     checkRisk3();
//   }, [criteria]);

//   const checkRisk3 = () => {
//     let RiskTHreeLevel = 'Low Risk( Probable Heart failure )'
//     if (
//       criteria["heartFailure"] ||
//       criteria["breathlessness"] ||
//       criteria["hfrEF"] ||
//       criteria["hfpeEF"]
//     ) {
//       RiskTHreeLevel = ("High Risk ( Probable Heart failure )");
//     }
//     setRiskThree(RiskTHreeLevel)
//   };

//   useEffect(() => {
//     checkRisk4();
//   }, [criteria]);

//   const checkRisk4 = () => {
//     let RiskFourLevel = 'Low Risk ( Probable CKD )'
//     if (criteria["eGFR"] < 60) {
//       RiskFourLevel = ('High Risk ( Probable CKD )');
//     }
//     setRiskFour(RiskFourLevel)
//   };

//   return (
//     <div>
//       <h3>Risk Checker</h3>
//       <div>
//         <p>{riskOne}</p>
//         <p>{riskTwo}</p>
//         <p>{riskThree}</p>
//         <p>{riskFour}</p>
//       </div>
//       <div className="text-end mt-4">
//         <button type="button" className="btn btn-primary display-4" onClick={() => preview("bloodTest")}
//         >Preview</button>
//       </div>
//       <div className="text-end mt-4">
//         <button type="submit" className="btn btn-primary display-4" onClick={() => submit("contraindications")}
//         >Submit</button>
//       </div>

//     </div>

//   );
// };
// export default RiskStratification;
