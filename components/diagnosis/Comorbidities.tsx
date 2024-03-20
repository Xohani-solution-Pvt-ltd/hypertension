// import React, { useEffect, useState, useMemo } from "react";
// import { useRouter } from "next/router";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   submitComorbiditiesAPI,
//   getComorbiditiesDetailsAPI,
//   updateComorbiditiesAPI,
// } from "../../services/call";
// import { getCookie } from "cookies-next";
// import notify from "../../helpers/notify";
// import {
//   ComorbiditiesInterface,
//   initialComorbiditiesValues,
// } from "../../interfaces/comorbidities";
// import { Col, Row } from "react-bootstrap";
// import Image from "next/image";
// import ComorbiditiesImg from "../../assets/images/Comorbidities.jpg";

// const validationSchema = Yup.object({
//   cva: Yup.boolean(),
//   coronaryArteryDisease: Yup.boolean(),
//   heartFailure: Yup.boolean(),
//   diabetes: Yup.boolean(),
//   pregnancy: Yup.boolean(),
//   lungDisease: Yup.boolean(),
// });

// const Comorbidities = ({ submit, preview }) => {
//   const [comorbiditiesId, setComorbiditiesId] = useState(undefined);
//   const [cvaData, setCvaData] = useState(false);
//   const [cadData, setCadData] = useState(false);
//   const [heartFailureData, setHeartFailureData] = useState(false);
//   const [diabetesData, setDiabetesData] = useState(false);
//   const [pregnancyData, setPregnancyData] = useState(false);
//   const [lungDiseaseData, setLungDiseaseData] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [comorbiditiesData, setComorbiditiesData] = useState(
//     initialComorbiditiesValues
//   );

//   const handleSubmit = async () => {
//     const inputData: ComorbiditiesInterface = {
//       cva: cvaData,
//       coronaryArteryDisease: cadData,
//       heartFailure: heartFailureData,
//       diabetes: diabetesData,
//       pregnancy: pregnancyData,
//       lungDisease: lungDiseaseData,
//     };
//     console.log('Input Data:', inputData);
//     if (
//       cvaData ||
//       cadData ||
//       heartFailureData ||
//       diabetesData ||
//       pregnancyData ||
//       lungDiseaseData
//     ) {
//       if (editing === true) {
//         if (comorbiditiesId) {
//           const [data, err] = await updateComorbiditiesAPI(
//             comorbiditiesId,
//             inputData
//           );
//           if (data) {
//             notify.success("Successfully updated Comorbidities");
//           }
//         } else {
//           notify.error("Comorbidities ID is missing. Cannot update.");
//         }
//       } else {
//         const [data, err] = await submitComorbiditiesAPI(inputData);
//         console.log('API Response:', data, err);
//         if (data) {
//           setEditing(true);
//           setComorbiditiesId(data.id);
//           notify.success("Succesfully Comorbidities");
//         }
//         if (err) {
//           notify.error(err?.message);
//         }
//       }
//     } else {
//       const [data, err] = await submitComorbiditiesAPI(inputData);
//       if (data) {
//         setEditing(true);
//         setComorbiditiesId(data.id);
//         notify.success("Succesfully Comorbidities");
//       }
//       if (err) {
//         notify.error(err?.message);
//       }
//     }
//   };

//   const fetchComorbiditiesData = async (id) => {
//     const [data, err] = await getComorbiditiesDetailsAPI(id);
//     if (data && data.data ) {
//       setComorbiditiesData(data.data);
//     }
//     if (err) {
//       notify.error(err?.message);
//     }
//   };

//   useEffect(() => {
//     if (comorbiditiesData != undefined) {
//       setCvaData(comorbiditiesData.cva);
//       setCadData(comorbiditiesData.coronaryArteryDisease);
//       setHeartFailureData(comorbiditiesData.heartFailure);
//       setDiabetesData(comorbiditiesData.diabetes);
//       setPregnancyData(comorbiditiesData.pregnancy);
//       setLungDiseaseData(comorbiditiesData.lungDisease);
//     }
//   }, [comorbiditiesData]);

//   useEffect(() => {
//     const id = getCookie("comorbiditiesId");
//     setComorbiditiesId(id);
//     if (id) {
//       setEditing(true);
//       fetchComorbiditiesData(id);
//     }
//   }, []);

