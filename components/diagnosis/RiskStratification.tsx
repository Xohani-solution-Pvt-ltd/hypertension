// import { useEffect, useState } from 'react';

// function MyComponent() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch('/api/allFetchData') // Replace with your API endpoint
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }

// export default MyComponent;


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
  const fetchCriteriaData = async () => {
    console.log("out of try");
    try {
      const response = await fetch('http://localhost:3000/api/allFetchData');
      const data = await response.json(); // Await the JSON parsing
      console.log("data", data);
      setCriteria({
        'cva': data.comorbiditiesData.cva,
        'coronaryArteryDisease': data.bloodTestData.coronaryArteryDisease === 'Present',
        'previousHeartAttacks': data.symptomsData.previousHeartAttacks,
        'breathlessness': data.symptomsData.breathlessness,
        'cad': data.comorbiditiesData.coronaryArteryDisease === true,
        'heartFailure': data.comorbiditiesData.heartFailure === true,
        'hfrEF': data.bloodTestData.hfrEF > 35,
        'hfpeEF': data.bloodTestData.hfpeEF > 35,
        eGFR: data.bloodTestData.eGFR,
      });
    } catch (error) {
      console.log("inside of catch");
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCriteriaData();
  }, []); 

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



















// import { useEffect, useState } from "react";


// const RiskStratification=()=>{
// const [results, setResults] = useState('');
// const [criteria, setCriteria] = useState({
//   'cva': false,
//   'coronaryArteryDisease': false,
//   'previousHeartAttacks': false,
//   'breathlessness': false,
//   'cad': false,
//   'heartFailure': false,
//   'hfrEF': false,
//   'hfpeEF': false,
//   eGFR: 0,
// });
//   // Simulating data fetching from different databases
//   const fetchCriteriaData = async () => {
//     try {
//       // Fetch data from different API endpoints for different databases
//       const cvaDataResponse = await fetch('/api/diagnosis');
//       const cvaData = await cvaDataResponse.json();
//      console.log("cvaData",cvaData)
//       const cadDataResponse = await fetch('/api/comorbidities');
//       const cadData = await cadDataResponse.json();

//       const heartFailureDataResponse = await fetch('/api/comorbidities');
//       const heartFailureData = await heartFailureDataResponse.json();

//       const eGFRDataResponse = await fetch('/api/blood');
//       const eGFRData = await eGFRDataResponse.json();

//       // Combine the fetched data from different sources
//       const combinedData = {
//         ...cvaData,
//         ...cadData,
//         ...heartFailureData,
//         ...eGFRData,
//       };

//       // Update the criteria state based on the combined data
//       setCriteria(combinedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCriteriaData();
//   }, []); // Fetch data when the component mounts

// const checkRisk = () => {
//   // Implement your criteria checking logic here
//   // Set the 'results' state accordingly

//   // Example logic:
//   let riskLevel = 'Low Risk';

//   if (criteria['cva']) {
//     riskLevel = 'High Risk (Probable CVA)';
//   } else if (
//     criteria['coronaryArteryDisease'] ||
//     criteria['previousHeartAttacks'] ||
//     criteria['breathlessness'] ||
//     criteria['cad']
//   ) {
//     riskLevel = 'High Risk (Probable CAD)';
//   } else if (
//     criteria['heartFailure'] ||
//     criteria['breathlessness'] ||
//     criteria['hfrEF'] ||
//     criteria['hfpeEF']
//   ) {
//     riskLevel = 'High Risk (Probable Heart failure)';
//   } else if (criteria.eGFR < 60) {
//     riskLevel = 'High Risk (CKD)';
//   }

//   setResults(riskLevel);
// };

// return (
//   <div>
//     <h1>High Risk Checker</h1>
//     {/* Implement input fields for criteria here */}
//     <button onClick={checkRisk}>Check Risk</button>
//     <p>{results}</p>
//   </div>
// );
// };

