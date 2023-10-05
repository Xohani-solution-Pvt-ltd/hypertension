
    // components/DiagnosisComponent.js
import React, { useState, useEffect } from 'react';
import dia from '../../pages/server/user'

  const TreatmentModality = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/createProfile');
        console.log("data",response)
        const jsonData = await response.json();
       setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
 
    fetchData();
  }, []);
  
 return(
  <div>
     {data ? (
         <pre>{JSON.stringify(data, null, 3)}</pre>
       ) : (
       <p>Loading...</p>
      )}

     </div> 
     )
      }
      // {data&&Array.isArray(data)&&data.map((data) =>

export default TreatmentModality


