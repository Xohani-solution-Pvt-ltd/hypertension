import React, { useEffect, useState, useMemo, useContext } from "react";
import { Container, Row, Col, Button, Nav, Tab, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getBloodTestAPI,
  submitBloodTestAPI,
  updateBloodTestAPI,
} from "../../services/call";
import { getCookie } from "cookies-next";
import notify from "../../helpers/notify";
import {
  BloodTestInterface,
  intialBloodTestValue,
} from "../../interfaces/bloodtest";
import axios from "axios";
import { AuthContext } from "../../context/authentication";

const validationSchema = Yup.object({
  hbA1cLevel: Yup.number()
    .required("HbA1c Level is required")
    .min(0, "HbA1c Level should be at least 36")
    .max(7, "HbA1c Level should not exceed 60"),
  hBA1CInterpretation: Yup.string().required("Interpretation is required"),
  totalCholesterol: Yup.number()
    .required("Total Cholesterol is required")
    .min(180, "Total Cholesterol must be at least 180")
    .max(240, "Total Cholesterol must not exceed 240"),
  lipidInterpretation: Yup.string().required("lipidInterpretation is required"),
  hdlCholesterol: Yup.number()
    .required("HDL Cholesterol is required")
    .min(60, "HDL Cholesterol must be at least 60")
    .max(80, "HDL Cholesterol must not exceed 80"),
  hdlInterpretation: Yup.string().required("hdlInterpretation is required"),
  ldlCholesterol: Yup.number()
    .required("LDL Cholesterol is required")
    .min(80, "LDL Cholesterol must be at least 80")
    .max(100, "LDL Cholesterol must not exceed 100"),
  ldlInterpretation: Yup.string().required("ldlInterpretation is required"),
  triglycerides: Yup.number()
    .required("Triglycerides is required")
    .min(150, "Triglycerides must be at least 150")
    .max(499, "Triglycerides must not exceed 499"),
  triglyceridesInterpretation: Yup.string().required(
    "triglyceridesInterpretation is required"
  ),
  albumin: Yup.number()
    .required("Albumin is required")
    .min(10, "Albumin must be at least 10")
    .max(150, "Albumin must not exceed 150"),
  creatinine: Yup.number()
    .required("Creatinine is required")
    .min(0.1, "Creatinine must be at least 0.1")
    .max(2.0, "Creatinine must not exceed 2.0"),
  acrResult: Yup.string().required("ACR Result is required"),
  sodium: Yup.number()
    .required("Sodium is required")
    .min(110, "Sodium must be at least 110")
    .max(170, "Sodium must not exceed 170"),
  potassium: Yup.number()
    .required("Potassium is required")
    .min(2, "Potassium must be at least 2")
    .max(8, "Potassium must not exceed 8"),
  uricAcid: Yup.number()
    .required("Uric Acid is required")
    .min(2, "Uric Acid must be at least 2")
    .max(10, "Uric Acid must not exceed 10"),
  kidneyInterpretation: Yup.string().required(
    "kidneyInterpretation is required"
  ),
  tshLevel: Yup.number()
    .required("TSH Level is required")
    .min(0, "TSH Level must be at least 0")
    .max(8, "TSH Level must not exceed 8"),
  tshInterpretation: Yup.string().required("tshInterpretation is required"),
  renalArteryDoppler: Yup.string(),
  ejectionFraction: Yup.number()
    .min(20, "Ejection must be at least 20")
    .max(80, "Ejection must not exceed 80"),
  coronaryArteryDisease: Yup.string(),
});

