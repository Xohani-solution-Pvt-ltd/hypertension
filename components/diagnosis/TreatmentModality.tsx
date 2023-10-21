import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const RiskStratification = ({preview}) => {
  const [results, setResults] = useState('prescriptions');
  const [criteria, setCriteria] = useState({
    'cva': false,
    'coronaryArteryDisease':false,
    'heartFailure': false,
    'diabetes':false,
    'pregnancy':false,
    'lungDisease' :false,
    'previousHeartAttacks': false,
    'breathlessness':false,
    'legSwelling':false,
     'hBA1CInterpretation' : undefined,
     'kidneyInterpretation': undefined
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
        data.data.symptomsData
      ) {
      //   const cva = false;
      //   const coronaryArteryDisease =false;
      //   const heartFailure =false;
      //   const diabetes= false;
      //   const pregnancy =false;
      //   const lungDisease =false;
      //   const previousHeartAttacks =false;
      //   const breathlessness= false;
      //   const legSwelling=false;
      //   const hBA1CInterpretation = "normal";
      //   const kidneyInterpretation = "normal";

      //   setCriteria({
      //     'cva': cva===false,
      //     'coronaryArteryDisease' : coronaryArteryDisease===false,
      //     'heartFailure': heartFailure===false,
      //     'diabetes' : diabetes===false,
      //     'pregnancy' : pregnancy===false,
      //     'lungDisease'  : lungDisease===false,
      //     'previousHeartAttacks': previousHeartAttacks===false,
      //     'breathlessness': breathlessness===false,
      //     'legSwelling':legSwelling===false,
      //     'hBA1CInterpretation' :hBA1CInterpretation=== "normal",
      //     'kidneyInterpretation':kidneyInterpretation==="normal"
      //  });

        const comorbiditiesData = data.comorbiditiesData;

        const bloodTestData = data.data.bloodTestData;
        const symptomsData = data.data.symptomsData;
     console.log("data",symptomsData)

        setCriteria({
          'cva': comorbiditiesData.cva===false,
          'coronaryArteryDisease':comorbiditiesData.coronaryArteryDisease===false,
          'heartFailure': comorbiditiesData.heartFailure===false,
          'diabetes':comorbiditiesData.diabetes===false,
          'pregnancy':comorbiditiesData.pregnancy===false,
          'lungDisease' :comorbiditiesData.lungDisease===false,
          'previousHeartAttacks': symptomsData.previousHeartAttacks===false,
          'breathlessness': symptomsData.breathlessness===false,
          'legSwelling':symptomsData.legSwelling===false,
          'hBA1CInterpretation' :bloodTestData.hBA1CInterpretation===undefined,
          'kidneyInterpretation':bloodTestData.kidneyInterpretation===undefined
       });
      } else {
        console.error('Required data properties are undefined');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCriteriaData();
  }, []);

  const checkRisk = () => {
    let riskLevel = '';

    if (criteria['cva'] && 
        criteria['coronaryArteryDisease'] && 
        criteria['heartFailure'] &&
        criteria['diabetes'] &&
        criteria['pregnancy'] &&
        criteria['lungDisease'] &&
        criteria['hBA1CInterpretation'] &&
        criteria['kidneyInterpretation']
        ) {
      riskLevel = 'treatment A + B or C + D';
    }else{
      riskLevel = 'some field are present';
    }

    setResults(riskLevel);
  };

  return (
    <div className="text-center pt-5">
      <h1>High Risk Checker</h1>
      <button onClick={checkRisk}>Check Risk</button>
      <p>{results}</p>
      <Container className="m-5" fluid>
      <Table striped bordered hover style={{width:'90%',maxHeight:'auto'}}>
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
          <td>A1</td>
          <td>Ramipril</td>
          <td>5 mg</td>
          <td>Once a day</td>
          <td>5 mg</td>
          <td>Twice a day</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      </Table>
      </Container>
      <div className="text-end mt-4">
    <button type="button" className="btn btn-primary display-4" onClick={() => preview("contraindications")}
     >Preview</button>
      </div>
    </div>
  );
};

export default RiskStratification;


