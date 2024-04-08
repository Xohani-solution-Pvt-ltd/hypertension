import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import Image from "next/image";
import { Container, Row, Col, Button, Nav, Tab, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  submitSymptomsMonitoringAPI,
  getSymptomsMonitoringAPI,
  updateSymptomsAPI,
} from "../../services/call";
import { getCookie } from "cookies-next";
import notify from "../../helpers/notify";
import {
  SymptomsInterface,
  initialSymptomsValue,
} from "../../interfaces/symptoms";
import SymptomsImg from "../../assets/images/Symptoms.png";
import { AuthContext } from "../../context/authentication";

const validationSchema = Yup.object({
  userid: Yup.string(),
  previousHeartAttacks: Yup.boolean(),
  breathlessness: Yup.boolean(),
  // minorNYHA: Yup.boolean(),
  // majorNYHA: Yup.boolean(),
  legSwelling: Yup.boolean(),
});

const initialValues = {
  previousHeartAttacks: false,
  breathlessness: false,
  legSwelling: false,
};

const Symptoms = ({ submit, preview }) => {
  const { userInfo } = useContext(AuthContext);
  const [symptomsId, setSymptomsId] = useState(undefined);
  const [symptomsData, setSymptomsData] = useState(initialSymptomsValue);
  const [previousHeartAttacksData, setPreviousHeartAttacksData] =
    useState(false);
  const [breathlessnessData, setBreathlessnessData] = useState(
    initialSymptomsValue.breathlessness
  );
  const [legSwellingData, setLegSwellingData] = useState(false);
  const [minorNYHAData, setMinorNYHA] = useState(false);
  const [majorNYHAData, setMajorNYHA] = useState(false);
  const [editing, setEditing] = useState(false);
  const [brethlessnessSubItemsVisible, setBrethlessnessSubItemsVisible] =
    useState(false);

  const handleSubmit = async () => {
    const inputData: SymptomsInterface = {
      previousHeartAttacks: previousHeartAttacksData,
      breathlessness: { minorNYHA: minorNYHAData, majorNYHA: majorNYHAData },
      legSwelling: legSwellingData,
    };
    console.log("Input Data:", inputData);

    if (previousHeartAttacksData || breathlessnessData || legSwellingData) {
      if (editing === true) {
        if (symptomsId) {
          const [data, err] = await updateSymptomsAPI(symptomsId, inputData);
          if (data) {
            notify.success("Successfully updated Symptoms");
          }
        } else {
          notify.error("Symptoms ID is missing. Cannot update.");
        }
      } else {
        const [data, err] = await submitSymptomsMonitoringAPI(inputData);
        if (data) {
          setEditing(true);
          setSymptomsId(data.id);
          notify.success("Succesfully Symptoms");
        }
        if (err) {
          notify.error(err?.message);
        }
      }
    }
  };

  const fetchSymptomsDataDetails = async (id) => {
    const [data, err] = await getSymptomsMonitoringAPI(id);
    // console.log("data=", data);

    if (data?.data != null) {
      setSymptomsData(data.data);
      setEditing(true);
      setSymptomsId(data.data._id);
    }
    if (err) {
      notify.error(err?.message);
    }
  };

  useEffect(() => {
    // const id = getCookie("symptomsId");
    // console.log("data of symptoms", id);
    // setSymptomsId(id);
    // if (id) {
    //   setEditing(true);
    //   fetchSymptomsDataDetails(id);
    if (userInfo && userInfo._id) {
      const id = userInfo._id;
      fetchSymptomsDataDetails(id);
    }
  }, []);

  useEffect(() => {
    if (symptomsData != undefined) {
      // console.log("dataof symptoms", symptomsData);
      setPreviousHeartAttacksData(symptomsData.previousHeartAttacks);
      setBreathlessnessData(symptomsData.breathlessness);
      setLegSwellingData(symptomsData.legSwelling);
      // setMajorNYHA(symptomsData.majorNYHA);
      // setMinorNYHA(symptomsData.minorNYHA);
    }
  }, [symptomsData]);

  return (
    <>
      <Row className="media-container-row">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">
          Symptoms Monitoring
        </h4>

        <Col md={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ setFieldValue }) => {
              return (
                <>
                  <Form>
                    <div className="p-2">
                      <label>
                        <Field
                          type="checkbox"
                          id="previousHeartAttacks"
                          name="previousHeartAttacks"
                          className="me-4"
                          onChange={(e) => {
                            setFieldValue(
                              "previousHeartAttacks",
                              e.target.checked
                            );
                            setPreviousHeartAttacksData(e.target.checked);
                          }}
                        />
                        History of chest pain on walking / exertion ?
                      </label>
                      <ErrorMessage
                        name="previousHeartAttacks"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="p-2">
                      <label>
                        <Field
                          type="checkbox"
                          id="breathlessness"
                          name="breathlessness"
                          className="me-4"
                          onChange={(e) => {
                            setFieldValue("breathlessness", e.target.checked);
                            setBreathlessnessData(e.target.checked);
                            setBrethlessnessSubItemsVisible(e.target.checked);
                          }}
                        />
                        Breathlessness
                      </label>
                      {brethlessnessSubItemsVisible && (
                        <div>
                          <div className="p-2">
                            <label>
                              <Field
                                type="checkbox"
                                id="minorNYHA"
                                name="minorNYHA"
                                className="me-4"
                                onChange={(e) => {
                                  setFieldValue("minorNYHA", e.target.checked);
                                  setMinorNYHA(e.target.checked);
                                }}
                              />
                              Minor NYHA
                            </label>
                          </div>
                          <div className="p-2">
                            <label>
                              <Field
                                type="checkbox"
                                id="majorNYHA"
                                name="majorNYHA"
                                className="me-4"
                                onChange={(e) => {
                                  setFieldValue("majorNYHA", e.target.checked);
                                  setMajorNYHA(e.target.checked);
                                }}
                              />
                              Major NYHA
                            </label>
                          </div>
                        </div>
                      )}
                      <ErrorMessage
                        name="breathlessness"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="p-2">
                      <label>
                        <Field
                          type="checkbox"
                          id="legSwelling"
                          name="legSwelling"
                          className="me-4"
                          onChange={(e) => {
                            setFieldValue("legSwelling", e.target.checked);
                            setLegSwellingData(e.target.checked);
                          }}
                        />
                        Leg swelling
                      </label>
                      <ErrorMessage
                        name="legSwelling"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="text-left mt-4">
                      <label>If No Any symptoms Click On Submit Button</label>
                    </div>
                    <div className="text-start">
                      <Button
                        type="button"
                        className="btn btn-primary display-4"
                        onClick={() => preview("comorbidities")}
                      >
                        Back
                      </Button>
                      <button
                        type="submit"
                        className="float-end btn btn-primary display-4"
                        onClick={() => submit("bloodTest")}
                      >
                        {editing ? "Edit" : "Next"}
                      </button>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </Col>
        <Col md={4}>
          <Image
            src={SymptomsImg}
            height={300}
            width={300}
            alt="Hypertension"
          />
        </Col>
      </Row>
    </>
  );
};

export default Symptoms;