const BloodTest = ({ submit, preview }) => {
  const { userInfo } = useContext(AuthContext);
  const [bloodTestId, setBloodTestId] = useState(undefined);
  const [hbA1cLevelData, setHbA1cLevelData] = useState(undefined);
  const [normalHbA1cLevelData, setNormalHbA1cLevelData] = useState(undefined);
  const [hBA1CInterpretationData, setHBA1CInterpretationData] =
    useState(undefined);
  const [totalCholesterolData, setTotalCholesterolData] = useState(undefined);
  const [normalTotalCholesterolData, setNormalTotalCholesterolData] =
    useState(undefined);
  const [lipidInterpretationData, setLipidInterpretationData] =
    useState(undefined);
  const [hdlCholesterolData, setHdlCholesterolData] = useState(undefined);
  const [normalHdlCholesterolData, setNormalHdlCholesterolData] =
    useState(undefined);
  const [hdlInterpretationData, setHdlInterpretationData] = useState(undefined);
  const [ldlCholesterolData, setLdlCholesterolData] = useState(undefined);
  const [normalLdlCholesterolData, setNormalLdlCholesterolData] =
    useState(undefined);
  const [ldlInterpretationData, setLdlInterpretationData] = useState(undefined);
  const [triglyceridesData, setTriglyceridesData] = useState(undefined);
  const [normalTriglyceridesData, setNormalTriglyceridesData] =
    useState(undefined);
  const [triglyceridesInterpretationData, setTriglyceridesInterpretationData] =
    useState(undefined);
  const [albuminData, setAlbuminData] = useState(undefined);
  const [creatinineData, setCreatinineData] = useState(undefined);
  const [acrResultData, setAcrResultData] = useState(undefined);
  const [sodiumData, setSodiumData] = useState(undefined);
  const [potassiumData, setPotassiumData] = useState(undefined);
  const [uricAcidData, setUricAcidData] = useState(undefined);
  const [kidneyInterpretationData, setKidneyInterpretationData] =
    useState(undefined);
  const [tshLevelData, setTshLevelData] = useState(undefined);
  const [normalTshLevelData, setNormalTshLevelData] = useState(undefined);
  const [tshInterpretationData, setTshInterpretationData] = useState(undefined);
  const [renalArteryDopplerData, setRenalArteryDopplerData] =
    useState(undefined);
  const [coronaryArteryDiseaseData, setCoronaryArteryDiseaseData] =
    useState(undefined);
  const [ejectionFractionData, setEjectionFractionData] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [bloodTestData, setBloodTestData] = useState(intialBloodTestValue);
  const [eGFRResultData, setEGFRResultData] = useState(undefined);
  const [ageData, setAgeData] = useState(undefined);
  const [ejectionInterpretationData, setEjectionInterpretationData] =
    useState(undefined);

  const handleSubmit = async () => {
    const bloodInputData: BloodTestInterface = {
      hbA1cLevel: hbA1cLevelData,
      normalHbA1cLevel: normalHbA1cLevelData,
      hBA1CInterpretation: hBA1CInterpretationData,
      totalCholesterol: totalCholesterolData,
      normalTotalCholesterol: normalTotalCholesterolData,
      lipidInterpretation: lipidInterpretationData,
      hdlCholesterol: hdlCholesterolData,
      normalHdlCholesterol: normalHdlCholesterolData,
      hdlInterpretation: hdlInterpretationData,
      ldlCholesterol: ldlCholesterolData,
      normalLdlCholesterol: ldlCholesterolData,
      ldlInterpretation: ldlInterpretationData,
      triglycerides: triglyceridesData,
      normalTriglycerides: triglyceridesData,
      triglyceridesInterpretation: triglyceridesInterpretationData,
      albumin: albuminData,
      creatinine: creatinineData,
      acrResult: acrResultData,
      sodium: sodiumData,
      potassium: potassiumData,
      uricAcid: uricAcidData,
      kidneyInterpretation: kidneyInterpretationData,
      tshLevel: tshLevelData,
      normalTshLevel: tshLevelData,
      tshInterpretation: tshInterpretationData,
      renalArteryDoppler: renalArteryDopplerData,
      coronaryArteryDisease: coronaryArteryDiseaseData,
      ejectionFraction: ejectionFractionData,
      eGFRResult: eGFRResultData,
      age: ageData,
      ejectionInterpretation: ejectionInterpretationData,
    };

    if (
      hbA1cLevelData ||
      normalHbA1cLevelData ||
      hBA1CInterpretationData ||
      totalCholesterolData ||
      normalTotalCholesterolData ||
      lipidInterpretationData ||
      hdlCholesterolData ||
      normalHdlCholesterolData ||
      hdlInterpretationData ||
      ldlCholesterolData ||
      normalLdlCholesterolData ||
      ldlInterpretationData ||
      triglyceridesData ||
      normalTriglyceridesData ||
      triglyceridesInterpretationData ||
      albuminData ||
      creatinineData ||
      acrResultData ||
      sodiumData ||
      potassiumData ||
      uricAcidData ||
      kidneyInterpretationData ||
      tshLevelData ||
      normalTshLevelData ||
      tshInterpretationData ||
      renalArteryDopplerData ||
      coronaryArteryDiseaseData ||
      ejectionFractionData ||
      eGFRResultData ||
      ageData ||
      eGFRResultData

    ) {
      if (editing) {
        if (bloodTestId) {
          const [data, err] = await updateBloodTestAPI(
            bloodTestId,
            bloodInputData
          );
          if (data) {
            notify.success("Successfully Update BloodTest");
          }
        } else {
          notify.error("BloodTest ID is missing. Cannot update.");
        }
      } else {
        const [data, err] = await submitBloodTestAPI(bloodInputData);
        if (data) {
          setEditing(true);
          setBloodTestId(data.id);
          notify.success("Successfully Added BloodTest");
        }
      }
    } else {
      notify.error("Fillup All Required Fields ");
    }
  };

  const fetchBloodTestDetails = async (id) => {
    const [data, err] = await getBloodTestAPI(id);
    if (data?.data != null) {
      setBloodTestData(data.data);
      setEditing(true);
      setBloodTestId(data.data._id);
    }
    if (err) {
      notify.error(err?.message);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo._id) {
      const id = userInfo._id;
      fetchBloodTestDetails(id);
    }
  }, []);

  useEffect(() => {
    if (bloodTestData != undefined) {
      setHbA1cLevelData(bloodTestData.hbA1cLevel);
      setNormalHbA1cLevelData(bloodTestData.normalHbA1cLevel);
      setHBA1CInterpretationData(bloodTestData.hBA1CInterpretation);
      setTotalCholesterolData(bloodTestData.totalCholesterol);
      setNormalTotalCholesterolData(bloodTestData.normalTotalCholesterol);
      setLipidInterpretationData(bloodTestData.lipidInterpretation);
      setHdlCholesterolData(bloodTestData.hdlCholesterol);
      setNormalHdlCholesterolData(bloodTestData.normalHdlCholesterol);
      setHdlInterpretationData(bloodTestData.hdlInterpretation);
      setLdlCholesterolData(bloodTestData.ldlCholesterol);
      setNormalLdlCholesterolData(bloodTestData.normalLdlCholesterol);
      setLdlInterpretationData(bloodTestData.ldlInterpretation);
      setTriglyceridesData(bloodTestData.triglycerides);
      setNormalTriglyceridesData(bloodTestData.normalTriglycerides);
      setTriglyceridesInterpretationData(
        bloodTestData.triglyceridesInterpretation
      );
      setAlbuminData(bloodTestData.albumin);
      setCreatinineData(bloodTestData.creatinine);
      setAcrResultData(bloodTestData.acrResult);
      setSodiumData(bloodTestData.sodium);
      setPotassiumData(bloodTestData.potassium);
      setUricAcidData(bloodTestData.uricAcid);
      setKidneyInterpretationData(bloodTestData.kidneyInterpretation);
      setTshLevelData(bloodTestData.tshLevel);
      setNormalTshLevelData(bloodTestData.normalTshLevel);
      setTshInterpretationData(bloodTestData.tshInterpretation);
      setRenalArteryDopplerData(bloodTestData.renalArteryDoppler);
      setCoronaryArteryDiseaseData(bloodTestData.coronaryArteryDisease);
      setEjectionFractionData(bloodTestData.ejectionFraction);
    }
  }, [bloodTestData]);

  return (
    <>
      <Row className="media-container-row m-4">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">
          Blood Test
        </h4>
        <Formik
          initialValues={bloodTestData}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ setFieldValue }) => {
            return (
              <Form>
                <Row>
                  <Col>
                    <Row className="media-container-row">
                      <h4 className="mbr-fonts-style mbr-text display-4 mbr-bold">
                        HBA1C
                      </h4>
                      <Col md={6} className="align-left p-2">
                        <label htmlFor="hbA1cLevel">HbA1c Level</label>
                        <Field
                          type="number"
                          id="hbA1cLevel"
                          name="hbA1cLevel"
                          className="form-control"
                          placeholder="Enter HbA1c Range (e.g., 0 - 7)"
                          onChange={(e) => {
                            const hbA1cLevel = parseFloat(e.target.value);
                            setFieldValue("hbA1cLevel", hbA1cLevel);
                            setHbA1cLevelData(hbA1cLevel);

                            const interpretation =
                              hbA1cLevel > 7 ? "Abnormal" : "Normal";
                            setFieldValue(
                              "hBA1CInterpretation",
                              interpretation
                            );
                            setHBA1CInterpretationData(interpretation);
                          }}
                        />
                        <ErrorMessage
                          name="hbA1cLevel"
                          component="div"
                          className="text-danger"
                        />
                      </Col>

                      <Col md={6} className="align-left p-2">
                        <label htmlFor="hBA1CInterpretation">
                          HBA1C Interpretation
                        </label>
                        <Field
                          as="select"
                          id="hBA1CInterpretation"
                          name="hBA1CInterpretation"
                          className="form-control"
                          disabled
                        >
                          <option
                            value=""
                            style={{
                              display: "none",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            HBA1C Interpretation ▼
                          </option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                        </Field>
                        <ErrorMessage
                          name="hBA1CInterpretation"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <h4 className="mbr-fonts-style mbr-text display-4 mbr-bold">
                        Lipid
                      </h4>
                      <Col md={6} className="align-left p-2">
                        <label htmlFor="totalCholesterol">
                          Total Cholesterol
                        </label>
                        <Field
                          type="number"
                          id="totalCholesterol"
                          name="totalCholesterol"
                          className="form-control"
                          placeholder="Enter Total Cholesterol (e.g., 180 - 240)"
                          onChange={(e) => {
                            setFieldValue("totalCholesterol", e.target.value);
                            setTotalCholesterolData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="totalCholesterol"
                          component="div"
                          className="text-danger"
                        />
                      </Col>

                      <Col md={6} className="align-left p-2">
                        <label htmlFor="lipidInterpretation">
                          Lipid Interpretation
                        </label>
                        <Field
                          as="select"
                          id="lipidInterpretation"
                          name="lipidInterpretation"
                          className="form-control"
                          onChange={(e) => {
                            setFieldValue(
                              "lipidInterpretation",
                              e.target.value
                            );
                            setLipidInterpretationData(e.target.value);
                          }}
                        >
                          <option
                            value=""
                            style={{
                              display: "none",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            Lipid Interpretation ▼
                          </option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                        </Field>
                        <ErrorMessage
                          name="lipidInterpretation"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col md={6} className="align-left p-2">
                        <label htmlFor="hdlCholesterol">HDL Cholesterol</label>
                        <Field
                          type="number"
                          id="hdlCholesterol"
                          name="hdlCholesterol"
                          className="form-control"
                          placeholder="Enter HDL Cholesterol (e.g., 60 - 80)"
                          onChange={(e) => {
                            const hdlCholesterol = parseFloat(e.target.value);
                            setFieldValue("hdlCholesterol", hdlCholesterol);
                            setHdlCholesterolData(hdlCholesterol);

                            const interpretation =
                              hdlCholesterol > 80 ? "Abnormal" : "Normal";
                            setFieldValue("hdlInterpretation", interpretation);
                            setHdlInterpretationData(interpretation);
                          }}
                        />
                        <ErrorMessage
                          name="hdlCholesterol"
                          component="div"
                          className="text-danger"
                        />
                      </Col>

                      <Col md={6} className="align-left p-2">
                        <label htmlFor="hdlInterpretation">
                          HDL Interpretation
                        </label>
                        <Field
                          as="select"
                          id="hdlInterpretation"
                          name="hdlInterpretation"
                          className="form-control"
                          disabled
                        >
                          <option
                            value=""
                            style={{
                              display: "none",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            HDL Interpretation ▼
                          </option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                        </Field>
                        <ErrorMessage
                          name="hdlInterpretation"
                          component="div"
                          className="text-danger"
                        />
                      </Col>

                      <Col md={6} className="align-left p-2">
                        <label htmlFor="ldlCholesterol">LDL Cholesterol</label>
                        <Field
                          type="number"
                          id="ldlCholesterol"
                          name="ldlCholesterol"
                          className="form-control"
                          placeholder="Enter LDL Cholesterol (e.g., 80 - 100)"
                          onChange={(e) => {
                            const ldlCholesterol = parseFloat(e.target.value);
                            setFieldValue("ldlCholesterol", ldlCholesterol);
                            setLdlCholesterolData(ldlCholesterol);

                            const interpretation =
                              ldlCholesterol > 100 ? "Abnormal" : "Normal";
                            setFieldValue("ldlInterpretation", interpretation);
                            setLdlInterpretationData(interpretation);
                          }}
                        />
                        <ErrorMessage
                          name="ldlCholesterol"
                          component="div"
                          className="text-danger"
                        />
                      </Col>

                      <Col md={6} className="align-left p-2">
                        <label htmlFor="ldlInterpretation">
                          LDL Interpretation
                        </label>
                        <Field
                          as="select"
                          id="ldlInterpretation"
                          name="ldlInterpretation"
                          className="form-control"
                          disabled
                        >
                          <option
                            value=""
                            style={{
                              display: "none",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            LDL Interpretation ▼
                          </option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                        </Field>
                        <ErrorMessage
                          name="ldlInterpretation"
                          component="div"
                          className="text-danger"
                        />
                      </Col>

                      <Col md={6} className="align-left p-2">
                        <label htmlFor="triglycerides">Triglycerides</label>
                        <Field
                          type="number"
                          id="triglycerides"
                          name="triglycerides"
                          className="form-control"
                          placeholder="Enter Triglycerides (e.g., 150 - 499)"
                          onChange={(e) => {
                            const triglycerides = parseFloat(e.target.value);
                            setFieldValue("triglycerides", triglycerides);
                            setTriglyceridesData(triglycerides);

                            const interpretation =
                              triglycerides > 499 ? "Abnormal" : "Normal";
                            setFieldValue(
                              "triglyceridesInterpretation",
                              interpretation
                            );
                            setTriglyceridesInterpretationData(interpretation);
                          }}
                        />
                        <ErrorMessage
                          name="triglycerides"
                          component="div"
                          className="text-danger"
                        />
                      </Col>

                      <Col md={6} className="align-left p-2">
                        <label htmlFor="triglyceridesInterpretation">
                          Triglycerides Interpretation
                        </label>
                        <Field
                          as="select"
                          id="triglyceridesInterpretation"
                          name="triglyceridesInterpretation"
                          className="form-control"
                          disabled
                        >
                          <option
                            value=""
                            style={{
                              display: "none",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            Triglycerides Interpretation ▼
                          </option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                        </Field>
                        <ErrorMessage
                          name="triglyceridesInterpretation"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Row>
                    <Row className="media-container-row">
                      <h4 className="mbr-fonts-style mbr-text display-4 mbr-bold">
                        Kidney Function Test
                      </h4>
                      <Col md={3} className="align-left p-2">
                        <label htmlFor="albumin">Albumin</label>
                        <Field
                          type="number"
                          id="albumin"
                          name="albumin"
                          className="form-control"
                          placeholder="Enter Albumin (e.g., 10 - 150)"
                          onChange={(e) => {
                            setFieldValue("albumin", e.target.value);
                            setAlbuminData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="albumin"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col md={3} className="align-left p-2">
                        <label htmlFor="creatinine">Creatinine(mg/dl)</label>
                        <Field
                          type="number"
                          id="creatinine"
                          name="creatinine"
                          className="form-control"
                          placeholder="Enter Creatinine (e.g., 0.1 - 2.0)"
                          onChange={(e) => {
                            setFieldValue("creatinine", e.target.value);
                            setCreatinineData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="creatinine"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col md={3} className="align-left p-2">
                        <label htmlFor="sodium">Sodium</label>
                        <Field
                          type="number"
                          id="sodium"
                          name="sodium"
                          className="form-control"
                          placeholder="Enter Sodium (e.g., 110 - 170)"
                          onChange={(e) => {
                            setFieldValue("sodium", e.target.value);
                            setSodiumData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="sodium"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col md={3} className="align-left p-2">
                        <label htmlFor="potassium">Potassium</label>
                        <Field
                          type="number"
                          id="potassium"
                          name="potassium"
                          className="form-control"
                          placeholder="Enter Potassium (e.g., 2 - 8)"
                          onChange={(e) => {
                            setFieldValue("potassium", e.target.value);
                            setPotassiumData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="potassium"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col md={4} className="align-left p-2">
                        <label htmlFor="uricAcid">Uric Acid</label>
                        <Field
                          type="number"
                          id="uricAcid"
                          name="uricAcid"
                          className="form-control"
                          placeholder="Enter Uric Acid (e.g., 2 - 10)"
                          onChange={(e) => {
                            setFieldValue("uricAcid", e.target.value);
                            setUricAcidData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="uricAcid"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col md={4} className="align-left p-2">
                        <label htmlFor="kidneyInterpretation">
                          Kidney Interpretation
                        </label>
                        <Field
                          as="select"
                          id="kidneyInterpretation"
                          name="kidneyInterpretation"
                          className="form-control"
                          onChange={(e) => {
                            setFieldValue(
                              "kidneyInterpretation",
                              e.target.value
                            );
                            setKidneyInterpretationData(e.target.value);
                          }}
                        >
                          <option
                            value=""
                            style={{
                              display: "none",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            Kidney Interpretation ▼
                          </option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                        </Field>
                        <ErrorMessage
                          name="kidneyInterpretation"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col md={4} className="align-left p-2">
                        <label htmlFor="acrResult">ACR Result</label>
                        <Field
                          type="string"
                          id="acrResult"
                          name="acrResult"
                          className="form-control"
                          placeholder="ACR Result"
                          onChange={(e) => {
                            setFieldValue("acrResult", e.target.value);
                            setAcrResultData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="acrResult"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Row>
                    <Row className="media-container-row">
                      <h4 className="mbr-fonts-style mbr-text display-4 mbr-bold">
                        TSH
                      </h4>
                      <Col md={6} className="align-left p-2">
                        <label htmlFor="tshLevel">TSH-Level</label>
                        <Field
                          type="number"
                          id="tshLevel"
                          name="tshLevel"
                          className="form-control"
                          placeholder="Enter Tsh Level (e.g., 0 - 8)"
                          onChange={(e) => {
                            setFieldValue("tshLevel", e.target.value);
                            setTshLevelData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="tshLevel"
                          component="div"
                          className="text-danger"
                        />
                      </Col>

                      <Col md={6} className="align-left p-2">
                        <label htmlFor="tshInterpretation">
                          TSH Interpretation
                        </label>
                        <Field
                          as="select"
                          id="tshInterpretation"
                          name="tshInterpretation"
                          className="form-control"
                          onChange={(e) => {
                            setFieldValue("tshInterpretation", e.target.value);
                            setTshInterpretationData(e.target.value);
                          }}
                        >
                          <option
                            value=""
                            style={{
                              display: "none",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            TSH Interpretation ▼
                          </option>
                          <option value="High">High</option>
                          <option value="Normal">Normal</option>
                          <option value="Low">Low</option>
                        </Field>
                        <ErrorMessage
                          name="tshInterpretation"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Row>
                    <Row className="media-container-row">
                      <h4 className="mbr-fonts-style mbr-text display-4 mbr-bold">
                        Renal Artery Doppler
                      </h4>
                      <Col md={4} className="align-left p-2">
                        <Field
                          type="string"
                          id="renalArteryDoppler"
                          name="renalArteryDoppler"
                          className="form-control"
                          placeholder="RenalArteryDoppler"
                          onChange={(e) => {
                            setFieldValue("renalArteryDoppler", e.target.value);
                            setRenalArteryDopplerData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="renalArteryDoppler"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Row>
                    <Row className="media-container-row">
                      <h4 className="mbr-fonts-style mbr-text display-4 mbr-bold">
                        2D Echocardiography
                      </h4>
                      <Col md={3} className="align-left p-2">
                        <label htmlFor="coronaryArteryDisease">
                          Coronary Artery Disease
                        </label>
                        <Field
                          as="select"
                          id="coronaryArteryDisease"
                          name="coronaryArteryDisease"
                          className="form-control"
                          placeholder="CoronaryArteryDisease"
                          onChange={(e) => {
                            setFieldValue(
                              "coronaryArteryDisease",
                              e.target.value
                            );
                            setCoronaryArteryDiseaseData(e.target.value);
                          }}
                        >
                          <option
                            value=""
                            style={{
                              display: "none",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            Coronary Artery Disease ▼
                          </option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </Field>
                        <ErrorMessage
                          name="coronaryArteryDisease"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col md={3} className="align-left p-2">
                        <label htmlFor="ejectionFraction">
                          Ejection Fraction
                        </label>
                        <Field
                          type="number"
                          id="ejectionFraction"
                          name="ejectionFraction"
                          className="form-control"
                          placeholder="EjectionFraction"
                          onChange={(e) => {
                            setFieldValue("ejectionFraction", e.target.value);

                            setEjectionFractionData(e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="ejectionFraction"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Row>
                    <div className="me-3">
                      <button
                        type="button"
                        className="text-start btn btn-primary display-4"
                        onClick={() => preview("symptoms")}
                      >
                        Back
                      </button>
                      <label className="mx-">
                        If No Any bloodTest Click On Submit Button
                      </label>
                      <button
                        type="submit"
                        className="float-end btn btn-primary display-4"
                        onClick={() => submit("stratification")}
                      >
                        {editing ? "Edit" : "Create"}
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Row>
    </>
  );
};

export default BloodTest;
