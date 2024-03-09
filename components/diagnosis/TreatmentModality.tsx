
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Image from "next/image";
// import TreatmentImg from '../../assets/images/Treatment.jpg';

const RiskStratification = ({ preview }) => {
  const [results1, setResults1] = useState('prescriptions');
  const [results2, setResults2] = useState('prescriptions');
  const [results3, setResults3] = useState('prescriptions');
  const [results4, setResults4] = useState('prescriptions');
  const [results5, setResults5] = useState('prescriptions');
  const [results6, setResults6] = useState('prescriptions');
  const [results7, setResults7] = useState('prescriptions');
  const [results8, setResults8] = useState('prescriptions');
  const [results9, setResults9] = useState('prescriptions');

  const [criteria, setCriteria] = useState({
    'cva': null,
    'coronaryArteryDisease': null,
    'heartFailure': null,
    'diabetes': null,
    'pregnancy': null,
    'lungDisease': null,
    'previousHeartAttacks': null,
    'breathlessness': null,
    'legSwelling': null,
    'hBA1CInterpretation': undefined,
    'kidneyInterpretation': undefined,
    'ejectNormalInterpretation': undefined,
    'ejectHfrefInterpretation': undefined,
    'eGFR': undefined,
    'ejectHfprefInterpretation': undefined,
    'ejectCadInterpretation': undefined,
    'presentdiabetes': null,
    'age': null,
  });

  const fetchCriteriaData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/allFetchData');
      const data = response.data;
      if (
        data &&
        data.data &&
        data.data.comorbiditiesData &&
        data.data.bloodTestData &&
        data.data.symptomsData &&
        data.data.userData
      ) {


        const comorbiditiesData = data.data.comorbiditiesData;
        const bloodTestData = data.data.bloodTestData;
        const symptomsData = data.data.symptomsData;

        const UserData = data.data.userData;

        setCriteria((prevCriteria) => ({
          ...prevCriteria,

          'cva': comorbiditiesData.cva === false,
          'coronaryArteryDisease': comorbiditiesData.coronaryArteryDisease === false,
          'heartFailure': comorbiditiesData.heartFailure === false,
          'diabetes': comorbiditiesData.diabetes === false,
          'pregnancy': comorbiditiesData.pregnancy === false,
          'lungDisease': comorbiditiesData.lungDisease === false,
          'previousHeartAttacks': symptomsData.previousHeartAttacks === false,
          'breathlessness': symptomsData.breathlessness === false,
          'legSwelling': symptomsData.legSwelling === false,

          'hBA1CInterpretation': bloodTestData.hBA1CInterpretation === "Normal",
          'kidneyInterpretation': bloodTestData.kidneyInterpretation === "Normal",
          'ejectNormalInterpretation': bloodTestData.ejectionInterpretation === "Normal",
          'ejectHfrefInterpretation': bloodTestData.ejectionInterpretation === "HfrEF",
          'eGFR': bloodTestData.eGFRResult,
          'ejectHfprefInterpretation': bloodTestData.ejectionInterpretation === "HfpeEF",
          'ejectCadInterpretation': bloodTestData.ejectionInterpretation === "CAD",
          'presentdiabetes': comorbiditiesData.diabetes === true,
          'age': UserData.age,
        }));
      } else {

        console.error('Required data properties are undefined');
      }
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCriteriaData();
  }, []);

  const checkRisk1 = () => {
    let riskLevel = '';
    if (criteria['cva'] &&
      criteria['coronaryArteryDisease'] &&
      criteria['heartFailure'] &&
      criteria['diabetes'] &&
      criteria['pregnancy'] &&
      criteria['lungDisease'] &&
      criteria['hBA1CInterpretation'] &&
      criteria['kidneyInterpretation'] &&
      criteria['ejectNormalInterpretation']
    ) {
      riskLevel = ' group 1 = treatment A + B or C + D';
    }

    setResults1(riskLevel);
  };

  const checkRisk2 = () => {
    let riskLevel = '';

    if (criteria['eGFR'] < 60 && criteria['ejectHfrefInterpretation']
    ) {
      riskLevel = ' group 2 = treatment E + D2 , B ';
    }

    setResults2(riskLevel);
  };

  const checkRisk3 = () => {
    let riskLevel = '';
    if (criteria['eGFR'] < 60 && criteria['ejectHfprefInterpretation'] || criteria['ejectCadInterpretation']) {
      riskLevel = 'group 3 = treatment C + D2 , B + D2';
    }
    setResults3(riskLevel);
  };

  const checkRisk4 = () => {
    let riskLevel = '';
    if (criteria['eGFR'] > 60 && criteria['ejectHfrefInterpretation']
    ) {
      riskLevel = ' group 4 = treatment A3 + B , D3 + D2 ';
    }
    setResults4(riskLevel);
  };

  const checkRisk5 = () => {
    let riskLevel = '';

    if (criteria['eGFR'] > 60 && criteria['ejectHfprefInterpretation']
    ) {
      riskLevel = ' group 5 = treatment A1 + D3 ';
    }

    setResults5(riskLevel);
  };

  const checkRisk6 = () => {
    let riskLevel = '';

    if (criteria['eGFR'] > 60 && criteria['ejectCadInterpretation']
    ) {
      riskLevel = ' group 6 = treatment A + B ';
    }

    setResults6(riskLevel);
  };

  const checkRisk7 = () => {
    let riskLevel = '';

    if (criteria['eGFR'] > 60 && criteria['cva']
    ) {
      riskLevel = ' group 7 = treatment A + D1 ';
    }

    setResults7(riskLevel);
  };

  const checkRisk8 = () => {
    let riskLevel = '';

    if (criteria['eGFR'] > 60 && criteria['presentdiabetes'] && criteria['hBA1CInterpretation']
    ) {
      riskLevel = ' group 8 = treatment A + D1 ';
    }

    setResults8(riskLevel);
  };

  const checkRisk9 = () => {
    let riskLevel = '';

    if (criteria['eGFR'] > 60 && criteria['age'] > 80
    ) {
      riskLevel = ' group 9 = treatment C';

    }

    setResults9(riskLevel);
  };

  useEffect(() => {
    checkRisk1();
    checkRisk2();
    checkRisk3();
    checkRisk4();
    checkRisk5();
    checkRisk6();
    checkRisk7();
    checkRisk8();
    checkRisk9();
  }, []);

  return (
    <>
      <Container fluid>
       <div className="text-center pt-5">
      <h1>Treatment check</h1>
      <button onClick={checkRisk1}>Check Risk</button>
      <p>{results1}</p>
      </div>
        <Table striped bordered hover style={{ width: '90%', maxHeight: 'auto', borderColor: 'black' }}>
          <thead>
            <tr>
              <th>Class</th>
              <th>Name</th>
              <th>intial Dose
                (first visit)</th>
              <th colSpan={1}></th>
              <th>1st uptitration
                (follow up)</th>
              <th colSpan={1}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>Dose</td>
              <td>Frequency</td>
              <td>Dose</td>
              <td>Frequency</td>
            </tr>
            <tr>
              <td>{}</td>
              <td>{}</td>
              <td>{results3}</td>
              <td>{}</td>
              <td>{results3}</td>
              <td>{}</td>
            </tr>
          </tbody>
        </Table>
        <div className="float-end py-5">
        <button type="button" className="btn btn-primary display-4" onClick={() => preview("decideContraindication")}>Back</button>
        </div>
      </Container>
      </>
        );
    };

 export default RiskStratification;



