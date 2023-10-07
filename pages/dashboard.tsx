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
import { ProgressBar } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

const Dashboard = () => {
  const { isAuthenticated, userInfo, LoginToAccount } = useContext(AuthContext);
  const [diagnosisId, setDiagnosisId] = useState(undefined);
  const [activeTab, setActiveTab] = useState("diagnosis"); // Initialize with the "diagnosis" tab
  const { TITLE } = APP_INFO;
  const router = useRouter();

  useEffect(() => {
    const id = getCookie('diagnosisId');
    setDiagnosisId(id);
  }, [1]);

  // Function to handle tab change
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleButtonClick = (submit) => {
    // Call the onSubmitLogic function with the necessary data
    setActiveTab(submit);
  };

  // Function to navigate to the next tab
  const goToNextTab = () => {
    // Define the order of tabs here
    const tabOrder = [
      "diagnosis",
      "comorbidities",
      "symptoms",
      "bloodTest",
      "stratification",
      "contraindications",
      "treatment",
    ];

    // Find the index of the current active tab
    const currentIndex = tabOrder.indexOf(activeTab);

    // If the current tab is not the last one, move to the next tab
    if (currentIndex !== -1 && currentIndex < tabOrder.length - 1) {
      const nextTabKey = tabOrder[currentIndex + 1];
      handleTabChange(nextTabKey);
    }
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
                  <Diagnosis submit={handleButtonClick} />
                </Tab>
                <Tab eventKey="comorbidities" title="Comorbidities" disabled={!diagnosisId}>
                  <Comorbidities submit={handleButtonClick} />
                </Tab>
                <Tab eventKey="symptoms" title="Symptoms Monitoring" disabled={!diagnosisId}>
                  <Symptoms submit={handleButtonClick} />
                </Tab>
                <Tab eventKey="bloodTest" title="Blood Test" disabled={!diagnosisId}>
                  <BloodTest submit={handleButtonClick} />
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
              {/* <Button onClick={goToNextTab}>Next</Button> */}
            </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Dashboard;




// import React, { useContext, useEffect, useState } from "react";
// import { Container, Row, Col, Button, Nav, Tab, Card, Tabs } from 'react-bootstrap';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { HouseExclamationFill, PersonFillUp } from 'react-bootstrap-icons';
// import Layout from "../components/Layout";
// import DisplayUser from "../components/DisplayUser";
// import { useRouter } from "next/router";
// import { AuthContext } from "../context/authentication";
// import { APP_INFO } from "../environments/index";
// import Diagnosis from "../components/diagnosis/Diagnosis";
// import Comorbidities from "../components/diagnosis/Comorbidities";
// import Symptoms from "../components/diagnosis/Symptoms";
// import BloodTest from "../components/diagnosis/BloodTest";
// import RiskStratification from "../components/diagnosis/RiskStratification";
// import TreatmentModality from "../components/diagnosis/TreatmentModality";
// import DecideContraindication from "../components/diagnosis/DecideContraindication";
// import NoContraindication from "../components/diagnosis/NoContraindication";
// import { LoginFormInterface, initialLoginValues } from "../interfaces/login";
// import * as Yup from 'yup';
// import { getCookie } from 'cookies-next';

// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email address').required('Email is Required'),
//     password: Yup.string().required('Password is Required'),
// });

// const componentKeys = [
//     "diagnosis",
//     "comorbidities",
//     "symptoms",
//     "bloodTest",
//     "stratification",
//     "contraindications",
//     "treatment"
// ];

// const Dashboard = () => {
//     const { isAuthenticated, userInfo, LoginToAccount } = useContext(AuthContext);
//     const [diagnosisId, setDiagnosisId] = useState(undefined);
//     const [activeComponentIndex, setActiveComponentIndex] = useState(0); // Index of the currently active component
//     const { TITLE } = APP_INFO;
//     const router = useRouter();

//     useEffect(() => {
//         const id = getCookie('diagnosisId')
//         setDiagnosisId(id)
//     }, []);

//     const handleNext = () => {
//         // Check if there is a next component to render
//         if (activeComponentIndex < componentKeys.length - 1) {
//             setActiveComponentIndex(activeComponentIndex + 1);
//         }
//     };

//     return (
//         <Layout title={`Login | ${TITLE}`}>
//             <section className="features1 cid-rGtBGu0BpJ" id="features5-11">
//                 <Container style={{ height: '75vh' }}>
//                     <Row className="justify-content-center">
//                         <Tabs
//                             activeKey={componentKeys[activeComponentIndex]}
//                             id="justify-tab-example"
//                             className="mb-3"
//                             justify
//                         >
//                             {componentKeys.map((key, index) => (
//                                 <Tab
//                                     key={key}
//                                     eventKey={key}
//                                     title={key === 'diagnosis' ? "Diagnosis" : key}
//                                     disabled={index > activeComponentIndex || !diagnosisId}
//                                 >
//                                     {renderComponentByKey(key)}
//                                     {index === activeComponentIndex && (
//                                         <div className="mt-3">
//                                             {index < componentKeys.length - 1 && (
//                                                 <Button onClick={handleNext}>Next</Button>
//                                             )}
//                                         </div>
//                                     )}
//                                 </Tab>
//                             ))}
//                         </Tabs>
//                     </Row>
//                 </Container>
//             </section>
//         </Layout>
//     );
// };

// // Function to render component based on key
// const renderComponentByKey = (key) => {
//     switch (key) {
//         case "diagnosis":
//             return <Diagnosis />;
//         case "comorbidities":
//             return <Comorbidities />;
//         case "symptoms":
//             return <Symptoms />;
//         case "bloodTest":
//             return <BloodTest />;
//         case "stratification":
//             return <RiskStratification />;
//         case "contraindications":
//             return <DecideContraindication />;
//         case "treatment":
//             return <TreatmentModality />;
//         default:
//             return null;
//     }
// };

// export default Dashboard;







// import React, { useContext, useEffect, useState } from "react";
// import { Container, Row, Col, Button, Nav, Tab, Card, Tabs } from 'react-bootstrap';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { HouseExclamationFill, PersonFillUp } from 'react-bootstrap-icons';
// import Layout from "../components/Layout";
// import DisplayUser from "../components/DisplayUser";
// import { useRouter } from "next/router";
// import { AuthContext } from "../context/authentication";
// import { APP_INFO } from "../environments/index";
// import Diagnosis from "../components/diagnosis/Diagnosis";
// import Comorbidities from "../components/diagnosis/Comorbidities";
// import Symptoms from "../components/diagnosis/Symptoms";
// import BloodTest from "../components/diagnosis/BloodTest";
// import RiskStratification from "../components/diagnosis/RiskStratification";
// import TreatmentModality from "../components/diagnosis/TreatmentModality";
// import DecideContraindication from "../components/diagnosis/DecideContraindication";
// import NoContraindication from "../components/diagnosis/NoContraindication";
// import { LoginFormInterface, initialLoginValues } from "../interfaces/login";
// import * as Yup from 'yup';
// import { getCookie } from 'cookies-next';

// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email address').required('Email is Required'),
//     password: Yup.string().required('Password is Required'),
// });
// const Dashboard = () => {
//     const { isAuthenticated, userInfo, LoginToAccount } = useContext(AuthContext);
//     const [diagnosisId, setDiagnosisId] = useState(undefined);
//     const [process, setProcess] = useState<Boolean>(false);
//     const { TITLE } = APP_INFO;
//     const router = useRouter();
//     useEffect(() => {
//         const id = getCookie('diagnosisId')
//         setDiagnosisId(id)
//       }, [1]);
//       const handleButtonClick = (submit) => {
//             // Call the onSubmitLogic function with the necessary data
//             setActiveTab(submit);
//           };
//     return (
//         <Layout title={`Login | ${TITLE}`}>
//             <section className="features1 cid-rGtBGu0BpJ" id="features5-11">
//                 <Container>
//                     <Row className="justify-content-center">
//                         <Tabs
//                             defaultActiveKey="diagnosis"
//                             id="justify-tab-example"
//                             className="mb-3"
//                             justify
//                         >
//                             <Tab eventKey="diagnosis" title="Diagnosis">
//                                 <Diagnosis submit={handleButtonClick}/>
//                             </Tab>
//                             <Tab eventKey="comorbidities" title="Comorbidities" disabled={(!diagnosisId) ? true : false}>
//                                 <Comorbidities />
//                             </Tab>
//                             <Tab eventKey="symptoms" title="Symptoms Monitoring" disabled={(!diagnosisId) ? true : false}>
//                                 <Symptoms />
//                             </Tab>
//                             <Tab eventKey="bloodTest" title="Blood Test" disabled={(!diagnosisId) ? true : false}>
//                                 <BloodTest />
//                             </Tab>
//                             <Tab eventKey="stratification" title="Risk Stratification" disabled={(!diagnosisId) ? true : false}>
//                                 <RiskStratification/>
//                             </Tab>
//                             <Tab eventKey="contraindications" title="Contraindications" disabled={(!diagnosisId) ? true : false}>
//                                 <DecideContraindication />
//                             </Tab>
//                             <Tab eventKey="treatment" title="Treatment" disabled={(!diagnosisId) ? true : false}>
//                             <TreatmentModality />
//                             </Tab>
//                         </Tabs>
//                     </Row>
//                 </Container>
//             </section>
//         </Layout>
//     );
// };

// export default Dashboard;



