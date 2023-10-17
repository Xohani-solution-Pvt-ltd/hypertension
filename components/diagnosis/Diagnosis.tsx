import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AccusureImg from "../../assets/images/accusure.jpeg";
import Link from "next/link";
import { Container, Row, Col, Button, Nav, Tab, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  DiagnosisInterface,
  initialDiagnosisValues,
} from "../../interfaces/diagnosis";
import {
  submitDiagnosisAPI,
  getDiagnosisDetailsAPI,
} from "../../services/call";
import { getCookie } from "cookies-next";
import notify from "../../helpers/notify";

const validationSchema = Yup.object({
  systolic: Yup.number()
    .required("Systolic blood pressure is required")
    .min(90, "Systolic blood pressure must be at least 90")
    .max(200, "Systolic blood pressure must not exceed 200"),
  diastolic: Yup.number()
    .required("Diastolic pressure is required")
    .min(50, "Diastolic pressure should be at least 50")
    .max(130, "Diastolic pressure should not exceed 130"),
  pulseRate: Yup.number()
    .required("Pulse rate is required")
    .min(40, "Pulse rate should be at least 40")
    .max(120, "Pulse rate should not exceed 120"),
});

const Diagnosis = ({ submit }) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState(undefined);
  const [atLeastOneCheckboxChecked, setAtLeastOneCheckboxChecked] =
    useState(false);

  const handleSubmit = async (values: DiagnosisInterface) => {
    if (!values.diastolic && !values.pulseRate && !values.systolic) {
      notify.error("Please select at least one.");
      return;
    }
    const [data, err] = await submitDiagnosisAPI(values);
    if (data) {
      notify.success("Succesfully Diagnosis");
    }
    if (err) {
      setTimeout(() => {
        setProcessing(false);
        notify.error(err?.message);
      }, 1000);
    }
  };
  useEffect(() => {
    const id = getCookie("diagnosisId");
    setDiagnosisId(id);
  }, [1]);

  return (
    <>
      <Row className="media-container-row">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">
          Diagnosis
        </h4>
        <Col md={12} className="p-3 align-left">
          <Row className="media-container-row">
            <Col md={1} className="align-left"></Col>
            <Col md={6} className="align-left">
              <Formik
                initialValues={initialDiagnosisValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ setFieldValue }) => {
                  useEffect(() => {
                    const fetchDiagnosisDetailData = async () => {
                      const [data, err] = await getDiagnosisDetailsAPI(
                        diagnosisId
                      );
                      if (data) {
                        const { diastolic, pulseRate, systolic } = data;
                        setFieldValue("diastolic", diastolic);
                        setFieldValue("pulseRate", pulseRate);
                        setFieldValue("systolic", systolic);
                      }
                      if (err) {
                        setTimeout(() => {
                          setProcessing(false);
                          notify.error(err?.message);
                        }, 1000);
                      }
                    };
                    if (diagnosisId) {
                      fetchDiagnosisDetailData();
                    }
                  }, [diagnosisId]);

                  // const saveUserData = (data) => {
                  //   localStorage.setItem('userDiagnosisData', JSON.stringify(data));
                  // }

                  // const getUserData = () => {
                  //   const userData = localStorage.getItem('userDiagnosisData');
                  //   if (userData) {
                  //     return JSON.parse(userData);
                  //   }
                  //   return null;
                  // }

                  // useEffect(() => {
                  //   // When the component mounts or when the user logs in
                  //   const userData = getUserData();
                  //   if (userData) {
                  //     // Populate the form fields with user data
                  //     setFieldValue('systolic', userData.systolic);
                  //     setFieldValue('diastolic', userData.diastolic);
                  //     setFieldValue('pulseRate', userData.pulseRate);
                  //     // ... populate other form fields
                  //   }
                  // }, []);

                  return (
                    <Form>
                      <div className="p-1">
                        <Field
                          type="number"
                          id="systolic"
                          name="systolic"
                          className="form-control"
                          placeholder="SYS"
                          onChange={(e) => {
                            setFieldValue("systolic", e.target.value);
                            setAtLeastOneCheckboxChecked(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="systolic"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-1">
                        <Field
                          type="number"
                          id="diastolic"
                          name="diastolic"
                          className="form-control"
                          placeholder="DIA"
                          onChange={(e) => {
                            setFieldValue("diastolic", e.target.value);
                            setAtLeastOneCheckboxChecked(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="diastolic"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-1">
                        <Field
                          type="number"
                          id="pulseRate"
                          name="pulseRate"
                          className="form-control"
                          placeholder="PUL"
                          onChange={(e) => {
                            setFieldValue("pulseRate", e.target.value);
                            setAtLeastOneCheckboxChecked(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="pulseRate"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="text-end mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary display-4"
                          onClick={() => submit("comorbidities")}
                          disabled={!atLeastOneCheckboxChecked}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
            <Col md={3} className="align-left">
              <Image src={AccusureImg} alt="My Image" width={200} height={150} />
            </Col>
          </Row>
        </Col>
        <Col md={2} className="p-3 align-left"></Col>
      </Row>
    </>
  );
};

export default Diagnosis;

// const handleSubmit = async (values: BloodTestInterface) => {

//   if (!values.creatinine && !values.age && !values.weight && !values.gender) {
//     let eGFR = 0;
//     if (typeof values.age === 'number' && typeof values.weight === 'number' && typeof values.creatinine === 'number') {
//       if (values.gender === 'Male') {
//         eGFR = ((140 - values.age) * values.weight) / (72 * values.creatinine);
//       } else if (values.gender === 'Female') {
//         eGFR = ((140 - values.age) * values.weight) / (72 * values.creatinine) * 0.85;
//       }
//       values.eGFRResult = eGFR;
//     } else if(
//       &&!values.totalCholesterol&& !values.lipidInterpretation && !values.hdlCholesterol && !values.hdlInterpretation &&!values.ldlCholesterol &&!values.ldlInterpretation &&  !values.triglycerides && !values.triglyceridesInterpretation &&  !values.albumin &&!values.creatinine  && !values.sodium && !values.acrResult && !values.eGFRResult &&  !values.potassium &&!values.uricAcid &&  !values.kidneyInterpretation && !values.tshLevel &&  !values.tshInterpretation &&!values.renalArteryDoppler &&  !values.coronaryArteryDisease && !values.ejectionFraction && !values.hfrEF &&  !values.hfpeEF
//     ){
//     notify.error("Please select at least one .");
//     return; // Do not submit the form
//   }
//   }
//   const [data, err] = await submitBloodTestAPI(values);
//   if (data) {
//     notify.success("Succesfully BloodTest");
//     // router.push('/dashboard')
//   }
//   if (err) {
//     setTimeout(() => {
//       setProcessing(false);
//       notify.error(err?.message);
//     }, 1000);
//   }
// };
// useEffect(() => {
//   const id = getCookie('bloodTestId')
//   setBloodTestId(id)
// }, [1]);

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const RiskStratification = () => {
//   // State variables for results and criteria
//   const [results, setResults] = useState('');
//   const [criteria, setCriteria] = useState({
//     'cva': false,
//     'coronaryArteryDisease': false,
//     'previousHeartAttacks': false,
//     'breathlessness': false,
//     'cad': false,
//     'heartFailure': false,
//     'hfrEF': false,
//     'hfpeEF': false,
//     eGFR: 0,
//   });

//   // Function to fetch data from the API
//   const fetchCriteriaData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/allFetchData');
//       const data = await response.data; // Assuming the API response is in JSON format
//       console.log("data", data);
//       console.log("datacomor",data && data)
//       if (
//         data &&
//         data.comorbiditiesData &&
//         data.bloodTestData &&
//         data.symptomsData
//       ) {
//         setCriteria({
//           'cva': data.comorbiditiesData.cva,
//           'coronaryArteryDisease': data.bloodTestData.coronaryArteryDisease === 'Present',
//           'previousHeartAttacks': data.symptomsData.previousHeartAttacks,
//           'breathlessness': data.symptomsData.breathlessness,
//           'cad': data.comorbiditiesData.coronaryArteryDisease === true,
//           'heartFailure': data.comorbiditiesData.heartFailure === true,
//           'hfrEF': data.bloodTestData.hfrEF > 35,
//           'hfpeEF': data.bloodTestData.hfpeEF > 35,
//           eGFR: data.bloodTestData.eGFR,
//         });
//       } else {
//         console.error('Required data properties are undefined');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   // useEffect to fetch data when the component mounts
//   useEffect(() => {
//     fetchCriteriaData();
//   }, []);

//   // Function to check the risk based on criteria
//   const checkRisk = () => {
//     let riskLevel = 'Low Risk';

//     if (criteria['cva']) {
//       riskLevel = 'High Risk (Probable CVA)';
//     } else if (
//       criteria['coronaryArteryDisease'] ||
//       criteria['previousHeartAttacks'] ||
//       criteria['breathlessness'] ||
//       criteria['cad']
//     ) {
//       riskLevel = 'High Risk (Probable CAD)';
//     } else if (
//       criteria['heartFailure'] ||
//       criteria['breathlessness'] ||
//       criteria['hfrEF'] ||
//       criteria['hfpeEF']
//     ) {
//       riskLevel = 'High Risk (Probable Heart failure)';
//     } else if (criteria.eGFR < 60) {
//       riskLevel = 'High Risk (CKD)';
//     }

//     setResults(riskLevel);
//   };

//   return (
//     <div>
//       <h1>High Risk Checker</h1>
//       {/* Implement input fields for criteria here */}
//       <button onClick={checkRisk}>Check Risk</button>
//       <p>{results}</p>
//     </div>
//   );
// };

// export default RiskStratification;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const RiskStratification = () => {
//   const [results, setResults] = useState('');
//   const [criteria, setCriteria] = useState({
//     'cva': false,
//     'coronaryArteryDisease': false,
//     'previousHeartAttacks': false,
//     'breathlessness': false,
//     'cad': false,
//     'heartFailure': false,
//     'hfrEF': false,
//     'hfpeEF': false,
//     eGFR: 0,
//   });
//   const fetchCriteriaData = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/allFetchData');
//       const data = await response.json(); // Await the JSON parsing
//       console.log("data", data);
//       setCriteria({
//         'cva': data.comorbiditiesData.cva,
//         'coronaryArteryDisease': data.bloodTestData.coronaryArteryDisease === 'Present',
//         'previousHeartAttacks': data.symptomsData.previousHeartAttacks,
//         'breathlessness': data.symptomsData.breathlessness,
//         'cad': data.comorbiditiesData.coronaryArteryDisease === true,
//         'heartFailure': data.comorbiditiesData.heartFailure === true,
//         'hfrEF': data.bloodTestData.hfrEF > 35,
//         'hfpeEF': data.bloodTestData.hfpeEF > 35,
//         eGFR: data.bloodTestData.eGFR,
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCriteriaData();
//   }, []);

//   const checkRisk = () => {
//     let riskLevel = 'Low Risk';

//     if (criteria['cva']) {
//       riskLevel = 'High Risk (Probable CVA)';
//     } else if (
//       criteria['coronaryArteryDisease'] ||
//       criteria['previousHeartAttacks'] ||
//       criteria['breathlessness'] ||
//       criteria['cad']
//     ) {
//       riskLevel = 'High Risk (Probable CAD)';
//     } else if (
//       criteria['heartFailure'] ||
//       criteria['breathlessness'] ||
//       criteria['hfrEF'] ||
//       criteria['hfpeEF']
//     ) {
//       riskLevel = 'High Risk (Probable Heart failure)';
//     } else if (criteria.eGFR < 60) {
//       riskLevel = 'High Risk (CKD)';
//     }

//     setResults(riskLevel);
//   };

//   return (
//     <div>
//       <h1>High Risk Checker</h1>
//       {/* Implement input fields for criteria here */}
//       <button onClick={checkRisk}>Check Risk</button>
//       <p>{results}</p>
//     </div>
//   );
// };

// export default RiskStratification;
