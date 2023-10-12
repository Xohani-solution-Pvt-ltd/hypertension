
import axios from "axios";
import React, { useEffect, useState } from "react";

const RiskStratification = () => {
  const [results, setResults] = useState('');
  const [criteria, setCriteria] = useState({
    'cva': false,
    'coronaryArteryDisease': false,
    'previousHeartAttacks': false,
    'breathlessness': false,
    'cad': false,
    'heartFailure': false,
    'hfrEF': false,
    'hfpeEF': false,
    eGFR: 0,
  });
  
  // Function to fetch data from the API
  const fetchCriteriaData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/allFetchData'); // Update the API endpoint
      const data = response.data;

      // Extract data and update state variables
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
        // console.log("fetchdata",symptomsData)
        setCriteria({
          'cva': comorbiditiesData.cva===true,
          'coronaryArteryDisease': bloodTestData.coronaryArteryDisease === 'Present',
          'previousHeartAttacks': symptomsData.previousHeartAttacks===true,
          'breathlessness': symptomsData.breathlessness===true,
          'cad': comorbiditiesData.coronaryArteryDisease === true,
          'heartFailure': comorbiditiesData.heartFailure === true,
          'hfrEF': bloodTestData.hfrEF > 35,
          'hfpeEF': bloodTestData.hfpeEF > 35,
          eGFR: bloodTestData.eGFRResult,
        });
      } else {
        console.error('Required data properties are undefined');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchCriteriaData();
  }, []);

  // Function to check the risk based on criteria
  const checkRisk = () => {
    let riskLevel = 'Low Risk';

    if (criteria['cva']) {
      riskLevel = 'High Risk (Probable CVA)';
    } else if (
      criteria['coronaryArteryDisease'] ||
      criteria['previousHeartAttacks'] ||
      criteria['breathlessness'] ||
      criteria['cad']
    ) {
      riskLevel = 'High Risk (Probable CAD)';
    } else if (
      criteria['heartFailure'] ||
      criteria['breathlessness'] ||
      criteria['hfrEF'] ||
      criteria['hfpeEF']
    ) {
      riskLevel = 'High Risk (Probable Heart failure)';
    } else if (criteria.eGFR < 60) {
      riskLevel = 'High Risk (CKD)';
    }else{
      riskLevel = 'Low Risk';
    }

    setResults(riskLevel);
  };

  return (
    <div>
      <h1>High Risk Checker</h1>
      {/* Implement input fields for criteria here */}
      <button onClick={checkRisk}>Check Risk</button>
      <p>{results}</p>
    </div>
  );
};

export default RiskStratification;













