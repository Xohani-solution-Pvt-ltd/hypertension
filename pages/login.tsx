import Link from "next/link";
import Layout from "../components/Layout";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { APP_INFO } from "../environments/index";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/authentication";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { LoginFormInterface, initialLoginValues } from "../interfaces/login";
import * as Yup from 'yup';
import Loading from "../components/Loading";
import { BeatLoader } from "react-spinners";

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

const Login = () => {
  const { TITLE } = APP_INFO;
  const [loading, setLoading] = useState(true);
  const { LoginToAccount } = useContext(AuthContext);
  const [process, setProcess] = useState<Boolean>(false);
  const handleSubmit = async (values: LoginFormInterface) => {
    const err = await LoginToAccount(values);
    if (err) {
      setTimeout(() => {
        setProcess(false);
      }, 1000);
    }
    console.log('Submitted values:', values);
  };

  useEffect(() => {
    // Simulate page loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout title={`Login | ${TITLE}`}>
      <section className="d-flex justify-content-center pt-5">
        {loading ? (
          <BeatLoader color="#039dfc" size={20} />
        ) : (
          <Container style={{ height: '75vh' }}>
            <Row className="justify-content-center">
              <h4 className="card-title align-left py-2 mbr-bold mbr-fonts-style mbr-text align-center display-7">Log in to your {TITLE}</h4>
              <Col md={4} className="p-3 align-left">
                <div className="wrap">
                </div>
                <div className="content">
                  <Formik initialValues={initialLoginValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form>
                      <div className="p-4">
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <div className="p-4">
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" className="form-control" />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-primary display-4">Login</button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </Col>
            </Row>
          </Container>
        )
        }
      </section>
    </Layout>
  );
};

export default Login;
