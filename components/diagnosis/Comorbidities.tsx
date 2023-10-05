import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AccusureImg from "../../assets/images/accusure.jpeg";
import Link from 'next/link';
import { Container, Row, Col, Button, Nav, Tab, Card } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitComorbiditiesAPI, getComorbiditiesDetailsAPI } from '../../services/call';
import { getCookie } from 'cookies-next';
import notify from "../../helpers/notify";
import { ComorbiditiesInterface, initialComorbiditiesValues } from '../../interfaces/comorbidities';

const validationSchema = Yup.object({
  cva: Yup.boolean(),
  coronaryArteryDisease: Yup.boolean(),
  heartFailure: Yup.boolean(),
  diabetes: Yup.boolean(),
  pregnancy: Yup.boolean(),
  lungDisease : Yup.boolean(),
});

const Comorbidities = ({submit}) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [comorbiditiesId, setComorbiditiesId] = useState(undefined);
  const [atLeastOneCheckboxChecked, setAtLeastOneCheckboxChecked] = useState(false);

  const handleSubmit = async (values: ComorbiditiesInterface) => {
    if (
      !values.cva &&
      !values.coronaryArteryDisease &&
      !values.heartFailure &&
      !values.diabetes &&
      !values.pregnancy &&
      !values.lungDisease
    ) {
      notify.error("Please select at least one checkbox.");
      return; // Do not submit the form
    }
  
    const [data, err] = await submitComorbiditiesAPI(values);
    if (data) {
      notify.success("Succesfully Comorbidities");
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
    setComorbiditiesId(id)
  }, [1]);

  return (
    <>
      <Row className="media-container-row">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">Comorbidities</h4>
        <Col md={12} className="p-3 align-left">
          <Row className="media-container-row">
            <Col md={6} className="align-left">
              <Formik initialValues={initialComorbiditiesValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
                {({ setFieldValue }) => {
                  useEffect(() => {
                    const fetchDiagnosisDetailData = async () => {
                      const [data, err] = await getComorbiditiesDetailsAPI(comorbiditiesId);
                      console.log('data',data);
                      
                        if(data){
                        const { cva, coronaryArteryDisease, heartFailure, diabetes, pregnancy, lungDisease } = data
                        setFieldValue('cva', cva);
                        setFieldValue('coronaryArteryDisease', coronaryArteryDisease);
                        setFieldValue('heartFailure', heartFailure);
                        setFieldValue('diabetes', diabetes);
                        setFieldValue('pregnancy', pregnancy);
                        setFieldValue('lungDisease', lungDisease);
                      }
                      if (err) {
                        setTimeout(() => {
                          setProcessing(false);
                          notify.error(err?.message);
                        }, 1000);
                      }
                    }
                    if (comorbiditiesId) {
                      setFieldValue('comorbiditiesid', comorbiditiesId);
                      fetchDiagnosisDetailData();
                    }
                  }, [comorbiditiesId]);

                  return (
                    <Form>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="cva" name="cva" className="me-4" onChange={(e) => { setFieldValue('cva', e.target.checked);
                                   setAtLeastOneCheckboxChecked(e.target.checked);
                                   }}/>
                          Prior history of sudden onset weakness or sudden onset blurring of vision?
                        </label>
                        <ErrorMessage name="cva" component="div" className="text-danger" />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="coronaryArteryDisease" name="coronaryArteryDisease" className="me-4" onChange={(e) => { setFieldValue('coronaryArteryDisease', e.target.checked);
                                   setAtLeastOneCheckboxChecked(e.target.checked);
                                   }}/>
                          Coronary artery disease / Previous heart attacks
                        </label>
                        <ErrorMessage name="coronaryArteryDisease" component="div" className="text-danger"/>
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="heartFailure" name="heartFailure" className="me-4" onChange={(e) => { setFieldValue('heartFailure', e.target.checked);
                                   setAtLeastOneCheckboxChecked(e.target.checked);
                                   }}/>
                          Heart failure
                        </label>
                        <ErrorMessage name="heartFailure" component="div" className="text-danger" />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="diabetes" name="diabetes" className="me-4" onChange={(e) => { setFieldValue('diabetes', e.target.checked);
                                   setAtLeastOneCheckboxChecked(e.target.checked);
                                   }}/>
                          Are you diabetic?
                        </label>
                        <ErrorMessage name="diabetes" component="div" className="text-danger" />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="pregnancy" name="pregnancy" className="me-4" onChange={(e) => { setFieldValue('pregnancy', e.target.checked);
                                   setAtLeastOneCheckboxChecked(e.target.checked);
                                   }}/>
                          Are you currently pregnant?
                        </label>
                        <ErrorMessage name="pregnancy" component="div" className="text-danger" />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field type="checkbox" id="lungDisease" name="lungDisease" className="me-4" onChange={(e) => { setFieldValue('lungDisease', e.target.checked);
                                   setAtLeastOneCheckboxChecked(e.target.checked);
                                   }}/>
                          Prior history Asthma, COPD, Taking inhalers?
                        </label>
                        <ErrorMessage name="pregnancy" component="div" className="text-danger" />
                      </div>
                      <div className="text-end mt-4">
                        <button type="submit" className="btn btn-primary display-4" onClick={() => submit("symptoms")} disabled={!atLeastOneCheckboxChecked}
                               >Submit</button>
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
export default Comorbidities;
