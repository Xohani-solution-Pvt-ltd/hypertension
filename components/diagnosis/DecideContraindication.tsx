import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authentication";

const DecideContraindication = ({ submit, preview }) => {
  const { userInfo } = useContext(AuthContext);
  const [contraindication1, setContraindication1] = useState("");
  const [contraindication2, setContraindication2] = useState("");
  const [contraindication3, setContraindication3] = useState("");
  const [showContraindications, setShowContraindications] = useState(false);

  const [criteria, setCriteria] = useState({
    Cr: undefined,
    K: undefined,
    PulseRate: undefined,
    UricAcid: undefined,
  });

  const fetchCriteriaData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/allFetchData?id=${userInfo._id}`
      );
      const data = response.data;

      if (
        data &&
        data.data &&
        data.data.bloodTestData &&
        data.data.diagnosisData
      ) {
        const bloodTestData = data.data.bloodTestData;
        const diagnosisTestData = data.data.diagnosisData;

        const Cr = bloodTestData.creatinine;
        const K = bloodTestData.potassium;
        const PulseRate = diagnosisTestData.pulseRate;
        const UricAcid = bloodTestData.uricAcid;

        setCriteria({ Cr, K, PulseRate, UricAcid });
        setShowContraindications(true);
      } else {
        console.error("Required data properties are undefined");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkRisk1 = () => {
    let RiskOneLevel = "";
    if (criteria["Cr"] > 2.5 || criteria["K"] > 5.5) {
      RiskOneLevel = "No Ace (A1), No ARB (A2), No MRA (D3)";
    }
    setContraindication1(RiskOneLevel);
  };

  const checkRisk2 = () => {
    let RiskTwoLevel = "";
    if (criteria["PulseRate"] < 60) {
      RiskTwoLevel = "No B# (B)";
    }
    setContraindication2(RiskTwoLevel);
  };

  const checkRisk3 = () => {
    let RiskThreeLevel = "";
    if (criteria["UricAcid"] > 9) {
      RiskThreeLevel = "No Thiazide (D1)";
    }
    setContraindication3(RiskThreeLevel);
  };

  const handleCalculateContraindications = () => {
    fetchCriteriaData();
  };

  useEffect(() => {
    fetchCriteriaData();
  }, []);

  useEffect(() => {
    if (showContraindications) {
      checkRisk1();
      checkRisk2();
      checkRisk3();
    }
  }, [criteria, showContraindications]);

  return (
    <>
      <div className="text-center pt-5">
        <h3>Decide Contraindications</h3>
        <button
          type="button"
          className="btn btn-primary display-4"
          onClick={handleCalculateContraindications}
        >
          Click here to see Contraindications
        </button>
        {showContraindications && (
          <>
            <p>{contraindication1}</p>
            <p>{contraindication2}</p>
            <p>{contraindication3}</p>
          </>
        )}
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="btn btn-primary display-4"
          onClick={() => preview("stratification")}
        >
          Back
        </button>
        <button
          type="submit"
          className="float-end btn btn-primary display-4"
          onClick={() => submit("treatment")}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default DecideContraindication;
