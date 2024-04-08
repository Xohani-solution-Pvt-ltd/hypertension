import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../context/authentication";

const RiskStratification = ({ submit, preview }) => {
  const { userInfo } = useContext(AuthContext);
  const [risk, setRisk] = useState(" ");

  const [criteria, setCriteria] = useState({
    cva: false,
    coronaryArteryDisease: false,
    previousHeartAttacks: false,
    breathlessness: false,
    cad: false,
    heartFailure: false,
    hfrEF: false,
    hfpeEF: false,
    eGFR: undefined,
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
        data.data.userData &&
        data.data.comorbiditiesData &&
        data.data.bloodTestData &&
        data.data.symptomsData
      ) {
        const comorbiditiesData = data.data.comorbiditiesData;
        const bloodTestData = data.data.bloodTestData;
        const symptomsData = data.data.symptomsData;

        setCriteria((prevCriteria) => ({
          ...prevCriteria,
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

  const checkRisk = () => {
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

    setRisk(RiskLevel);
  };

  return (
    <>
      <div className="text-center pt-5">
        <h3>Risk Checker</h3>
        <p>{risk}</p>
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
          className=" float-end btn btn-primary display-4"
          onClick={() => submit("decideContraindication")}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default RiskStratification;
