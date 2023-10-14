import React, { useState, useRef, useContext, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import {
  LockSVG,
  ColoredLock,
  CrossSVG,
  ProcessCircle,
} from "../assets/SVG/image";
import { APP_INFO } from "../environments/index";
import { AuthContext } from "../context/authentication";
import notify from "../helpers/notify";
import { Container, Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const { TITLE } = APP_INFO;
  const { CreateProfile } = useContext(AuthContext);
  const [process, setProcess] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAlcoholConsumption, setSelectedAlcoholConsumption] =
    useState<string>("");
  const [selectedSmokingStatus, setSelectedSmokingStatus] =
    useState<string>("");
  const [selectedPhysicalActivity, setSelectedPhysicalActivity] =
    useState<string>("");

  const dateOfBirth_ref = useRef<HTMLInputElement>(null);
  const address_ref = useRef<HTMLInputElement>(null);
  const weight_ref = useRef<HTMLInputElement>(null);
  const height_ref = useRef<HTMLInputElement>(null);

  const genderOptions = ["Male", "Female", "Other"];
  const alcoholConsumptionOptions = ["None", "Moderate", "Heavy"];
  const smokingStatusOptions = ["Non-Smoker", "Ex-Smoker", "Current-Smoker"];
  const physicalActivityOptions = ["Sedentary", "Moderate", "Active"];

  const Submit = async (e) => {
    e.preventDefault();
    if (
      !(
        dateOfBirth_ref!.current.value &&
        address_ref!.current.value &&
        weight_ref!.current.value &&
        height_ref!.current.value &&
        selectedGender &&
        selectedAlcoholConsumption &&
        selectedSmokingStatus &&
        selectedPhysicalActivity
      )
    ) {
      console.log("Fill All values");
      notify.error("Fill All values");
      return;
    }
    setProcess(true);
    const body = {
      dateOfBirth: dateOfBirth_ref!.current.value,
      address: address_ref!.current.value,
      weight: weight_ref!.current.value,
      height: height_ref!.current.value,
      gender: selectedGender,
      alcoholConsumption: selectedAlcoholConsumption,
      smokingStatus: selectedSmokingStatus,
      physicalActivity: selectedPhysicalActivity,
    };
    const err = await CreateProfile(body);

    if (!err) {
      dateOfBirth_ref!.current.value = "";
      address_ref!.current.value = "";
      weight_ref!.current.value = "";
      height_ref!.current.value = "";
      setSelectedGender("");
      setSelectedAlcoholConsumption("");
      setSelectedSmokingStatus("");
      setSelectedPhysicalActivity("");
      setTimeout(() => {
        setProcess(false);
      }, 1000);
    }
  };



  return (
    <Layout title={`UserProfileCreation | ${TITLE}`}>
      <section className="d-flex justify-content-center">
          <Container fluid>
            <Row className="d-flex justify-content-center pt-5">
              <Col md={6}>
                <h1 className="text-bold px-5">User Profile Creation</h1>
                <Form className="mt-8 space-y-6" onSubmit={Submit}>
                  <Form.Group controlId="dateOfBirth" className="mb-4">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      tabIndex={0}
                      type="date"
                      ref={dateOfBirth_ref}
                      name="dateOfBirth"
                      className="rounded-none form-control-secondary-300"
                      placeholder="enter birth"
                      aria-labelledby="dateOfBirth"
                      required={true}
                    />
                  </Form.Group>
                  <Form.Group controlId="address" className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      tabIndex={0}
                      type="text"
                      ref={address_ref}
                      name="address"
                      className="rounded-none form-control-secondary-300"
                      placeholder="enter address"
                      aria-labelledby="address"
                      required={true}
                    />
                  </Form.Group>
                  <Form.Group controlId="weight" className="mb-4">
                    <Form.Label>Weight (in kg)</Form.Label>
                    <Form.Control
                      tabIndex={0}
                      type="number"
                      ref={weight_ref}
                      name="weight"
                      className="rounded-none form-control-secondary-300"
                      placeholder="enter weight"
                      aria-labelledby="weight"
                      required={true}
                    />
                  </Form.Group>
                  <Form.Group controlId="height" className="mb-4">
                    <Form.Label>Height (in cm)</Form.Label>
                    <Form.Control
                      tabIndex={0}
                      type="number"
                      ref={height_ref}
                      name="height"
                      className="rounded-none form-control-secondary-300"
                      placeholder="enter height"
                      aria-labelledby="height"
                      required={true}
                    />
                  </Form.Group>
                  <Form.Group controlId="gender" className="mb-4">
                    <Form.Label>Gender</Form.Label>
                    <Dropdown
                      onSelect={(selectedValue) =>
                        setSelectedGender(selectedValue)
                      }
                    >
                      <Dropdown.Toggle variant="primary">
                        {selectedGender || "Select Gender"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {genderOptions.map((gender) => (
                          <Dropdown.Item key={gender} eventKey={gender}>
                            {gender}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  <Form.Group controlId="alcoholConsumption" className="mb-4">
                    <Form.Label>Alcohol Consumption</Form.Label>
                    <Dropdown
                      onSelect={(selectedValue) =>
                        setSelectedAlcoholConsumption(selectedValue)
                      }
                    >
                      <Dropdown.Toggle variant="primary">
                        {selectedAlcoholConsumption ||
                          "Select AlcoholConsumption"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {alcoholConsumptionOptions.map((alcoholConsumption) => (
                          <Dropdown.Item
                            key={alcoholConsumption}
                            eventKey={alcoholConsumption}
                          >
                            {alcoholConsumption}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <Form.Group controlId="smokingStatus" className="mb-4">
                    <Form.Label>Smoking Status</Form.Label>
                    <Dropdown
                      onSelect={(selectedValue) =>
                        setSelectedSmokingStatus(selectedValue)
                      }
                    >
                      <Dropdown.Toggle variant="primary">
                        {selectedSmokingStatus || "Select SmokingStatus"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {smokingStatusOptions.map((smokingStatus) => (
                          <Dropdown.Item
                            key={smokingStatus}
                            eventKey={smokingStatus}
                          >
                            {smokingStatus}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <Form.Group controlId="physicalActivity" className="mb-4">
                    <Form.Label>Physical Activity</Form.Label>
                    <Dropdown
                      onSelect={(selectedValue) =>
                        setSelectedPhysicalActivity(selectedValue)
                      }
                    >
                      <Dropdown.Toggle variant="primary">
                        {selectedPhysicalActivity || "Select physicalActivity"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {physicalActivityOptions.map((physicalActivity) => (
                          <Dropdown.Item
                            key={physicalActivity}
                            eventKey={physicalActivity}
                          >
                            {physicalActivity}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <div className="text-end">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
      </section>
    </Layout>
  );
};

export default Login;
