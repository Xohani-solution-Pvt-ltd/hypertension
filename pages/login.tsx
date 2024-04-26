import React from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { APP_INFO } from "../environments/index";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/authentication";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LoginFormInterface, initialLoginValues } from "../interfaces/login";
import * as Yup from "yup";
import Card from "react-bootstrap/Card";
import { ColoredLock } from "../assets/SVG/image";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const { TITLE } = APP_INFO;
  const { LoginToAccount } = useContext(AuthContext);
  const [process, setProcess] = useState<Boolean>(false);
  const handleSubmit = async (values: LoginFormInterface) => {
    const err = await LoginToAccount(values);
    if (err) {
      setTimeout(() => {
        setProcess(false);
      }, 1000);
    }
  };

  return (
    <Layout title={`Login | ${TITLE}`}>
      <section className="bg-white">
        <Container className="pt-5" fluid>
          <Row className="d-flex justify-content-center pt-5 pb-5">
            <Card
              className="bg-light"
              style={{ width: "30rem", maxHeight: "30rem" }}
            >
              <Card.Body>
                <Card.Title>
                  <h4 className="text-center text-primary">Log in</h4>
                </Card.Title>
                <Card.Text>
                  <ColoredLock />
                  We take privacy issues seriously. You can be sure that your
                  personal data is securely protected.
                </Card.Text>
                <Col className="p-3 align-left">
                  <Formik
                    initialValues={initialLoginValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-primary display-4"
                        >
                          Login
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </Col>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Login;