// export default RiskStratification;



// import React, { useState } from 'react'

// const RiskStratification = () => {
//   return (
//     <div>RiskStratification</div>
                      
//   )
// }

// export default RiskStratification


// import { useEffect, useState } from "react";

// function YourComponent() {
//   const [diagnosisData, setDiagnosisData] = useState([]);
//   const [comorbiditiesData, setComorbiditiesData] = useState([]);
//   const [symptomsData, setSymptomsData] = useState([]);
//   const [bloodData, setBloodData] = useState([]);
  
//   const fetchDiagnosisData = async () => {
//     try {
//       const response = await fetch("/api/diagnosis");
//       const data = await response.json();
//       setDiagnosisData(data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const fetchComorbiditesData = async () => {
//     try {
//       const response = await fetch("/api/comorbidities");
//       const data = await response.json();
//       setComorbiditiesData(data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const fetchSymptomsData = async () => {
//     try {
//       const response = await fetch("/api/symptom");
//       const data = await response.json();
//       setSymptomsData(data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const fetchBloodData = async () => {
//     try {
//       const response = await fetch("/api/blood");
//       const data = await response.json();
//       setBloodData(data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
  
//   useEffect(() => {
//     fetchDiagnosisData();
//     fetchComorbiditesData();
//     fetchSymptomsData();
//     fetchBloodData();
//   }, []);

//   return (
//     <>
//     <div>
//       <h1>Diagnosis Data</h1>
//       <ul>
//         {diagnosisData.map((diagnosis) => (
//           <li key={diagnosis._id}>
//             {/* Display diagnosis data as needed */}
//             {diagnosis.systolic}, {diagnosis.diastolic}, {diagnosis.pulseRate}
//           </li>
//         ))}
         
//       </ul>
//     </div>
//         <div>
//         <h1>Comorbidities Data</h1>
//         <ul>
//           {comorbiditiesData.map((comorbidities) => (
//             <li key={comorbidities._id}>
//               {/* Display diagnosis data as needed */}
//               {comorbidities.cva}, {comorbidities.previousHeartAttacks}, {comorbidities.heartFailure}, {comorbidities.diabetes}, {comorbidities.pregnancy}, {comorbidities.lungDisease}
//             </li>
//           ))}
//           {Array.isArray(comorbiditiesData) &&
//                 comorbiditiesData.map((item, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
                      
//                       <td>{item.systolic}</td>
//                       <td>{item.diastolic}</td>
//                       <td>{item.pulseRate}</td>
//                     </tr>
//                   );
//                 })}
//         </ul>
//       </div>
//       <div>
//         <h1>Symptoms Data</h1>
//         <ul>
//           {symptomsData.map((symptoms) => (
//             <li key={symptoms._id}>
//               {/* Display diagnosis data as needed */}
//               {symptoms.previousHeartAttacks}, {symptoms.breathlessness}, {symptoms.minorNYHA}, {symptoms.majorNYHA}, {symptoms.legSwelling}
//             </li>
//           ))}
//         </ul>
//       </div>
//       </>
//   );
// }

// export default YourComponent;




// // Step 7: Risk Stratification Function
// function calculateRisk(formData) {
//   // Initialize risk categories
//   let isHighRisk = false;
//   let isLowRisk = false;

//   // Step 4: Comorbidities
//   const { CVA, coronaryArteryDisease, heartFailure, diabetes, pregnancy, lungDisease } = formData;

//   // Step 6: Blood Test
//   const { eGFRResult } = formData.kidneyFunctionTest;

//   // Check for high-risk conditions
//   if (CVA || coronaryArteryDisease || heartFailure) {
//     isHighRisk = true;
//   }

//   // Check for specific high-risk conditions based on criteria
//   if (formData.diagnosis) {
//     const { firstRecording, secondRecording } = formData.diagnosis;
//     const { systolicPressure, diastolicPressure, heartRate } = firstRecording;

