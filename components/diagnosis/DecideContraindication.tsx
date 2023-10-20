import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';


const DecideContraindication = ({submit,preview}) => {
  const [contraindication, setContraindication] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/allFetchData');
        const data = response.data;

        if (data && data.data && data.data.bloodTestData && data.data.diagnosisData) {
          const bloodTestData = data.data.bloodTestData;
          const diagnosisTestData = data.data.diagnosisData;

          const Cr = bloodTestData.creatinine;
          const K = bloodTestData.potassium;
          const PulseRate = diagnosisTestData.pulseRate;
          const UricAcid = bloodTestData.uricAcid;

          if (Cr > 2.5 || K > 5.5) {
            setContraindication(
              <div>
                <p>No Ace (A1)</p>
                <p>No ARB (A2)</p>
                <p>No MRA (D3)</p>
              </div>
            );
          } else if (PulseRate < 60) {
            setContraindication(<p>No B# (B)</p>);
          } else if (UricAcid > 9) {
            setContraindication(<p>No Thiazide (D1)</p>);
          } else {
            setContraindication(<p>No contraindications</p>);
          }
        } else {
          setContraindication(<p>Data not available</p>);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setContraindication(<p>Error fetching data</p>);
      }
    };

    fetchData();
  }, []);

  return (<div>{contraindication}
  
  <div className="text-end mt-4">
    <button type="button" className="btn btn-primary display-4" onClick={() => preview("comorbidities")}
     >Preview</button>
      </div>
    <div className="text-end mt-4">
    <button type="submit" className="btn btn-primary display-4" onClick={() => submit("comorbidities")}
     >Submit</button>
      </div>
  
  
  </div>)
};


export default DecideContraindication;
