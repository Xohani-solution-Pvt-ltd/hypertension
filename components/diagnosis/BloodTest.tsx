import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AccusureImg from "../../assets/images/accusure.jpeg";
import Link from 'next/link';
import { Container, Row, Col, Button, Nav, Tab, Card } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitDiagnosisAPI, getDiagnosisDetailsAPI, getBloodTestAPI, submitBloodTestAPI } from '../../services/call';
import { getCookie } from 'cookies-next';
import notify from "../../helpers/notify";
import { BloodTestInterface ,intialBloodTestValue } from '../../interfaces/bloodtest';


const validationSchema = Yup.object({
  hbA1cLevel: Yup.number()
    .required("HbA1c Level is required")
    .min(36, "HbA1c Level should be at least 36")
    .max(60, "HbA1c Level should not exceed 60"),
  hBA1CInterpretation: Yup.string()
    .required("Interpretation is required"),
  totalCholesterol: Yup.number()
    .required("Total Cholesterol is required")
    .min(180, "Total Cholesterol must be at least 180")
    .max(240, "Total Cholesterol must not exceed 240"),
  lipidInterpretation :Yup.string()
    .required("lipidInterpretation is required"),
  hdlCholesterol: Yup.number()
    .required("HDL Cholesterol is required")
    .min(60, "HDL Cholesterol must be at least 60")
    .max(80, "HDL Cholesterol must not exceed 80"),
  hdlInterpretation :Yup.string()
  .required("hdlInterpretation is required"),
  ldlCholesterol: Yup.number()
    .required("LDL Cholesterol is required")
    .min(80, "LDL Cholesterol must be at least 80")
    .max(100, "LDL Cholesterol must not exceed 100"),
  ldlInterpretation: Yup.string()
    .required("ldlInterpretation is required"),
  triglycerides: Yup.number()
    .required("Triglycerides is required")
    .min(150, "Triglycerides must be at least 150")
    .max(499, "Triglycerides must not exceed 499"),
  triglyceridesInterpretation :Yup.string()
    .required("triglyceridesInterpretation is required"),
  albumin: Yup.number()
    .required("Albumin is required")
    .min(10, "Albumin must be at least 10")
    .max(150, "Albumin must not exceed 150"),
  creatinine: Yup.number()
    .required("Creatinine is required")
    .min(10, "Creatinine must be at least 10")
    .max(300, "Creatinine must not exceed 300"),
  acrResult: Yup.boolean()
    .required("ACR Result is required"),
  eGFRResult: Yup.boolean()
    .required("eGFR Result is required"),
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
  kidneyInterpretation: Yup.string()
    .required("kidneyInterpretation is required"),
    // .min(20, "Interpretation must be at least 20")
    // .max(200, "Interpretation must not exceed 200"),
  tshLevel: Yup.number()
    .required("TSH Level is required")
    .min(0, "TSH Level must be at least 0")
    .max(8, "TSH Level must not exceed 8"),
  tshInterpretation: Yup.string()
    .required("tshInterpretation is required"),
    // .min(0, "tshInterpretation must be at least 0")
    // .max(8, "tshInterpretation must not exceed 8"),
  renalArteryDoppler : Yup.string()
    .required("renalArteryDoppler is required"),
  ejectionFraction: Yup.number()
    .required("ejection is required")
    .min(20, "Ejection must be at least 20")
    .max(80, "Ejection must not exceed 80"),
  coronaryArteryDisease : Yup.string()
    .required("coronaryArteryDisease is required"),
  hfrEF: Yup.number()
    .required("hfrEF is required"),
  hfpeEF: Yup.number()
    .required("hfpeEF is required"),
});


