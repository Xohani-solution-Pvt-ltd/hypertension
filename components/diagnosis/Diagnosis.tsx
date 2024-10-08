import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import Image from "next/image";
import AccusureImg from "../../assets/images/accusure.jpeg";
import { Container, Row, Col, Button, Nav, Tab, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  DiagnosisInterface,
  initialDiagnosisValues,
} from "../../interfaces/diagnosis";
import {
  submitDiagnosisAPI,
  getDiagnosisDetailsAPI,
  updateDiagnosisAPI,
} from "../../services/call";
import { getCookie } from "cookies-next";
import notify from "../../helpers/notify";
import { verifyJWTandCheckUser } from "../../utils/userFromJWT";
import { AuthContext } from "../../context/authentication";

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

const Diagnosis = ({ submit }) => {
  const { userInfo } = useContext(AuthContext);

  const [diagnosisId, setDiagnosisId] = useState(undefined);
  const [diagnosisData, setDiagnosisData] = useState(initialDiagnosisValues);
  const [editing, setEditing] = useState(false);
  const [systolicData, setSytoliData] = useState(null);
  const [diastolicData, setDiastolicData] = useState(null);
  const [pulseRateData, setPulseRateData] = useState(null);
  const [checkedData, setCheckedData] = useState(false);

  const handleInputChange = (e) => {
    const systolic = e.target.form.systolic.value;
    const diastolic = e.target.form.diastolic.value;

    const pulseRate = e.target.form.pulseRate.value;

    setCheckedData(!!systolic && !!diastolic && !!pulseRate);
  };

  const handleSubmit = async () => {
    if (systolicData || diastolicData || pulseRateData) {
      const userData: DiagnosisInterface = {
        systolic: systolicData,
        diastolic: diastolicData,
        pulseRate: pulseRateData,
      };
      if (editing) {
        if (diagnosisId) {
          const [data, err] = await updateDiagnosisAPI(diagnosisId, userData);
          if (data) {
            notify.success("Successfully updated diagnosis");
          }
        } else {
          notify.error("Diagnosis ID is missing. Cannot update.");
        }
      } else {
        const [data, err] = await submitDiagnosisAPI(userData);
        if (data) {
          setEditing(true);
          setDiagnosisId(data.id);
          notify.success("Successfully Added diagnosis");
        }
      }
    } else {
      notify.error("Please fill in all the required fields.");
    }
  };

  const fetchDiagnosisDetailData = async (id) => {
    const [data, err] = await getDiagnosisDetailsAPI(id);
    if (data?.data != null) {
      setDiagnosisData(data.data);
      setEditing(true);
      setDiagnosisId(data.data._id);
    }
    if (err) {
      notify.error(err?.message);
    }
  };

  useEffect(() => {
    if (diagnosisData != undefined) {
      setSytoliData(diagnosisData.systolic);
      setDiastolicData(diagnosisData.diastolic);
      setPulseRateData(diagnosisData.pulseRate);
    }
  }, [diagnosisData]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      const id = userInfo._id;
      fetchDiagnosisDetailData(id);
    }
  }, [userInfo]);

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
                initialValues={diagnosisData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ setFieldValue }) => {
                  return (
                    <Form>
                      <div className="p-1">
                        <Field
                          type="number"
                          id="systolic"
                          name="systolic"
                          className="form-control"
                          placeholder="SYS"
                          onChange={(e) => {
                            setFieldValue("systolic", e.target.value);

                            setSytoliData(e.target.value);
                            handleInputChange(e);
                          }}
                        />

                        <ErrorMessage
                          name="systolic"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-1">
                        <Field
                          type="number"
                          id="diastolic"
                          name="diastolic"
                          className="form-control"
                          placeholder="DIA"
                          onChange={(e) => {
                            setFieldValue("diastolic", e.target.value);

                            setDiastolicData(e.target.value);
                            handleInputChange(e);
                          }}
                        />

                        <ErrorMessage
                          name="diastolic"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-1">
                        <Field
                          type="number"
                          id="pulseRate"
                          name="pulseRate"
                          className="form-control"
                          placeholder="PUL"
                          onChange={(e) => {
                            setFieldValue("pulseRate", e.target.value);

                            setPulseRateData(e.target.value);
                            handleInputChange(e);
                          }}
                        />

                        <ErrorMessage
                          name="pulseRate"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="text-end mt-4">
                        <label>
                          If No Any Diagnosis Click On Submit Button
                        </label>
                        <button
                          type="submit"
                          className="btn btn-primary display-4"
                          onClick={() => submit("comorbidities")}
                        >
                          {editing ? "Edit" : "Create"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
            <Col md={3} className="align-left">
              <Image
                src={AccusureImg}
                alt="My Image"
                width={200}
                height={150}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Diagnosis;