//   return (
//     <>
//       <Row className="media-container-row">
//         <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">
//           Comorbidities
//         </h4>
//         <Col md={12} className="p-3 align-left">
//           <Row className="media-container-row">
//             <Col md={6} className="align-left">
//               <Formik
//                 initialValues={comorbiditiesData}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//                 enableReinitialize={true}
//               >
//                 {({ setFieldValue }) => {
//                   return (
//                     <Form>
//                       <div className="p-2">
//                         <label>
//                           <Field
//                             type="checkbox"
//                             id="cva"
//                             name="cva"
//                             className="me-4"
//                             onChange={(e) => {
//                               setFieldValue("cva", e.target.checked);
//                               setCvaData(e.target.checked);
//                             }}
//                           />
//                           Prior history of sudden onset weakness or sudden onset
//                           blurring of vision?
//                         </label>
//                         <ErrorMessage
//                           name="cva"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </div>
//                       <div className="p-2">
//                         <label>
//                           <Field
//                             type="checkbox"
//                             id="coronaryArteryDisease"
//                             name="coronaryArteryDisease"
//                             className="me-4"
//                             onChange={(e) => {
//                               setFieldValue(
//                                 "coronaryArteryDisease",
//                                 e.target.checked
//                               );
//                               setCadData(e.target.checked);
//                             }}
//                           />
//                           Coronary artery disease / Previous heart attacks
//                         </label>
//                         <ErrorMessage
//                           name="coronaryArteryDisease"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </div>
//                       <div className="p-2">
//                         <label>
//                           <Field
//                             type="checkbox"
//                             id="heartFailure"
//                             name="heartFailure"
//                             className="me-4"
//                             onChange={(e) => {
//                               setFieldValue("heartFailure", e.target.checked);
//                               setHeartFailureData(e.target.checked);
//                             }}
//                           />
//                           Heart failure
//                         </label>
//                         <ErrorMessage
//                           name="heartFailure"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </div>
//                       <div className="p-2">
//                         <label>
//                           <Field
//                             type="checkbox"
//                             id="diabetes"
//                             name="diabetes"
//                             className="me-4"
//                             onChange={(e) => {
//                               setFieldValue("diabetes", e.target.checked);
//                               setDiabetesData(e.target.checked);
//                             }}
//                           />
//                           Are you diabetic?
//                         </label>
//                         <ErrorMessage
//                           name="diabetes"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </div>
//                       <div className="p-2">
//                         <label>
//                           <Field
//                             type="checkbox"
//                             id="pregnancy"
//                             name="pregnancy"
//                             className="me-4"
//                             onChange={(e) => {
//                               setFieldValue("pregnancy", e.target.checked);
//                               setPregnancyData(e.target.checked);
//                             }}
//                           />
//                           Are you currently pregnant?
//                         </label>
//                         <ErrorMessage
//                           name="pregnancy"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </div>
//                       <div className="p-2">
//                         <label>
//                           <Field
//                             type="checkbox"
//                             id="lungDisease"
//                             name="lungDisease"
//                             className="me-4"
//                             onChange={(e) => {
//                               setFieldValue("lungDisease", e.target.checked);
//                               setLungDiseaseData(e.target.checked);
//                             }}
//                           />
//                           Prior history Asthma, COPD, Taking inhalers?
//                         </label>
//                         <ErrorMessage
//                           name="pregnancy"
//                           component="div"
//                           className="text-danger"
//                         />
//                       </div>
//                       <label className="mt-4">
//                         If No Any Comorbidities Click On Submit Button
//                       </label>
//                       <div className="mt-4">
//                         <button
//                           type="button"
//                           className="text-start btn btn-primary display-4"
//                           onClick={() => preview("diagnosis")}
//                         >
//                           Back
//                         </button>
//                         <button
//                           type="submit"
//                           className=" text-end btn btn-primary display-4"
//                           onClick={() => submit("symptoms")}
//                         >
//                           {editing ? "Edit" : "Next"}
//                         </button>
//                       </div>
//                     </Form>
//                   );
//                 }}
//               </Formik>
//             </Col>
//             <Col md={3} className="">
//               <Image
//                 src={ComorbiditiesImg}
//                 height={300}
//                 width={300}
//                 alt="Hypertension"
//               />
//             </Col>
//           </Row>
//         </Col>
//         <Col md={2} className="p-3 align-left"></Col>
//       </Row>
//     </>
//   );
// };
// export default Comorbidities;

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  submitComorbiditiesAPI,
  getComorbiditiesDetailsAPI,
  updateComorbiditiesAPI,
} from "../../services/call";
import { getCookie } from "cookies-next";
import notify from "../../helpers/notify";
import {
  ComorbiditiesInterface,
  initialComorbiditiesValues,
} from "../../interfaces/comorbidities";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import ComorbiditiesImg from "../../assets/images/Comorbidities.jpg";

