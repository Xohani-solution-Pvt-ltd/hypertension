import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AccusureImg from "../../assets/images/accusure.jpeg";
import Link from "next/link";
import { Container, Row, Col, Button, Nav, Tab, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  submitDiagnosisAPI,
  getDiagnosisDetailsAPI,
  getBloodTestAPI,
  submitBloodTestAPI,
} from "../../services/call";
import { getCookie } from "cookies-next";
import notify from "../../helpers/notify";
import {
  BloodTestInterface,
  intialBloodTestValue,
} from "../../interfaces/bloodtest";

const BloodTest = ({ submit }) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState(undefined);
  const [atLeastOneCheckboxChecked, setAtLeastOneCheckboxChecked] =
    useState(false);

  const handleSubmit = async (values: BloodTestInterface) => {
    if (
      !values.hbA1cLevel &&
      !values.normalHbA1c &&
      !values.hBA1CInterpretation &&
      !values.totalCholesterol &&
      !values.lipidNormal &&
      !values.lipidInterpretation &&
      !values.hdlCholesterol &&
      !values.lcdNormal &&
      !values.lcdInterpretation &&
      !values.triglycerides &&
      !values.triglyceridesNormal &&
      !values.triglyceridesInterpretation &&
      !values.albumin &&
      !values.creatinine &&
      !values.acrResult &&
      !values.eGFRResult &&
      !values.sodium &&
      !values.potassium &&
      !values.uricAcid &&
      !values.kidneyInterpretation &&
      !values.tshLevel &&
      !values.tshRange &&
      !values.tshInterpretation &&
      !values.renalArteryDoppler &&
      !values.coronaryArteryDisease &&
      !values.ejectionFraction &&
      !values.hfrEF &&
      !values.hfpeEF
    ) {
      notify.error("Please select at least one .");
      return; // Do not submit the form
    }

    const [data, err] = await submitBloodTestAPI(values);
    if (data) {
      notify.success("Succesfully BloodTest");
      // router.push('/dashboard')
    }
    if (err) {
      setTimeout(() => {
        setProcessing(false);
        notify.error(err?.message);
      }, 1000);
    }
  };
  useEffect(() => {
    const id = getCookie("diagnosisId");
    setDiagnosisId(id);
  }, [1]);

  return (
    <>
      <Row className="media-container-row m-4">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">
          Blood Test
        </h4>
        <Formik
          initialValues={intialBloodTestValue}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ setFieldValue }) => {
            useEffect(() => {
              const fetchBloodDetailData = async () => {
                const [data, err] = await getBloodTestAPI(diagnosisId);
                if (data) {
                  const {
                    hbA1cLevel,
                    normalHbA1c,
                    hBA1CInterpretation,
                    totalCholesterol,
                    lipidNormal,
                    lipidInterpretation,
                    hdlCholesterol,
                    hdlNormal,
                    hdlInterpretation,
                    lcdCholesterol,
                    lcdNormal,
                    lcdInterpretation,
                    triglycerides,
                    triglyceridesNormal,
                    triglyceridesInterpretation,
                    albumin,
                    creatinine,
                    acrResult,
                    eGFRResult,
                    sodium,
                    potassium,
                    uricAcid,
                    kidneyInterpretation,
                    tshLevel,
                    tshRange,
                    tshInterpretation,
                    renalArteryDoppler,
                    coronaryArteryDisease,
                    ejectionFraction,
                    hfrEF,
                    hfpeEF,
                  } = data;

                  setFieldValue("hbA1cLevel", hbA1cLevel);
                  setFieldValue("normalHbA1c", normalHbA1c);
                  setFieldValue("hBA1CInterpretation", hBA1CInterpretation);
                  setFieldValue("totalCholesterol", totalCholesterol);
                  setFieldValue("lipidNormal", lipidNormal);
                  setFieldValue("lipidInterpretation", lipidInterpretation);
                  setFieldValue("hdlCholesterol", hdlCholesterol);
                  setFieldValue("hdlNormal", hdlNormal);
                  setFieldValue("hdlInterpretation", hdlInterpretation);
                  setFieldValue("lcdCholesterol", lcdCholesterol);
                  setFieldValue("lcdNormal", lcdNormal);
                  setFieldValue("lcdInterpretation", lcdInterpretation);
                  setFieldValue("triglycerides", triglycerides);
                  setFieldValue("triglyceridesNormal", triglyceridesNormal);
                  setFieldValue(
                    "triglyceridesInterpretation",
                    triglyceridesInterpretation
                  );
                  setFieldValue("albumin", albumin);
                  setFieldValue("creatinine", creatinine);
                  setFieldValue("acrResult", acrResult);
                  setFieldValue("eGFRResult", eGFRResult);
                  setFieldValue("sodium", sodium);
                  setFieldValue("potassium", potassium);
                  setFieldValue("uricAcid", uricAcid);
                  setFieldValue("kidneyInterpretation", kidneyInterpretation);
                  setFieldValue("tshLevel", tshLevel);
                  setFieldValue("tshRange", tshRange);
                  setFieldValue("tshInterpretation", tshInterpretation);
                  setFieldValue("renalArteryDoppler", renalArteryDoppler);
                  setFieldValue("coronaryArteryDisease", coronaryArteryDisease);
                  setFieldValue("ejectionFraction", ejectionFraction);
                  setFieldValue("hfrEF", hfrEF);
                  setFieldValue("hfpeEF", hfpeEF);
                }
                if (err) {
                  setTimeout(() => {
                    setProcessing(false);
                    notify.error(err?.message);
                  }, 1000);
                }
              };
              if (diagnosisId) {
                fetchBloodDetailData();
              }
            }, [diagnosisId]);

            return (
              <Form>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">HBA1C</h4>
                  <Col md={4} className="align-left p-2">
                    {/* <Field
                      type="number"
                      id="normalHbA1c"
                      name="normalHbA1c"
                      className="form-control"
                      placeholder="Normal HbA1c Range"
                      onChange={(e) => {
                        setFieldValue("normalHbA1c", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="normalHbA1c"
                      component="div"
                      className="text-danger"
                    /> */}
                    <h6>HBA1C Normal Range - 36 to 39</h6>
                  </Col>
                  <Col md={4} className="align-left p-2">
                    <Field
                      type="number"
                      id="hbA1cLevel"
                      name="hbA1cLevel"
                      className="form-control"
                      placeholder="HbA1c Level"
                      onChange={(e) => {
                        setFieldValue("hbA1cLevel", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="hbA1cLevel"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={4} className="align-left p-2">
                    <Field
                      type="string"
                      id="hBA1CInterpretation"
                      name="hBA1CInterpretation"
                      className="form-control"
                      placeholder="Interpretation"
                      onChange={(e) => {
                        setFieldValue("hBA1CInterpretation", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="hBA1CInterpretation"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">Lipid</h4>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="totalCholesterol"
                      name="totalCholesterol"
                      className="form-control"
                      placeholder="Total Cholesterol"
                      onChange={(e) => {
                        setFieldValue("totalCholesterol", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="totalCholesterol"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="lipidNormal"
                      name="lipidNormal"
                      className="form-control"
                      placeholder=" lipidNormal"
                      onChange={(e) => {
                        setFieldValue("lipidNormal", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="lipidNormal"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="string"
                      id="lipidInterpretation"
                      name="lipidInterpretation"
                      className="form-control"
                      placeholder="lipidInterpretation"
                      onChange={(e) => {
                        setFieldValue("lipidInterpretation", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="lipidInterpretation"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="hdlCholesterol"
                      name="hdlCholesterol"
                      className="form-control"
                      placeholder="LDL Cholesterol"
                      onChange={(e) => {
                        setFieldValue("hdlCholesterol", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="hdlCholesterol"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="hdlNormal"
                      name="hdlNormal"
                      className="form-control"
                      placeholder="hdlNormal"
                      onChange={(e) => {
                        setFieldValue("hdlNormal", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="hdlNormal"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="string"
                      id="hdlInterpretation"
                      name="hdlInterpretation"
                      className="form-control"
                      placeholder="hdlInterpretation"
                      onChange={(e) => {
                        setFieldValue("hdlInterpretation", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="hdlInterpretation"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="lcdCholesterol"
                      name="lcdCholesterol"
                      className="form-control"
                      placeholder="lcdCholesterol"
                      onChange={(e) => {
                        setFieldValue("lcdCholesterol", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="lcdCholesterol"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="lcdNormal"
                      name="lcdNormal"
                      className="form-control"
                      placeholder="lcdNormal"
                      onChange={(e) => {
                        setFieldValue("lcdNormal", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="lcdNormal"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="string"
                      id="lcdInterpretation"
                      name="lcdInterpretation"
                      className="form-control"
                      placeholder="lcdInterpretation"
                      onChange={(e) => {
                        setFieldValue("lcdInterpretation", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="lcdInterpretation"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="triglycerides"
                      name="triglycerides"
                      className="form-control"
                      placeholder="Triglycerides"
                      onChange={(e) => {
                        setFieldValue("triglycerides", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="triglycerides"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="triglyceridesNormal"
                      name="triglyceridesNormal"
                      className="form-control"
                      placeholder="triglyceridesNormal"
                      onChange={(e) => {
                        setFieldValue("triglyceridesNormal", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="triglyceridesNormal"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="string"
                      id="triglyceridesInterpretation"
                      name="triglyceridesInterpretation"
                      className="form-control"
                      placeholder="triglyceridesInterpretation"
                      onChange={(e) => {
                        setFieldValue(
                          "triglyceridesInterpretation",
                          e.target.value
                        );
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="triglyceridesInterpretation"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">
                    Kidney function test
                  </h4>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="albumin"
                      name="albumin"
                      className="form-control"
                      placeholder="Albumin"
                      onChange={(e) => {
                        setFieldValue("albumin", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="albumin"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="creatinine"
                      name="creatinine"
                      className="form-control"
                      placeholder="Creatinine"
                      onChange={(e) => {
                        setFieldValue("creatinine", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="creatinine"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <label>
                      <Field
                        type="checkbox"
                        id="acrResult"
                        name="acrResult"
                        onChange={(e) => {
                          setFieldValue("acrResult", e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                        }}
                      />
                      acrResult
                    </label>
                    <ErrorMessage
                      name="acrResult"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <label>
                      <Field
                        type="checkbox"
                        id="eGFRResult"
                        name="eGFRResult"
                        onChange={(e) => {
                          setFieldValue("eGFRResult", e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                        }}
                      />
                      eGFRResult
                    </label>
                    <ErrorMessage
                      name="eGFRResult"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="sodium"
                      name="sodium"
                      className="form-control"
                      placeholder="Sodium"
                      onChange={(e) => {
                        setFieldValue("sodium", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="sodium"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="potassium"
                      name="potassium"
                      className="form-control"
                      placeholder="Potassium"
                      onChange={(e) => {
                        setFieldValue("potassium", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="potassium"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="number"
                      id="uricAcid"
                      name="uricAcid"
                      className="form-control"
                      placeholder="Uric Acid"
                      onChange={(e) => {
                        setFieldValue("uricAcid", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="uricAcid"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <Field
                      type="string"
                      id="kidneyInterpretation"
                      name="kidneyInterpretation"
                      className="form-control"
                      placeholder="Interpretation"
                      onChange={(e) => {
                        setFieldValue("kidneyInterpretation", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="kidneyInterpretation"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">TSH</h4>
                  <Col md={4} className="align-left p-2">
                    <Field
                      type="number"
                      id="tshLevel"
                      name="tshLevel"
                      className="form-control"
                      placeholder="TSH Level"
                      onChange={(e) => {
                        setFieldValue("tshLevel", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="albumin"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={4} className="align-left p-2">
                    <Field
                      type="number"
                      id="tshRange"
                      name="tshRange"
                      className="form-control"
                      placeholder="TSH Range"
                      onChange={(e) => {
                        setFieldValue("tshRange", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="tshRange"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={4} className="align-left p-2">
                    <Field
                      type="string"
                      id="tshInterpretation"
                      name="tshInterpretation"
                      className="form-control"
                      placeholder="Interpretation"
                      onChange={(e) => {
                        setFieldValue("tshInterpretation", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="tshInterpretation"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">
                    Renal artery doppler
                  </h4>
                  <Col md={12} className="align-left p-2">
                    <Field
                      type="string"
                      id="renalArteryDoppler"
                      name="renalArteryDoppler"
                      className="form-control"
                      placeholder="renalArteryDoppler"
                      onChange={(e) => {
                        setFieldValue("renalArteryDoppler", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
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
                  <h4 className="mbr-fonts-style mbr-text display-4">
                    2D echocardiography
                  </h4>
                  <Col md={4} className="align-left p-2">
                    <Field
                      type="string"
                      id="coronaryArteryDisease"
                      name="coronaryArteryDisease"
                      className="form-control"
                      placeholder="coronaryArteryDisease"
                      onChange={(e) => {
                        setFieldValue("coronaryArteryDisease", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="coronaryArteryDisease"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={4} className="align-left p-2">
                    <Field
                      type="number"
                      id="ejectionFraction"
                      name="ejectionFraction"
                      className="form-control"
                      placeholder="ejectionFraction"
                      onChange={(e) => {
                        setFieldValue("ejectionFraction", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="ejectionFraction"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={4} className="align-left p-2">
                    <Field
                      type="number"
                      id="hfrEF"
                      name="hfrEF"
                      className="form-control"
                      placeholder="hfrEF"
                      onChange={(e) => {
                        setFieldValue("hfrEF", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="hfrEF"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={4} className="align-left p-2">
                    <Field
                      type="number"
                      id="hfpeEF"
                      name="hfpeEF"
                      className="form-control"
                      placeholder="hfpeEF"
                      onChange={(e) => {
                        setFieldValue("hfpeEF", e.target.value);
                        setAtLeastOneCheckboxChecked(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="hfpeEF"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <label>
                      <Field
                        type="checkbox"
                        id="legSwelling"
                        name="legSwelling"
                        className="me-4"
                        onChange={(e) => {
                          setFieldValue("legSwelling", e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}
                      />
                      Leg swelling
                    </label>
                    <ErrorMessage
                      name="legSwelling"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
                <div className="text-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary display-4"
                    onClick={() => submit("stratification")}
                    disabled={!atLeastOneCheckboxChecked}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Row>
    </>
  );
};
export default BloodTest;
