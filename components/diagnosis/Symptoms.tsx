import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AccusureImg from "../../assets/images/accusure.jpeg";
import Link from 'next/link';
import { Container, Row, Col, Button, Nav, Tab, Card } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DiagnosisInterface, initialDiagnosisValues } from '../../interfaces/diagnosis';
import { submitSymptomsMonitoringAPI, getSymptomsMonitoringAPI } from '../../services/call';
import { getCookie } from 'cookies-next';
import notify from "../../helpers/notify";
import { SymptomsInterface, initialSymptomsValue } from '../../interfaces/symptoms';

const validationSchema = Yup.object({
  userid : Yup.string(),
  previousHeartAttacks: Yup.boolean(),
  breathlessness: Yup.boolean(),
  minorNYHA: Yup.boolean(),
  majorNYHA: Yup.boolean(),
  legSwelling: Yup.boolean(),
});

const Symptoms = ({submit}) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState(undefined);
  const [atLeastOneCheckboxChecked, setAtLeastOneCheckboxChecked] = useState(false);

  const handleSubmit = async (values: SymptomsInterface) => {
    if (
      !values.previousHeartAttacks &&
      !values.breathlessness &&
      !values.minorNYHA &&
      !values.majorNYHA &&
      !values.legSwelling
    ) {
      notify.error("Please select at least one checkbox.");
      return; // Do not submit the form
    }
  
    const [data, err] = await submitSymptomsMonitoringAPI(values);
    if (data) {
      notify.success("Succesfully Symptoms");
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
    const id = getCookie('diagnosisId')
    setDiagnosisId(id)
  }, [1]);

  return (
    <>
      <Row className="media-container-row">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">Symptoms Monitoring</h4>
        <Col md={12} className="p-3 align-left">
          <Row className="media-container-row">
            <Col md={1} className="align-left"></Col>
            <Col md={6} className="align-left">
              <Formik initialValues={initialSymptomsValue} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
                {({ setFieldValue }) => {
                  useEffect(() => {
                    const fetchDiagnosisDetailData = async () => {
                      const [data, err] = await getSymptomsMonitoringAPI(diagnosisId);
                      if (data) {
                        const { previousHeartAttacks, breathlessness, minorNYHA ,majorNYHA, legSwelling} = data.data
                        setFieldValue('previousHeartAttacks', previousHeartAttacks);
                        setFieldValue('breathlessness', breathlessness);
                        setFieldValue('minorNYHA', minorNYHA);
                        setFieldValue('majorNYHA', majorNYHA);
                        setFieldValue('legSwelling', legSwelling);
                      }
                      if (err) {
                        setTimeout(() => {
                          setProcessing(false);
                          notify.error(err?.message);
                        }, 1000);
                      }
                    }
                    if (diagnosisId) {
                      setFieldValue('diagnosisid', diagnosisId);
                      fetchDiagnosisDetailData();
                    }
                  }, [diagnosisId]);

                  return (
                    <Form>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="previousHeartAttacks" name="previousHeartAttacks" className="me-4" onChange={(e) => { setFieldValue('previousHeartAttacks', e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                           }}/>
                          History of chest pain on walking / exertion ?
                        </label>
                        <ErrorMessage name="previousHeartAttacks" component="div" className="text-danger" />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="breathlessness" name="breathlessness" className="me-4" onChange={(e) => { setFieldValue('breathlessness', e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                          }}/>
                          Breathlessness
                        </label>
                        <ErrorMessage name="breathlessness" component="div" className="text-danger" />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="minorNYHA" name="minorNYHA" className="me-4" onChange={(e) => { setFieldValue('minorNYHA', e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                           }}/>
                          Minor NYHA
                        </label>
                        <ErrorMessage name="minorNYHA" component="div" className="text-danger" />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="majorNYHA" name="majorNYHA" className="me-4" onChange={(e) => { setFieldValue('majorNYHA', e.target.checked);
                           setAtLeastOneCheckboxChecked(e.target.checked);
                           }}/>
                          Major NYHA
                        </label>
                        <ErrorMessage name="majorNYHA" component="div" className="text-danger" />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="legSwelling" name="legSwelling" className="me-4" onChange={(e) => { setFieldValue('legSwelling', e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                          }}/>
                          Leg swelling
                        </label>
                        <ErrorMessage name="legSwelling" component="div" className="text-danger" />
                      </div>

                      {/* <div className="p-2">
                        <label>
                          <Field type="checkbox" id="lungDisease" name="lungDisease" className="me-4" onChange={(e) => { setFieldValue('lungDisease', e.target.checked);
                          setAtLeastOneCheckboxChecked(e.target.checked);
                          }}/>
                          Prior history Asthma, COPD, Taking inhalers?
                        </label>
                        <ErrorMessage name="pregnancy" component="div" className="text-danger" />
                      </div> */}
                      <div className="text-end mt-4">
                        <button type="submit" className="btn btn-primary display-4" onClick={() => submit("bloodTest")} disabled={!atLeastOneCheckboxChecked}>Submit</button>
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            </Col>
            <Col md={3} className="align-left">

            </Col>
          </Row>
        </Col>
        <Col md={2} className="p-3 align-left"></Col>
      </Row>
    </>
  );
};
export default Symptoms;