//     if (
//       systolicPressure >= 140 || diastolicPressure >= 90 ||
//       (systolicPressure >= 130 && diastolicPressure >= 80 && heartRate >= 100)
//     ) {
//       isHighRisk = true;
//     }
//   }

//   // Check for CKD (Chronic Kidney Disease)
//   if (eGFRResult < 60) {
//     isHighRisk = true;
//   }

//   // Determine risk categories
//   if (isHighRisk) {
//     return { interpretation: 'High Risk' };
//   } else {
//     return { interpretation: 'Low Risk' };
//   }
// }

// // Example usage
// const formData = {
//   // ... Populate formData with user inputs from all steps
// };

// const riskStratificationResult = calculateRisk(formData);
// console.log('Risk Stratification:', riskStratificationResult);





// // Define constants for risk factors
// const riskFactors = {
//   probableCVA: false,
//   probableCAD: false,
//   probableHF: false,
//   probableCKD: false,
// };

// // Step 1: User Registration - No risk factors in this step.

// // Step 2: User Profile Creation - No risk factors in this step.

// // Step 3: Diagnosis - Check for risk factors in Blood Pressure records
// function evaluateDiagnosis(bloodPressureRecordings) {
//   const firstRecording = bloodPressureRecordings[0];
//   const secondRecording = bloodPressureRecordings[1];

//   if (
//     firstRecording.systolicPressure >= 140 ||
//     firstRecording.diastolicPressure >= 90
//   ) {
//     riskFactors.probableCVA = true;
//   }

//   if (
//     secondRecording.systolicPressure >= 140 ||
//     secondRecording.diastolicPressure >= 90
//   ) {
//     riskFactors.probableCVA = true;
//   }
// }

// // Step 4: Comorbidities - Check for risk factors in comorbidities
// function evaluateComorbidities(comorbidities) {
//   if (comorbidities.CVA) {
//     riskFactors.probableCVA = true;
//   }

//   if (comorbidities.coronaryArteryDisease || comorbidities.heartFailure) {
//     riskFactors.probableCAD = true;
//   }

//   if (comorbidities.heartFailure) {
//     riskFactors.probableHF = true;
//   }

//   if (comorbidities.diabetes) {
//     riskFactors.probableCKD = true;
//   }
// }

// // Step 5: Symptoms Monitoring - No risk factors in this step.

// // Step 6: Blood Test - Check for risk factors in blood test results
// function evaluateBloodTestResults(bloodTestResults) {
//   if (bloodTestResults.eGFRResult === 'Yes') {
//     if (bloodTestResults.eGFR < 60) {
//       riskFactors.probableCKD = true;
//     }
//   }
// }

// // Step 7: Risk Stratification
// function performRiskStratification() {
//   if (riskFactors.probableCVA) {
//     return 'High Risk: Probable CVA';
//   }

//   if (riskFactors.probableCAD) {
//     return 'High Risk: Probable CAD';
//   }

//   if (riskFactors.probableHF) {
//     return 'High Risk: Probable Heart Failure';
//   }

//   if (riskFactors.probableCKD) {
//     return 'High Risk: Probable CKD';
//   }

//   return 'Low Risk';
// }

// // Example usage:
// const bloodPressureRecordings = [
//   { systolicPressure: 120, diastolicPressure: 80 },
//   { systolicPressure: 150, diastolicPressure: 95 },
// ];

// const comorbidities = {
//   CVA: false,
//   coronaryArteryDisease: true,
//   heartFailure: false,
//   diabetes: true,
// };

// const bloodTestResults = {
//   eGFRResult: 'Yes',
//   eGFR: 55,
// };

// evaluateDiagnosis(bloodPressureRecordings);
// evaluateComorbidities(comorbidities);
// evaluateBloodTestResults(bloodTestResults);

// const riskStratificationResult = performRiskStratification();
// console.log(riskStratificationResult);
