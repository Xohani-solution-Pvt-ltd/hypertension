
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';

const Contraindication = ({submit,preview}) => {
  const [contraindication1, setContraindication1] = useState("");
  const [contraindication2, setContraindication2] = useState("");
  const [contraindication3, setContraindication3] = useState("");

  const [criteria, setCriteria] = useState({
    'Cr': undefined,
    'K': undefined,
    'PulseRate': undefined,
    'UricAcid': undefined
    });

  const fetchCriteriaData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/allFetchData');
      const data = response.data;
      console.log("dataoftest",data)
      if (data && data.data && data.data.bloodTestData && data.data.diagnosisData) {
        const bloodTestData = data.data.bloodTestData;
        const diagnosisTestData = data.data.diagnosisData;

        const Cr = bloodTestData.creatinine;
        const K = bloodTestData.potassium;
        const PulseRate = diagnosisTestData.pulseRate;
        const UricAcid = bloodTestData.uricAcid;

        setCriteria((prevCriteria) => ({
          ...prevCriteria,
          'Cr': Cr,
          'K': K,
          'PulseRate': PulseRate,
          'UricAcid': UricAcid
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
    checkRisk1();
    checkRisk2();
    checkRisk3();
  }, []);

  useEffect(() => {
    checkRisk1();
  }, [criteria]);

  const checkRisk1 = () => {
    let RiskOneLevel = ''
    if (criteria["Cr"]>2.5 || criteria["K"] >5.5) {
      RiskOneLevel=("No Ace (A1)No ARB (A2)No MRA (D3)")
    }
    setContraindication1(RiskOneLevel)
  };

  useEffect(() => {
    checkRisk2();
  }, [criteria]);

  const checkRisk2 = () => {
     
    let RiskTwoLevel = ''

    if (criteria["PulseRate"]< 60){
      RiskTwoLevel=("No B# (B)")
    }
    setContraindication2(RiskTwoLevel)
  };

  useEffect(() => {
    checkRisk3();
  }, [criteria]);

  const checkRisk3 = () => {
     
    let RiskThreeLevel = ''

    if (criteria["UricAcid"]> 9) {
      RiskThreeLevel=("No Thiazide (D1)")
    }
    setContraindication3(RiskThreeLevel)
  };

  return (
  <div>
    {contraindication1}<br></br>
    {contraindication2}<br></br>
    {contraindication3}
  <div className="mt-4">
      </div>
    <div className="mt-4">
    <button type="button" className="text-start btn btn-primary display-4" onClick={() => preview("stratification")}
     >Preview</button>
    <button type="submit" className="float-end btn btn-primary display-4" onClick={() => submit("treatment")}
     >Submit</button>
      </div>
  </div>)
};


export default Contraindication;
