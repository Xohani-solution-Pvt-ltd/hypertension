import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AccusureImg from "../../assets/images/accusure.jpeg";
import Link from "next/link";
import { Container, Row, Col, Button, Nav, Tab, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DiagnosisInterface, initialDiagnosisValues, } from "../../interfaces/diagnosis";
import { submitDiagnosisAPI, getDiagnosisDetailsAPI, } from "../../services/call";
import { getCookie } from "cookies-next";
import notify from "../../helpers/notify";

const validationSchema = Yup.object({
  systolic: Yup.number()
    .required("Systolic blood pressure is required")
    .min(90, "Systolic blood pressure must be at least 90")
    .max(200, "Systolic blood pressure must not exceed 200"),
  diastolic: Yup.number()
    .required("Diastolic pressure is required")
    .min(50, "Diastolic pressure should be at least 50")
    .max(130, "Diastolic pressure should not exceed 130"),
  pulseRate: Yup.number()
    .required("Pulse rate is required")
    .min(40, "Pulse rate should be at least 40")
    .max(120, "Pulse rate should not exceed 120"),
});

const Diagnosis = ({ submit, previous }) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState(undefined);
  const [atLeastOneCheckboxChecked, setAtLeastOneCheckboxChecked] = useState(false);

  const handleInputChange = (e) => {
    const systolic = e.target.form.systolic.value;
    const diastolic = e.target.form.diastolic.value;
    const pulseRate = e.target.form.pulseRate.value;
    setAtLeastOneCheckboxChecked(!!systolic && !!diastolic && !!pulseRate);
  };

  const handleSubmit = async (values: DiagnosisInterface) => {
    if (
      values.diastolic &&
      values.pulseRate &&
      values.systolic
    ) {
      const [data, err] = await submitDiagnosisAPI(values);
      if (data) {
        notify.success("Succesfully Diagnosis");
      }
      if (err) {
        setTimeout(() => {
          setProcessing(false);
          notify.error(err?.message);
        }, 1000);
      }
      useEffect(() => {
        const id = getCookie('diagnosisId')
        setDiagnosisId(id)
      }, []);
    } else {
      notify.error("Please fill in all the required fields.");
    }
  }

  
  return (
    <>
      <Row className="media-container-row">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">
          Diagnosis
        </h4>
        <Col md={12} className="p-3 align-left">
          <Row className="media-container-row">
            <Col md={6} className="align-left">
              <Formik
                initialValues={initialDiagnosisValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ setFieldValue }) => {
                  useEffect(() => {
                    const fetchDiagnosisDetailData = async () => {
                      const [data, err] = await getDiagnosisDetailsAPI(
                        diagnosisId
                      );
                      if (data) {
                        const { diastolic, pulseRate, systolic } = data;
                        setFieldValue("diastolic", diastolic);
                        setFieldValue("pulseRate", pulseRate);
                        setFieldValue("systolic", systolic);
                      }
                      if (err) {
                        setTimeout(() => {
                          setProcessing(false);
                          notify.error(err?.message);
                        }, 1000);
                      }
                    };
                    if (diagnosisId) {
                      fetchDiagnosisDetailData();
                    }
                  }, [diagnosisId]);
                  return (
                    <Form>
                      <div className="p-1">
                        <Field type="number" id="systolic" name="systolic" className="form-control" placeholder="SYS" onChange={(e) => {
                          setFieldValue('systolic', e.target.value);
                          handleInputChange(e);
                        }} />
                        <ErrorMessage name="systolic" component="div" className="text-danger" />
                      </div>
                      <div className="p-1">
                        <Field type="number" id="diastolic" name="diastolic" className="form-control" placeholder="DIA" onChange={(e) => {
                          setFieldValue('diastolic', e.target.value);
                          handleInputChange(e);
                        }} />
                        <ErrorMessage name="diastolic" component="div" className="text-danger" />
                      </div>
                      <div className="p-1">
                        <Field type="number" id="pulseRate" name="pulseRate" className="form-control" placeholder="PUL" onChange={(e) => {
                          setFieldValue('pulseRate', e.target.value);
                          handleInputChange(e);
                        }} />
                        <ErrorMessage name="pulseRate" component="div" className="text-danger" />
                      </div>
                      <div className="text-end mt-4">
                        <label>If No Any Diagnosis Click On Submit Button</label>
                        <button type="submit" className="btn btn-primary display-4" onClick={() => submit("comorbidities")}
                          disabled={!atLeastOneCheckboxChecked} >Submit</button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
            <Col md={3} className="align-left">
              <Image src={AccusureImg} alt="My Image" width={200} height={150} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Diagnosis;
