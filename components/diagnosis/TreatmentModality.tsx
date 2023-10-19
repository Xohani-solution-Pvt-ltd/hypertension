

import axios from "axios";
import React, { useEffect, useState } from "react";

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
    <div>
      <h1>High Risk Checker</h1>
      {/* Implement input fields for criteria here */}
      <button onClick={checkRisk}>Check Risk</button>
      <p>{results}</p>


      <div className="text-end mt-4">
    <button type="button" className="btn btn-primary display-4" onClick={() => preview("contraindications")}
     >Preview</button>
      </div>
   
    </div>
  );
};

export default RiskStratification;