const BloodTest = ({submit}) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [bloodTestId, setBloodTestId] = useState(undefined);
  const [atLeastOneCheckboxChecked, setAtLeastOneCheckboxChecked] = useState(false);

  const handleSubmit = async (values: BloodTestInterface) => {
    if (
      !values.hbA1cLevel && !values.hBA1CInterpretation
      &&!values.totalCholesterol&& !values.lipidInterpretation && !values.hdlCholesterol && !values.hdlInterpretation &&!values.ldlCholesterol &&!values.ldlInterpretation &&  !values.triglycerides && !values.triglyceridesInterpretation &&  !values.albumin &&!values.creatinine  && !values.sodium && !values.acrResult && !values.eGFRResult &&  !values.potassium &&!values.uricAcid &&  !values.kidneyInterpretation && !values.tshLevel &&  !values.tshInterpretation &&!values.renalArteryDoppler &&  !values.coronaryArteryDisease && !values.ejectionFraction && !values.hfrEF &&  !values.hfpeEF 
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
    const id = getCookie('bloodTestId')
    setBloodTestId(id)
  }, [1]);

  return (
    <>
      <Row className="media-container-row m-4">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">Blood Test</h4>
        <Formik initialValues={intialBloodTestValue}  validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ setFieldValue }) => {
            useEffect(() => {
              const fetchBloodDetailData = async () => {
                const [data, err] = await getBloodTestAPI(bloodTestId);
                if (data) {
                  const { hbA1cLevel,hBA1CInterpretation,totalCholesterol,lipidInterpretation,hdlCholesterol,hdlInterpretation,ldlCholesterol,ldlInterpretation,triglycerides,triglyceridesInterpretation,albumin,creatinine,acrResult,eGFRResult,sodium,
                  potassium,uricAcid,kidneyInterpretation,tshLevel,tshInterpretation,renalArteryDoppler,coronaryArteryDisease,ejectionFraction,hfrEF,hfpeEF }=data
                  
                  setFieldValue('hbA1cLevel', hbA1cLevel);
                  setFieldValue('hBA1CInterpretation', hBA1CInterpretation);
                  setFieldValue('totalCholesterol', totalCholesterol);
                  setFieldValue('lipidInterpretation', lipidInterpretation);
                  setFieldValue('hdlCholesterol', hdlCholesterol);
                  setFieldValue('hdlInterpretation', hdlInterpretation);
                  setFieldValue('ldlCholesterol', ldlCholesterol);
                  setFieldValue('ldlInterpretation', ldlInterpretation);
                  setFieldValue('triglycerides', triglycerides);
                  setFieldValue('triglyceridesInterpretation', triglyceridesInterpretation);
                  setFieldValue('albumin', albumin);
                  setFieldValue('creatinine', creatinine);
                  setFieldValue('acrResult', acrResult);
                  setFieldValue('eGFRResult', eGFRResult);
                  setFieldValue('sodium', sodium);
                  setFieldValue('potassium', potassium);
                  setFieldValue('uricAcid', uricAcid);
                  setFieldValue('kidneyInterpretation', kidneyInterpretation);
                  setFieldValue('tshLevel', tshLevel);
                  setFieldValue('tshInterpretation', tshInterpretation);
                  setFieldValue('renalArteryDoppler', renalArteryDoppler);
                  setFieldValue('coronaryArteryDisease', coronaryArteryDisease);
                  setFieldValue('ejectionFraction', ejectionFraction);
                  setFieldValue('hfrEF', hfrEF);
                  setFieldValue('hfpeEF', hfpeEF);  
                }
                if (err) {
                  setTimeout(() => {
                    setProcessing(false);
                    notify.error(err?.message);
                  }, 1000);
                }
              }
              if (bloodTestId) {
                fetchBloodDetailData();
              }
            }, [bloodTestId]);

            return (
              <Form>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">HBA1C</h4>
                  <Col md={6} className="align-left p-2">
                      <Field type="number" id="hbA1cLevel" name="hbA1cLevel" className="form-control" placeholder="HbA1c Level" onChange={(e) => { setFieldValue('hbA1cLevel', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="hbA1cLevel" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="string" id="hBA1CInterpretation" name="hBA1CInterpretation" className="form-control" placeholder="Interpretation" onChange={(e) => { setFieldValue('hBA1CInterpretation', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="hBA1CInterpretation" component="div" className="text-danger" />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">Lipid</h4>
                  <Col md={6} className="align-left p-2">
                      <Field type="number" id="totalCholesterol" name="totalCholesterol" className="form-control" placeholder="Total Cholesterol" onChange={(e) => { setFieldValue('totalCholesterol', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="totalCholesterol" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="string" id="lipidInterpretation" name="lipidInterpretation" className="form-control" placeholder="Lipid Interpretation" onChange={(e) => { setFieldValue('lipidInterpretation', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="lipidInterpretation" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="number" id="hdlCholesterol" name="hdlCholesterol" className="form-control" placeholder="HDL Cholesterol" onChange={(e) => { setFieldValue('hdlCholesterol', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="hdlCholesterol" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="string" id="hdlInterpretation" name="hdlInterpretation" className="form-control" placeholder="HDL Interpretation" onChange={(e) => { setFieldValue('hdlInterpretation', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="hdlInterpretation" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="number" id="ldlCholesterol" name="ldlCholesterol" className="form-control" placeholder="LDL Cholesterol" onChange={(e) => { setFieldValue('ldlCholesterol', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="ldlCholesterol" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="string" id="ldlInterpretation" name="ldlInterpretation" className="form-control" placeholder="LDL Interpretation" onChange={(e) => { setFieldValue('ldlInterpretation', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="ldlInterpretation" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="number" id="triglycerides" name="triglycerides" className="form-control" placeholder="Triglycerides" onChange={(e) => { setFieldValue('triglycerides', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="triglycerides" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="string" id="triglyceridesInterpretation" name="triglyceridesInterpretation" className="form-control" placeholder="Triglycerides Interpretation" onChange={(e) => { setFieldValue('triglyceridesInterpretation', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="triglyceridesInterpretation" component="div" className="text-danger" />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">Kidney function test</h4>
                  <Col md={3} className="align-left p-2">
                      <Field type="number" id="albumin" name="albumin" className="form-control" placeholder="Albumin" onChange={(e) => { setFieldValue('albumin', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="albumin" component="div" className="text-danger" />
                  </Col>
                  <Col md={3} className="align-left p-2">
                      <Field type="number" id="creatinine" name="creatinine" className="form-control" placeholder="Creatinine" onChange={(e) => { setFieldValue('creatinine', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="creatinine" component="div" className="text-danger" />
                  </Col>
                  <Col md={3} className="align-left p-2">
                      <Field type="number" id="sodium" name="sodium" className="form-control" placeholder="Sodium" onChange={(e) => { setFieldValue('sodium', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="sodium" component="div" className="text-danger" />
                  </Col>
                  <Col md={3} className="align-left p-2">
                      <Field type="number" id="potassium" name="potassium" className="form-control" placeholder="Potassium" onChange={(e) => { setFieldValue('potassium', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="potassium" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="number" id="uricAcid" name="uricAcid" className="form-control" placeholder="Uric Acid" onChange={(e) => { setFieldValue('uricAcid', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="uricAcid" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="string" id="kidneyInterpretation" name="kidneyInterpretation" className="form-control" placeholder="kidney Interpretation" onChange={(e) => { setFieldValue('kidneyInterpretation', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="kidneyInterpretation" component="div" className="text-danger" />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <label>
                      <Field type="checkbox" id="acrResult" name="acrResult" onChange={(e) => { setFieldValue('acrResult', e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                        }}/>
                      ACR-Result
                      </label>
                      <ErrorMessage name="acrResult" component="div" className="text-danger" />
                  </Col>
                  <Col md={3} className="align-left p-2">
                    <label>
                      <Field type="checkbox" id="eGFRResult" name="eGFRResult" onChange={(e) => { setFieldValue('eGFRResult', e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                        }}/>
                      EGFR-Result
                      </label>
                      <ErrorMessage name="eGFRResult" component="div" className="text-danger" />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">TSH</h4>
                  <Col md={6} className="align-left p-2">
                      <Field type="number" id="tshLevel" name="tshLevel" className="form-control" placeholder="Tsh Level" onChange={(e) => { setFieldValue('tshLevel', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="tshLevel" component="div" className="text-danger" />
                  </Col>
                  <Col md={6} className="align-left p-2">
                      <Field type="string" id="tshInterpretation" name="tshInterpretation" className="form-control" placeholder="TSH Interpretation" onChange={(e) => { setFieldValue('tshInterpretation', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="tshInterpretation" component="div" className="text-danger" />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">Renal artery doppler</h4>
                  <Col md={12} className="align-left p-2">
                      <Field type="string" id="renalArteryDoppler" name="renalArteryDoppler" className="form-control" placeholder="RenalArteryDoppler" onChange={(e) => { setFieldValue('renalArteryDoppler', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="renalArteryDoppler" component="div" className="text-danger" />
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <h4 className="mbr-fonts-style mbr-text display-4">2D echocardiography</h4>
                  <Col md={3} className="align-left p-2">
                      <Field type="string" id="coronaryArteryDisease" name="coronaryArteryDisease" className="form-control" placeholder="CoronaryArteryDisease" onChange={(e) => { setFieldValue('coronaryArteryDisease', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="coronaryArteryDisease" component="div" className="text-danger" />
                  </Col>
                  <Col md={3} className="align-left p-2">
                      <Field type="number" id="ejectionFraction" name="ejectionFraction" className="form-control" placeholder="EjectionFraction" onChange={(e) => { setFieldValue('ejectionFraction', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="ejectionFraction" component="div" className="text-danger" />
                  </Col>
                  <Col md={3} className="align-left p-2">
                      <Field type="number" id="hfrEF" name="hfrEF" className="form-control" placeholder="HFREF" onChange={(e) => { setFieldValue('hfrEF', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="hfrEF" component="div" className="text-danger" />
                  </Col>
                  <Col md={3} className="align-left p-2">
                      <Field type="number" id="hfpeEF" name="hfpeEF" className="form-control" placeholder="HFPEEF" onChange={(e) => { setFieldValue('hfpeEF', e.target.value);
                          setAtLeastOneCheckboxChecked(e.target.value);
                        }}/>
                      <ErrorMessage name="hfpeEF" component="div" className="text-danger" />
                  </Col>
                </Row>
                <div className="text-end mt-4">
                      <button type="submit" className="btn btn-primary display-4" onClick={() => submit("stratification")} disabled={!atLeastOneCheckboxChecked}>Submit</button>
                    </div>
              </Form>
            )
          }}
        </Formik>
      </Row>
    </>
  );
};
export default BloodTest;
