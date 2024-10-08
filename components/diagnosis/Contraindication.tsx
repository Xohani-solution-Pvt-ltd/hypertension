import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Image from "next/image";
import ContraindicationImg from "../../assets/images/Contraindication.png";
import { AuthContext } from "../../context/authentication";

const Contraindication = ({ submit, preview }) => {
  const { userInfo } = useContext(AuthContext);
  const [contraindication1, setContraindication1] = useState("");
  const [contraindication2, setContraindication2] = useState("");
  const [contraindication3, setContraindication3] = useState("");

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

        setCriteria((prevCriteria) => ({
          ...prevCriteria,
          Cr,
          K,
          PulseRate,
          UricAcid,
        }));
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
      RiskOneLevel = "No Ace (A1) , No ARB (A2) , No MRA (D3)";
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

  useEffect(() => {
    fetchCriteriaData();
  }, []);

  useEffect(() => {
    checkRisk1();
    checkRisk2();
    checkRisk3();
  }, [criteria]);

  return (
    <div>
      <h3>Decide Contraindications</h3>
      {contraindication1}
      <br />
      {contraindication2}
      <br />
      {contraindication3}
      <div className="d-flex justify-content-center">
        <Image
          src={ContraindicationImg}
          height={300}
          width={300}
          alt="Hypertension"
        />
      </div>
      <div className="text-end mt-4">
        <button
          type="button"
          className="btn btn-primary display-4"
          onClick={() => preview("stratification")}
        >
          Back
        </button>
      </div>
      <div className="text-end mt-4">
        <button
          type="submit"
          className="btn btn-primary display-4"
          onClick={() => submit("treatment")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Contraindication;
