import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RiskStratification = ({submit,preview}) => {

  const [riskOne, setRiskOne] = useState("Low Risk");
  const [riskTwo, setRiskTwo] = useState("Low Risk");
  const [riskThree, setRiskThree] = useState("Low Risk");
  const [riskFour, setRiskFour] = useState("Low Risk");

  const [criteria, setCriteria] = useState({
    'cva': false,
    'coronaryArteryDisease': false,
    'previousHeartAttacks': false,
    'breathlessness': false,
    'cad': false,
    'heartFailure': false,
    'ejectInterpretation': false,
    'hfrEF': false,
    'hfpeEF': false,
    'eGFR' : undefined
  });

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
        const userData = data.data.userData;
        const comorbiditiesData = data.data.comorbiditiesData;
        const bloodTestData = data.data.bloodTestData;
        const symptomsData = data.data.symptomsData;

        setCriteria((prevCriteria) => ({
          ...prevCriteria,
          'cva': comorbiditiesData.cva===true,
          'coronaryArteryDisease': comorbiditiesData.coronaryArteryDisease === true,
          'previousHeartAttacks': symptomsData.previousHeartAttacks===true,
          'breathlessness': symptomsData.breathlessness===true,
          'cad': bloodTestData.ejectionInterpretation === "CAD",
          'heartFailure': comorbiditiesData.heartFailure === true,
          'hfrEF': bloodTestData.ejectionInterpretation === "HfrEF",
          'hfpeEF':bloodTestData.ejectionInterpretation === "HfpeEF",
          'eGFR': bloodTestData.eGFRResult,
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
    checkRisk4();
  }, []);

  useEffect(() => {
    checkRisk1();
  }, [criteria]);

  const checkRisk1 = () => {
     
    let RiskOneLevel = 'Low Risk'

    if (criteria["cva"]) {
      RiskOneLevel=("High Risk (Probable CVA)");
    }
    setRiskOne(RiskOneLevel)
  };

  useEffect(() => {
    checkRisk2();
  }, [criteria]);

  const checkRisk2 = () => {
    let RiskTwoLevel = 'Low Risk'
      if(
          criteria["coronaryArteryDisease"] ||
          criteria["previousHeartAttacks"] ||
          criteria["breathlessness"] ||
          criteria["cad"]
        ) {
          RiskTwoLevel=("High Risk (Probable CAD)");
        }   
        setRiskTwo(RiskTwoLevel)
  };

  useEffect(() => {
    checkRisk3();
  }, [criteria]);

  const checkRisk3 = () => {
    let RiskTHreeLevel = 'Low Risk'
     if (
          criteria["heartFailure"] ||
          criteria["breathlessness"] ||
          criteria["hfrEF"] ||
          criteria["hfpeEF"]
        ) {
          RiskTHreeLevel=("High Risk (Probable Heart failure)");   
        }
        setRiskThree(RiskTHreeLevel)
  };

  useEffect(() => {
    checkRisk4();
  }, [criteria]);

  const checkRisk4 = () => {
    let RiskFourLevel = 'Low Risk'
    if (criteria["eGFR"] < 60) {
      RiskFourLevel=('High Risk (CKD)');
        }   
        setRiskFour(RiskFourLevel)
  };

return (
  <div>
    <h1>Risk Checker</h1>
      <p>Risk One: {riskOne}</p>
      <p>Risk Two: {riskTwo}</p>
      <p>Risk Three: {riskThree}</p>
      <p>Risk Four: {riskFour}</p>

   <div className="text-end mt-4">
    <button type="button" className="btn btn-primary display-4" onClick={() => preview("bloodTest")}
     >Preview</button>
      </div>
    <div className="text-end mt-4">
    <button type="submit" className="btn btn-primary display-4" onClick={() => submit("contraindications")}
     >Submit</button>
      </div>

  </div>
  
);
};
export default RiskStratification;
