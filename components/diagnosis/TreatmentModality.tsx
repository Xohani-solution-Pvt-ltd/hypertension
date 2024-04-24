import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Image from "next/image";
import { AuthContext } from "../../context/authentication";
import TreatmentImg from "../../assets/images/treatment.png";

const Treatment = ({ preview }) => {
  const { userInfo } = useContext(AuthContext);
  const [results1, setResults1] = useState("prescriptions");
  const [results2, setResults2] = useState("prescriptions");
  const [results3, setResults3] = useState("prescriptions");
  const [results4, setResults4] = useState("prescriptions");
  const [results5, setResults5] = useState("prescriptions");
  const [results6, setResults6] = useState("prescriptions");
  const [results7, setResults7] = useState("prescriptions");
  const [results8, setResults8] = useState("prescriptions");
  const [results9, setResults9] = useState("prescriptions");
  const [medicineSuggestion, setMedicineSuggestion] = useState("");

  const [criteria, setCriteria] = useState({
    cva: null,
    coronaryArteryDisease: null,
    heartFailure: null,
    diabetes: null,
    pregnancy: null,
    lungDisease: null,
    previousHeartAttacks: null,
    breathlessness: null,
    legSwelling: null,
    hBA1CInterpretation: undefined,
    kidneyInterpretation: undefined,
    ejectNormalInterpretation: undefined,
    ejectHfrefInterpretation: undefined,
    eGFR: undefined,
    ejectHfprefInterpretation: undefined,
    ejectCadInterpretation: undefined,
    presentdiabetes: null,
    age: null,
  });

  const fetchCriteriaData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/allFetchData?id=${userInfo._id}`
      );
      const data = response.data;
      console.log("Response Data:", data);
      if (
        data &&
        data.data &&
        data.data.comorbiditiesData &&
        data.data.bloodTestData &&
        data.data.symptomsData &&
        data.data.userData
      ) {
        const comorbiditiesData = data.data.comorbiditiesData;
        const bloodTestData = data.data.bloodTestData;
        const symptomsData = data.data.symptomsData;

        const UserData = data.data.userData;

        setCriteria((prevCriteria) => ({
          ...prevCriteria,

          cva:
            comorbiditiesData.cva.paralysis ||
            comorbiditiesData.cva.blurringOfVision ||
            comorbiditiesData.cva.slurringOfSpeech,
          coronaryArteryDisease: comorbiditiesData.coronaryArteryDisease,
          heartFailure: comorbiditiesData.heartFailure,
          diabetes: comorbiditiesData.diabetes,
          pregnancy: comorbiditiesData.pregnancy,
          lungDisease: comorbiditiesData.lungDisease,
          previousHeartAttacks: symptomsData.previousHeartAttacks,
          breathlessness:
            symptomsData.breathlessness.minorNYHA ||
            symptomsData.breathlessness.majorNYHA,
          legSwelling: symptomsData.legSwelling,

          hBA1CInterpretation: bloodTestData.hBA1CInterpretation,
          kidneyInterpretation: bloodTestData.kidneyInterpretation,
          ejectNormalInterpretation: bloodTestData.ejectionInterpretation,
          ejectHfrefInterpretation: bloodTestData.ejectionInterpretation,
          eGFR: bloodTestData.eGFRResult,
          ejectHfprefInterpretation: bloodTestData.ejectionInterpretation,
          ejectCadInterpretation: bloodTestData.ejectionInterpretation,
          presentdiabetes: comorbiditiesData.diabetes,
          age: bloodTestData.age,
        }));
        console.log("Criteria State:", criteria);
        checkRisk1();
        checkRisk2();
        checkRisk3();
        checkRisk4();
        checkRisk5();
        checkRisk6();
        checkRisk7();
        checkRisk8();
        checkRisk9();
      } else {
        console.error("Required data properties are undefined");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log("Criteria State:", criteria);
  }, [criteria]);

  const checkTreatment = () => {
    fetchCriteriaData();
  };

  const checkRisk1 = () => {
    let riskLevel = "";
    if (
      criteria["cva"] &&
      criteria["coronaryArteryDisease"] &&
      criteria["heartFailure"] &&
      criteria["diabetes"] &&
      criteria["pregnancy"] &&
      criteria["lungDisease"] &&
      criteria["hBA1CInterpretation"] &&
      criteria["kidneyInterpretation"] &&
      criteria["ejectNormalInterpretation"]
    ) {
      riskLevel = " group 1 = treatment A + B or C + D";
    }

    setResults1(riskLevel);
  };

  const checkRisk2 = () => {
    let riskLevel = "";

    if (criteria["eGFR"] < 60 && criteria["ejectHfrefInterpretation"]) {
      riskLevel = " group 2 = treatment E + D2 , B ";
    }

    setResults2(riskLevel);
  };

  const checkRisk3 = () => {
    let riskLevel = "";
    if (
      (criteria["eGFR"] < 60 && criteria["ejectHfprefInterpretation"]) ||
      criteria["ejectCadInterpretation"]
    ) {
      riskLevel = "group 3 = treatment C + D2 , B + D2";
    }
    setResults3(riskLevel);
  };

  const checkRisk4 = () => {
    let riskLevel = "";
    if (criteria["eGFR"] > 60 && criteria["ejectHfrefInterpretation"]) {
      riskLevel = " group 4 = treatment A3 + B , D3 + D2 ";
    }
    setResults4(riskLevel);
  };

  const checkRisk5 = () => {
    let riskLevel = "";

    if (criteria["eGFR"] > 60 && criteria["ejectHfprefInterpretation"]) {
      riskLevel = " group 5 = treatment A1 + D3 ";
    }

    setResults5(riskLevel);
  };

  const checkRisk6 = () => {
    let riskLevel = "";

    if (criteria["eGFR"] > 60 && criteria["ejectCadInterpretation"]) {
      riskLevel = " group 6 = treatment A + B ";
    }

    setResults6(riskLevel);
  };

  const checkRisk7 = () => {
    let riskLevel = "";

    if (criteria["eGFR"] > 60 && criteria["cva"]) {
      riskLevel = " group 7 = treatment A + D1 ";
    }

    setResults7(riskLevel);
  };

  const checkRisk8 = () => {
    let riskLevel = "";

    if (
      criteria["eGFR"] > 60 &&
      criteria["presentdiabetes"] &&
      criteria["hBA1CInterpretation"]
    ) {
      riskLevel = " group 8 = treatment A + D1 ";
    }

    setResults8(riskLevel);
  };

  const checkRisk9 = () => {
    let riskLevel = "";

    if (criteria["eGFR"] > 60 && criteria["age"] > 80) {
      riskLevel = " group 9 = treatment C";
    }

    setResults9(riskLevel);
  };

  useEffect(() => {
    checkTreatment();
  }, []);

  useEffect(() => {
    checkRisk1();
    checkRisk2();
    checkRisk3();
    checkRisk4();
    checkRisk5();
    checkRisk6();
    checkRisk7();
    checkRisk8();
    checkRisk9();
    const calculateMedicineSuggestion = () => {
      if (results1) {
        setMedicineSuggestion("Treatment A + B or C + D");
      } else if (results2) {
        setMedicineSuggestion("Treatment E + D2, B");
      } else if (results3) {
        setMedicineSuggestion("Treatment C + D2, B + D2");
      } else if (results4) {
        setMedicineSuggestion("Treatment A3 + B, D3 + D2");
      } else if (results5) {
        setMedicineSuggestion("Treatment A1 + D3");
      } else if (results6) {
        setMedicineSuggestion("Treatment A + B");
      } else if (results7) {
        setMedicineSuggestion("Treatment A + D1");
      } else if (results8) {
        setMedicineSuggestion("Treatment A + D1");
      } else if (results9) {
        setMedicineSuggestion("Treatment C");
      }
    };
    calculateMedicineSuggestion();
  }, [
    results1,
    results2,
    results3,
    results4,
    results5,
    results6,
    results7,
    results8,
    results9,
  ]);

  return (
    <>
      <Container fluid>
        <div
          className="text-center pt-5 d-flex"
          style={{ justifyContent: "center" }}
        >
          <div className="" style={{ marginRight: "100px" }}>
            <Image
              src={TreatmentImg}
              height={150}
              width={150}
              alt="Hypertension"
            />
          </div>
          <div className="">
            <h1>Treatment check</h1>
            <button
              type="button"
              className="btn btn-primary display-4"
              onClick={checkTreatment}
            >
              Check Treatment
            </button>
            <p style={{ backgroundColor: "red" }}>{results1}</p>
            <p style={{ backgroundColor: "red" }}>{results2}</p>
            <p style={{ backgroundColor: "red" }}>{results3}</p>
            <p style={{ backgroundColor: "red" }}>{results4}</p>
            <p style={{ backgroundColor: "red" }}>{results5}</p>
            <p style={{ backgroundColor: "red" }}>{results6}</p>
            <p style={{ backgroundColor: "red" }}>{results7}</p>
            <p style={{ backgroundColor: "red" }}>{results8}</p>
            <p style={{ backgroundColor: "red" }}>{results9}</p>
            <p>Suggested Medicine: {medicineSuggestion}</p>
          </div>
        </div>
        <Table
          striped
          bordered
          hover
          style={{
            width: "100%",
            maxHeight: "auto",
            borderColor: "black",
            marginTop: "40px",
          }}
        >
          <thead>
            <tr>
              <th>Class</th>
              <th>Name</th>
              <th>Initial Dose (first visit)</th>
              <th></th>
              <th>1st uptitration (follow up)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A1</td>
              <td>Ramipril</td>
              <td>5 mg</td>
              <td>Once a day</td>
              <td>5 mg</td>
              <td>Twice a day</td>
            </tr>
            <tr>
              <td>A2</td>
              <td>Telmisartan</td>
              <td>40 mg</td>
              <td>Once a day</td>
              <td>40 mg</td>
              <td>Twice a day</td>
            </tr>
            <tr>
              <td>A3</td>
              <td>Sacubtril + Valsartan</td>
              <td>25 mg </td>
              <td>Twice a day</td>
              <td>50 mg</td>
              <td>Twice a day</td>
            </tr>
            <tr>
              <td>B</td>
              <td>Metoprolol</td>
              <td>25 mg </td>
              <td>Once a day</td>
              <td>25 mg</td>
              <td>Twice a day</td>
            </tr>
            <tr>
              <td>C</td>
              <td>Amlodipine</td>
              <td>5 mg </td>
              <td>Once a day</td>
              <td>10 mg</td>
              <td>Once a day</td>
            </tr>
            <tr>
              <td></td>
              <td>Clinidipine</td>
              <td>10 mg </td>
              <td>Once a day</td>
              <td>10 mg</td>
              <td>Twice a day</td>
            </tr>
            <tr>
              <td>D1</td>
              <td>Hydrochlorthiazide</td>
              <td>12.5 mg </td>
              <td>Once a day</td>
              <td>25 mg</td>
              <td>Twice a day</td>
            </tr>
            <tr>
              <td>D2</td>
              <td>Furosemide</td>
              <td>40 mg </td>
              <td>Once a day</td>
              <td>40 mg</td>
              <td>Twice a day</td>
            </tr>
            <tr>
              <td>D3</td>
              <td>Spironolactone</td>
              <td>25 mg </td>
              <td>Once a day</td>
              <td>25 mg</td>
              <td>Twice a day</td>
            </tr>
            <tr>
              <td>E</td>
              <td>
                Isolazine (Isosorbide Dinitrate (20mg) + Hydralazine (37.5mg)
              </td>
              <td>1/2 Tablet </td>
              <td>Three times a day</td>
              <td>1 Tablet</td>
              <td>Three times a day</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Treatment;
