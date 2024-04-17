import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authentication";

const RiskStratification = ({ submit, preview }) => {
  const { userInfo } = useContext(AuthContext);
  const [risk, setRisk] = useState(" ");
  const [showRisk, setShowRisk] = useState(false);

  const fetchCriteriaData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/allFetchData?id=${userInfo._id}`
      );
      const data = response.data;

      if (
        data &&
        data.data &&
        data.data.userData &&
        data.data.comorbiditiesData &&
        data.data.bloodTestData &&
        data.data.symptomsData
      ) {
        const comorbiditiesData = data.data.comorbiditiesData;
        const bloodTestData = data.data.bloodTestData;
        const symptomsData = data.data.symptomsData;

        const criteria = {
          cva: comorbiditiesData.cva === true,
          coronaryArteryDisease:
            comorbiditiesData.coronaryArteryDisease === true,
          previousHeartAttacks: symptomsData.previousHeartAttacks === true,
          breathlessness: symptomsData.breathlessness === true,
          cad: bloodTestData.ejectionInterpretation === "CAD",
          heartFailure: comorbiditiesData.heartFailure === true,
          hfrEF: bloodTestData.ejectionInterpretation === "HfrEF",
          hfpeEF: bloodTestData.ejectionInterpretation === "HfpeEF",
          eGFR: bloodTestData.eGFRResult,
        };

        setRisk(checkRisk(criteria));
        setShowRisk(true);
      } else {
        console.error("Required data properties are undefined");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkRisk = (criteria) => {
    let RiskLevel = "Low Risk";

    if (
      criteria["cva"] ||
      criteria["coronaryArteryDisease"] ||
      criteria["previousHeartAttacks"] ||
      criteria["breathlessness"] ||
      criteria["cad"] ||
      criteria["heartFailure"] ||
      criteria["hfrEF"] ||
      criteria["hfpeEF"] ||
      criteria["eGFR"]
    ) {
      RiskLevel = "High Risk";

      if (criteria["cva"]) {
        RiskLevel += " (Probable CVA)";
      }

      if (
        criteria["coronaryArteryDisease"] ||
        criteria["previousHeartAttacks"] ||
        criteria["breathlessness"] ||
        criteria["cad"]
      ) {
        RiskLevel += " (Probable CAD)";
      }

      if (
        criteria["heartFailure"] ||
        criteria["breathlessness"] ||
        criteria["hfrEF"] ||
        criteria["hfpeEF"]
      ) {
        RiskLevel += " (Probable Heart failure)";
      }

      if (criteria["eGFR"] < 60) {
        RiskLevel += " (Probable CKD)";
      }
    }

    return RiskLevel;
  };

  const handleCalculateRisk = () => {
    fetchCriteriaData();
  };

  return (
    <>
      <div className="text-center pt-5">
        <h3>Risk Checker</h3>
        <button
          type="button"
          className="btn btn-primary display-4"
          onClick={handleCalculateRisk}
        >
          Click here to see Risk
        </button>
        {showRisk && <p>{risk}</p>}
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="btn btn-primary display-4"
          onClick={() => preview("bloodTest")}
        >
          Back
        </button>
        <button
          type="submit"
          className="float-end btn btn-primary display-4"
          onClick={() => submit("decideContraindication")}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default RiskStratification;
