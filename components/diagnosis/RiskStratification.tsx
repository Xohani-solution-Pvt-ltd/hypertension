import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authentication";
import Image from "next/image";
import RiskImg from "../../assets/images/Riskchecker.jpg";

const RiskStratification = ({ submit, preview }) => {
  const { userInfo } = useContext(AuthContext);
  const [risk, setRisk] = useState(" ");
  const [showRisk, setShowRisk] = useState(false);

  const fetchCriteriaData = async () => {
    try {
      const response = await axios.get(
        `http://mongodb+srv://himanshumankar22:Hypertension1@cluster0.n7fxd.mongodb.net/hyperTDB?retryWrites=true&w=majority&appName=Cluster0/api/allFetchData?id=${userInfo._id}`
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
          cva:
            comorbiditiesData.cva.paralysis ||
            comorbiditiesData.cva.blurringOfVision ||
            comorbiditiesData.cva.slurringOfSpeech,
          coronaryArteryDisease: comorbiditiesData.coronaryArteryDisease,
          previousHeartAttacks: symptomsData.previousHeartAttacks,
          breathlessness:
            symptomsData.breathlessness.minorNYHA ||
            symptomsData.breathlessness.majorNYHA,
          cad: bloodTestData.ejectionInterpretation,
          heartFailure: comorbiditiesData.heartFailure,
          hfrEF: bloodTestData.ejectionInterpretation,
          hfpeEF: bloodTestData.ejectionInterpretation,
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
        <div className="">
          <Image src={RiskImg} height={150} width={300} alt="Hypertension" />
        </div>

        <button
          type="button"
          className="btn btn-primary display-4"
          style={{ marginTop: "20px" }}
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
