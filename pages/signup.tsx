import { useState, useRef, useContext, useEffect } from "react";
import Link from "next/link";
import Layout, { StaticLayout } from "../components/Layout";
import { ColoredLock } from "../assets/SVG/image";
import { APP_INFO } from "../environments/index";
import { AuthContext } from "../context/authentication";
import notify from "../helpers/notify";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const Login = () => {
  const { TITLE } = APP_INFO;
  const { CreateAccount } = useContext(AuthContext);
  const [mobile_check, setUsername_check] = useState<boolean>(false);
  const [process, setProcess] = useState<boolean>(false);
  const [pass, setPass] = useState({
    password: "",
    confirmPassword: "",
  });

  const ChangePass = (e) => {
    setPass({
      ...pass,
      [e.target.name]: e.target.value,
    });
  };

  const name_ref = useRef<HTMLInputElement>(null);
  const email_ref = useRef<HTMLInputElement>(null);
  const mobile_ref = useRef<HTMLInputElement>(null);

  const Submit = async (e) => {
    e.preventDefault();
    if (
      !(
        name_ref!.current.value &&
        email_ref!.current.value &&
        mobile_ref!.current.value &&
        pass.password
      )
    ) {
      notify.error("Fill All values");
    }
    setProcess(true);
    const body = {
      fullName: name_ref!.current.value,
      email: email_ref!.current.value,
      mobile: mobile_ref!.current.value,
      password: pass?.password,
    };

    const err = await CreateAccount(body);
    if (err) {
      setProcess(false);
    }
  };

  return (
    <Layout title={`signup | ${TITLE}`}>
      <Container className="pt-5" fluid>
        <Row className="d-flex justify-content-center pt-5 pb-5">
          <Card
            className="bg-light"
            style={{
              width: "100%",
              maxWidth: "40rem",
              border: "groove",
              maxHeight: "46rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                <h4 className="text-center text-primary">
                  Create Your Account :- {TITLE}
                </h4>
              </Card.Title>
              <Card.Text>
                <ColoredLock />
                We take privacy issues seriously. You can be sure that your
                personal data is securely protected.
              </Card.Text>
              <h4 className=" text-center text-primary">
                Personal Information
              </h4>
              <p>
                {" "}
                Unlock Your Identity: Share Your Personal Information for a
                Better Experience.
              </p>
              <Form className="mt-8 space-y-6" onSubmit={Submit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="fullName" className="mb-4">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        tabIndex={0}
                        type="text"
                        ref={name_ref}
                        name="fullName"
                        className="rounded-none form-control-secondary-300"
                        placeholder="John Doe"
                        aria-labelledby="fullName"
                        required={true}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="emailAddress" className="mb-4">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        ref={email_ref}
                        name="email"
                        placeholder="youremail@example.com"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="mobile" className="mb-4">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        ref={mobile_ref}
                        name="mobile"
                        className={mobile_check ? "border-red-800" : ""}
                        placeholder="9876543210"
                        minLength={5}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="password" className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={pass.password}
                        onChange={ChangePass}
                        placeholder="Enter your password"
                        minLength={8}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={pass.confirmPassword}
                        onChange={ChangePass}
                        className={
                          pass.password === pass.confirmPassword
                            ? ""
                            : "border-red-800"
                        }
                        placeholder="Confirm Your Password"
                        minLength={8}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="position-absolute end-0">
                  <Link href="/login">
                    <span className="font-medium pr-2 leading-5 text-secondary-300 display-4">
                      Have an Account?{" "}
                    </span>

                    <button type="button" className="btn btn-primary display-4">
                      Sign in
                    </button>
                  </Link>
                </div>
                <div className="float-right">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={
                      (pass.password === pass.confirmPassword ? false : true) ||
                      mobile_check ||
                      process
                    }
                    className={`${
                      pass.password === pass.confirmPassword
                        ? "hover:bg-primary-300"
                        : ""
                    } group relative w-64 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    Create Account
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;

