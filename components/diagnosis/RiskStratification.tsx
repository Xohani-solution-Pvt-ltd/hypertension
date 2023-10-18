import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RiskStratification = () => {
  const [data, setData] = useState([]);

  const [results, setResults] = useState('Low Risk');
  const [criteria, setCriteria] = useState({
    'cva': false,
    'coronaryArteryDisease': false,
    'previousHeartAttacks': false,
    'breathlessness': false,
    'cad': false,
    'heartFailure': false,
    'hfrEF': false,
    'hfpeEF': false,
    'eGFR' : undefined
  });
  
  const [fetchedData, setFetchedData] = useState(null);
  // Function to fetch data from the API
  // const fetchCriteriaData = async () => {
    // try {
    //   const response = await axios.get(
    //     "http://localhost:3000/api/allFetchData"
    //   ); // Update the API endpoint
      
  // console.log("egfr",criteria)
  // console.log("setCriteria",criteria.eGFR)
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
        setFetchedData(data);
        const userData = data.data.userData;
        const comorbiditiesData = data.data.comorbiditiesData;
        const bloodTestData = data.data.bloodTestData;
        // console.log("dataofuser",bloodTestData.creatinine)
        const symptomsData = data.data.symptomsData;

        if (userData.age &&
            userData.weight &&
            bloodTestData.creatinine
        ) {
          let eGFR = 0;
          
          if (userData.gender === 'Male') {
            // console.log("dataofuser",userData.gender)
            eGFR = ((140 - userData.age) * userData.weight) / (72 * bloodTestData.creatinine);
            
            // console.log("dataofuser",eGFR)
          } else if (userData.gender === 'Female') {
            eGFR = ((140 - userData.age) * userData.weight) / (72 * bloodTestData.creatinine) * 0.85;
          }
          setCriteria((prevCriteria) => ({ ...prevCriteria, 'eGFR': eGFR }));
        }
        
        setCriteria((prevCriteria) => ({
          ...prevCriteria,
          'cva': comorbiditiesData.cva===true,
          'coronaryArteryDisease': bloodTestData.coronaryArteryDisease === 'Present',
          'previousHeartAttacks': symptomsData.previousHeartAttacks===true,
          'breathlessness': symptomsData.breathlessness===true,
          'cad': comorbiditiesData.coronaryArteryDisease === true,
          'heartFailure': comorbiditiesData.heartFailure === true,
          'hfrEF': bloodTestData.hfrEF > 35,
          'hfpeEF': bloodTestData.hfpeEF > 35 
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
    checkRisk();
  }, []);

  useEffect(() => {
    checkRisk();
  }, [criteria]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/allFetchData');
        console.log("data",response)
        const jsonData = await response.json();
       setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
 
    fetchData();
  }, []);

  const checkRisk = () => {
    let riskLevel = "Low Risk";

    if (criteria["cva"]) {
      riskLevel = "High Risk (Probable CVA)";
    } else if (
      criteria["coronaryArteryDisease"] ||
      criteria["previousHeartAttacks"] ||
      criteria["breathlessness"] ||
      criteria["cad"]
    ) {
      riskLevel = "High Risk (Probable CAD)";
    } else if (
      criteria["heartFailure"] ||
      criteria["breathlessness"] ||
      criteria["hfrEF"] ||
      criteria["hfpeEF"]
    ) {
      riskLevel = "High Risk (Probable Heart failure)";
    } else if (criteria.eGFR < 60) {
      riskLevel = 'High Risk (CKD)';
    }

    setResults(riskLevel);
  };

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

//   return (
//     <>
//     <div>
//       <h1>Risk Checker</h1>
//       <table>
//         {/* <thead>
//           <tr>
//             <th>Criteria</th>
//             <th>Value</th>
//           </tr>
//         </thead> */}
//         <tbody>
//           {fetchedData && (
//             <>
//               <tr>
//                 <td>CVA</td>
//                 <td>{criteria.cva ? "Yes" : "No"}</td>
//               </tr>
//               <tr>
//                 <td>Coronary Artery Disease</td>
//                 <td>
//                   {criteria.coronaryArteryDisease ? "Present" : "Not Present"}
//                 </td>
//               </tr>
//               {/* Add more rows for other criteria */}
//               <tr>
//                 <td>eGFR</td>
//                 <td>{criteria.eGFR}</td>
//               </tr>
//             </>
//           )}
//         </tbody>
//       </table>

//       <p className={results === "Low Risk" ? "low-risk" : "high-risk"}>
//         Risk Level: {results}
//       </p>
//     </div>
//     <div>
//     {data ? (
//         <pre>{JSON.stringify(data, null, 3)}</pre>
//       ) : (
//       <p>Loading...</p>
//      )}

//     </div> </>
//   );
// };

// export default RiskStratification;

return (
  <div>
    <h1>Risk Checker</h1>
    <table>
      <tbody>
        <tr>
          <td>CVA</td>
          <td>{criteria.cva ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>Coronary Artery Disease</td>
          <td>{criteria.coronaryArteryDisease ? "Present" : "Not Present"}</td>
        </tr>
        {/* Add more rows for other criteria here */}
        <tr>
          <td>eGFR</td>
          <td>{criteria.eGFR}</td>
        </tr>
      </tbody>
    </table>
    <p className={results === "Low Risk" ? "low-risk" : "high-risk"}>
      Risk Level: {results}
    </p>
    {data ? (
      <pre>{JSON.stringify(data, null, 3)}</pre>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
    };
export default RiskStratification;