const validationSchema = Yup.object({
  cva: Yup.boolean(),
  coronaryArteryDisease: Yup.boolean(),
  heartFailure: Yup.boolean(),
  diabetes: Yup.boolean(),
  pregnancy: Yup.boolean(),
  lungDisease: Yup.boolean(),
});

const initialValues = {
  cva: false,
  coronaryArteryDisease: false,
  heartFailure: false,
  diabetes: false,
  pregnancy: false,
  lungDisease: false,
};

const Comorbidities = ({ submit, preview }) => {
  const [comorbiditiesId, setComorbiditiesId] = useState(undefined);
  const [cvaData, setCvaData] = useState(initialComorbiditiesValues.cva);
  const [cadData, setCadData] = useState(false);
  const [heartFailureData, setHeartFailureData] = useState(false);
  const [diabetesData, setDiabetesData] = useState(false);
  const [pregnancyData, setPregnancyData] = useState(false);
  const [lungDiseaseData, setLungDiseaseData] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comorbiditiesData, setComorbiditiesData] = useState(
    initialComorbiditiesValues
  );
  const [cvaSubItemsVisible, setCvaSubItemsVisible] = useState(false);
  const [priorParalysis, setPriorParalysis] = useState(false);
  const [slurringOfSpeech, setSlurringOfSpeech] = useState(false);
  const [blurringOfVision, setBlurringOfVision] = useState(false);

  const handleSubmit = async () => {
    const inputData: ComorbiditiesInterface = {
      // cva: cvaData,
      cva: {
        paralysis: priorParalysis,
        slurringOfSpeech: slurringOfSpeech,
        blurringOfVision: blurringOfVision,
      },
      coronaryArteryDisease: cadData,
      heartFailure: heartFailureData,
      diabetes: diabetesData,
      pregnancy: pregnancyData,
      lungDisease: lungDiseaseData,
    };
    // console.log("Input Data:", inputData);

    if (
      cvaData ||
      cadData ||
      heartFailureData ||
      diabetesData ||
      pregnancyData ||
      lungDiseaseData
    ) {
      if (editing === true) {
        if (comorbiditiesId) {
          const [data, err] = await updateComorbiditiesAPI(
            comorbiditiesId,
            inputData
          );
          if (data) {
            notify.success("Successfully updated Comorbidities");
          }
        } else {
          notify.error("Comorbidities ID is missing. Cannot update.");
        }
      } else {
        const [data, err] = await submitComorbiditiesAPI(inputData);
        if (data) {
          setEditing(true);
          setComorbiditiesId(data.id);
          notify.success("Succesfully Comorbidities");
        }
        if (err) {
          notify.error(err?.message);
        }
      }
    }
  };

  const fetchComorbiditiesData = async (id) => {
    const [data, err] = await getComorbiditiesDetailsAPI(id);
    if (data && data.data) {
      setComorbiditiesData(data.data);
    }
    if (err) {
      notify.error(err?.message);
    }
  };

  useEffect(() => {
    if (comorbiditiesData != undefined) {
      setCvaData(comorbiditiesData.cva);
      setCadData(comorbiditiesData.coronaryArteryDisease);
      setHeartFailureData(comorbiditiesData.heartFailure);
      setDiabetesData(comorbiditiesData.diabetes);
      setPregnancyData(comorbiditiesData.pregnancy);
      setLungDiseaseData(comorbiditiesData.lungDisease);
    }
  }, [comorbiditiesData]);

  useEffect(() => {
    const id = getCookie("comorbiditiesId");
    setComorbiditiesId(id);
    if (id) {
      setEditing(true);
      fetchComorbiditiesData(id);
    }
  }, []);

  return (
    <>
      <Row className="media-container-row">
        <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">
          Comorbidities
        </h4>
        <Col md={12} className="p-3 align-left">
          <Row className="media-container-row">
            <Col md={6} className="align-left">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ setFieldValue }) => {
                  return (
                    <Form>
                      <div className="p-2">
                        <label>
                          <Field
                            type="checkbox"
                            id="cva"
                            name="cva"
                            className="me-4"
                            onChange={(e) => {
                              setFieldValue("cva", e.target.checked);
                              setCvaData(e.target.checked);
                              setCvaSubItemsVisible(e.target.checked);
                            }}
                          />
                          Any history of paralysis/ atrang/ lakua
                        </label>
                        {cvaSubItemsVisible && (
                          <div>
                            <div className="p-2">
                              <label>
                                <Field
                                  type="checkbox"
                                  id="priorParalysis"
                                  name="priorParalysis"
                                  className="me-4"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "priorParalysis",
                                      e.target.checked
                                    );
                                    setPriorParalysis(e.target.checked);
                                  }}
                                />
                                Prior paralysis / weakness of arms or legs
                              </label>
                            </div>
                            <div className="p-2">
                              <label>
                                <Field
                                  type="checkbox"
                                  id="slurringOfSpeech"
                                  name="slurringOfSpeech"
                                  className="me-4"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "slurringOfSpeech",
                                      e.target.checked
                                    );
                                    setSlurringOfSpeech(e.target.checked);
                                  }}
                                />
                                Prior slurring of speech
                              </label>
                            </div>
                            <div className="p-2">
                              <label>
                                <Field
                                  type="checkbox"
                                  id="blurringOfVision"
                                  name="blurringOfVision"
                                  className="me-4"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "blurringOfVision",
                                      e.target.checked
                                    );
                                    setBlurringOfVision(e.target.checked);
                                  }}
                                />
                                Prior blurring of vision
                              </label>
                            </div>
                          </div>
                        )}
                        <ErrorMessage
                          name="cva"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field
                            type="checkbox"
                            id="coronaryArteryDisease"
                            name="coronaryArteryDisease"
                            className="me-4"
                            onChange={(e) => {
                              setFieldValue(
                                "coronaryArteryDisease",
                                e.target.checked
                              );
                              setCadData(e.target.checked);
                            }}
                          />
                          Prior Heart attack or stenting
                        </label>
                        <ErrorMessage
                          name="coronaryArteryDisease"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field
                            type="checkbox"
                            id="heartFailure"
                            name="heartFailure"
                            className="me-4"
                            onChange={(e) => {
                              setFieldValue("heartFailure", e.target.checked);
                              setHeartFailureData(e.target.checked);
                            }}
                          />
                          Heart failure
                        </label>
                        <ErrorMessage
                          name="heartFailure"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field
                            type="checkbox"
                            id="diabetes"
                            name="diabetes"
                            className="me-4"
                            onChange={(e) => {
                              setFieldValue("diabetes", e.target.checked);
                              setDiabetesData(e.target.checked);
                            }}
                          />
                          Do you have high blood sugars or are on any
                          medications to control blood sugar?
                        </label>
                        <ErrorMessage
                          name="diabetes"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field
                            type="checkbox"
                            id="pregnancy"
                            name="pregnancy"
                            className="me-4"
                            onChange={(e) => {
                              setFieldValue("pregnancy", e.target.checked);
                              setPregnancyData(e.target.checked);
                            }}
                          />
                          if female , are you currently pregnant ?
                        </label>
                        <ErrorMessage
                          name="pregnancy"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="p-2">
                        <label>
                          <Field
                            type="checkbox"
                            id="lungDisease"
                            name="lungDisease"
                            className="me-4"
                            onChange={(e) => {
                              setFieldValue("lungDisease", e.target.checked);
                              setLungDiseaseData(e.target.checked);
                            }}
                          />
                          Do you take any inhalers for issues with your lung?
                        </label>
                        <ErrorMessage
                          name="lungDisease"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <label className="mt-4">
                        If No Any Comorbidities Click On Submit Button
                      </label>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="text-start btn btn-primary display-4"
                          onClick={() => preview("diagnosis")}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className=" text-end btn btn-primary display-4"
                          onClick={() => submit("symptoms")}
                        >
                          {editing ? "Edit" : "Next"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
            <Col md={3} className="">
              <Image
                src={ComorbiditiesImg}
                height={300}
                width={300}
                alt="Hypertension"
              />
            </Col>
          </Row>
        </Col>
        <Col md={2} className="p-3 align-left"></Col>
      </Row>
    </>
  );
};
export default Comorbidities;
