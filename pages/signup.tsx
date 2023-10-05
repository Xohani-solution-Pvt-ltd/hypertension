import { useState, useRef, useContext, useEffect } from "react";
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
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { BeatLoader } from "react-spinners";

const Login = () => {
  const { TITLE } = APP_INFO;
  const [loading, setLoading] = useState(true);
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
      console.log("Fill All values");
      notify.error("Fill All values");
      return;
    }
    setProcess(true);
    const body = {
      fullName: name_ref!.current.value,
      // dateOfBirth: birth_ref!.current.value,
      email: email_ref!.current.value,
      mobile: mobile_ref!.current.value,
      password: pass?.password,
      // gender: gender_ref!.current.value,
      // height: height_ref!.current.value,
      // weight: weight_ref!.current.value,
    };
    const err = await CreateAccount(body);
    if (err) {
      setTimeout(() => {
        setProcess(false);
      }, 1000);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);


  return (
    <Layout title={`signup | ${TITLE}`}>
      <Container className="d-flex justify-content-center" fluid>
        {loading ? (
          <BeatLoader color="#039dfc" size={20} />
        ) : (
          <Row className="d-flex justify-content-center py-10 mb-20 pt-5" id="features5-11">
            <Col md={8} lg={6}>
              <div className="text-center">
                <h2 className="text-xl md:text-3xl font-bold text-secondary-300 font-primary">
                  Create your account-{" "}
                  <span className="text-primary-100">{TITLE}</span>
                </h2>
              </div>
              <div className="px-5 py-4 bg-gray-100 rounded-lg d-flex align-items-center justify-content-between mt-7">
                <div className="d-flex align-items-center">
                  <ColoredLock />
                  <p className="md:text-sm text-xs text-secondary-300 pl-3">
                    We take privacy issues seriously. You can be sure that your personal data is securely protected.
                  </p>
                </div>
                <Button variant="link" className="block focus:outline-none focus:ring-2 focus:ring-gray-700">
                  <CrossSVG />
                </Button>
              </div>
              <Form className="mt-8 space-y-6" onSubmit={Submit}>
                <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
                  <div className="w-80">
                    <div className="flex items-center">
                      <h1 className="text-xl font-medium pr-2 leading-5 text-secondary-300 font-primary">
                        Personal Information
                      </h1>
                    </div>
                    <p className="mt-4 text-xs md:text-sm leading-5 text-secondary-300">
                      Unlock Your Identity: Share Your Personal Information for a
                      Better Experience.
                    </p>
                  </div>
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
                  {/* <Form.Group controlId="dateOfBirth" className="mb-4">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="dateOfBirth"
              ref={birth_ref}
              name="dateOfBirth"
              placeholder="Enter your Birth"
              required
            />
          </Form.Group>        */}
                  {/* ... */}
                  <Form.Group controlId="mobile" className="mb-4">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      ref={mobile_ref}
                      name="mobile"
                      className={mobile_check ? 'border-red-800' : ''}
                      placeholder="9876543210"
                      minLength={5}
                      required
                    />
                  </Form.Group>
                  {/* ... */}
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
                  {/* ... */}
                  <Form.Group controlId="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={pass.confirmPassword}
                      onChange={ChangePass}
                      className={
                        pass.password === pass.confirmPassword
                          ? ''
                          : 'border-red-800'
                      }
                      placeholder="Confirm Your Password"
                      minLength={8}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="mt-16 flex flex-col-reverse md:flex-row justify-between border-b border-gray-200 pb-16 mb-4 font-primary">
                  <div>
                    <Link href="/login">
                      <span className="font-medium pr-2 leading-5 text-secondary-300">
                        Have an Account?{" "}
                      </span>
                      <button
                        type="button"
                        className="absolute left-0 inset-y-0 flex items-center pl-3 font-primary"
                      >
                        SignIn
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mt-2 font-primary">
                  <Button variant="primary"
                    type="submit"
                    disabled={
                      (pass.password === pass.confirmPassword
                        ? false
                        : true) ||
                      mobile_check ||
                      process
                    }
                    className={`${pass.password === pass.confirmPassword
                      ? "hover:bg-primary-300"
                      : ""
                      } group relative w-64 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      {process === false ? <LockSVG /> : <ProcessCircle />}
                    </span>
                    <span>Create Account</span>
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        )
        }
      </Container>
    </Layout>
  );
};

export default Login;






{/* <Container>
<StaticLayout title={`Join us | ${TITLE}`}>
  <div className="flex items-center justify-center py-10">
    <div className="xl:w-10/12 w-full px-8">
      <div className="xl:px-24">
        <div>
          <h2 className="mt-6 text-center text-xl md:text-3xl font-extrabold text-secondary-300 font-primary">
            Create your account-{" "}
            <span className="text-primary-100">{TITLE}</span>
          </h2>
        </div>
        <div className="px-5 py-4 bg-gray-100 rounded-lg flex items-center justify-between mt-7">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ColoredLock />
            </div>

            <p className="md:text-sm text-xs  text-secondary-300 pl-3">
              We take privacy issues seriously. You can be sure that your
              personal data is securely protected.
            </p>
          </div>
          <button className="block focus:outline-none focus:ring-2 focus:ring-secondary-300 rounded">
            <CrossSVG />
          </button>
        </div>
        <form onSubmit={Submit}>
          <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
            <div className="w-80">
              <div className="flex items-center">
                <h1 className="text-xl font-medium pr-2 leading-5 text-secondary-300 font-primary">
                  Personal Information
                </h1>
              </div>
              <p className="mt-4 text-xs md:text-sm leading-5 text-secondary-300">
                Unlock Your Identity: Share Your Personal Information for a
                Better Experience.
              </p>
            </div>
            <div>
              <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                <div className="md:w-64">
        <Form.Group controlId="fullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
        tabIndex={0}
          type="text"
          // ref={name_Ref}
          name="fullName"
          placeholder="John Doe"
          aria-labelledby="fullName"
          required={true}
        />
      </Form.Group>
                  <label
                    className="text-sm leading-none text-secondary-300"
                    id="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    
                    ref={name_ref}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
                    name="fullName"
                    aria-labelledby="fullName"
                    placeholder="John Doe"
                    
                  />
                </div>
              </div>
              <div className="md:flex items-center lg:ml-24 mt-8">
                <div className="md:w-64 ">
                  <label
                    className="text-sm leading-none text-secondary-300"
                    id="emailAddress"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    tabIndex={0}
                    ref={email_ref}
                    name="email"
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
                    aria-labelledby="emailAddress"
                    placeholder="youremail@example.com"
                    required={true}
                  />
                </div>
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                  <label
                    className="text-sm leading-none text-secondary-300"
                    id="mobile"
                  >
                    Mobile
                  </label>
                  <input
                    type="text"
                    tabIndex={0}
                    ref={mobile_ref}
                    name="mobile"
                    className={`${
                      mobile_check === true ? "border-red-800" : ""
                    } w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300`}
                    aria-labelledby="mobile"
                    placeholder="9876543210"
                    minLength={5}
                    // onBlur={runthis}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
            <div className="w-80">
              <div className="flex items-center">
                <h1 className="text-xl font-medium pr-2 leading-5 text-secondary-300 font-primary">
                  Security
                </h1>
              </div>
              <p className="mt-4 text-xs md:text-sm leading-5 text-secondary-300">
                Protect What Matters Most: Ensure the Safety of Your
                Information with Us
              </p>
            </div>
            <div>
              <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                <div className="md:w-64">
                  <label
                    className="text-sm leading-none text-secondary-300"
                    id="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    tabIndex={0}
                    name="password"
                    value={pass.password}
                    onChange={ChangePass}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
                    aria-labelledby="password"
                    minLength={8}
                    placeholder="Enter your password"
                    required={true}
                  />
                </div>
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                  <label
                    className="text-sm leading-none text-secondary-300"
                    id="confirmPassword"
                  >
                    Confirm Password{" "}
                    <span
                      className={`${
                        pass.password === pass.confirmPassword
                          ? "hidden"
                          : ""
                      } font-serif mt-4 pl-4 text-sm leading-5 text-red-600`}
                    >
                      Not Matched !
                    </span>
                  </label>
                  <input
                    type="password"
                    tabIndex={0}
                    name="confirmPassword"
                    value={pass.confirmPassword}
                    onChange={ChangePass}
                    className={`${
                      pass.password === pass.confirmPassword
                        ? ""
                        : "border-red-800"
                    } w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300`}
                    aria-labelledby="confirmPassword"
                    placeholder="Confirm Your Password"
                    minLength={8}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
            <div className="w-80">
              <div className="flex items-center">
                <h1 className="text-xl font-medium pr-2 leading-5 text-secondary-300 font-primary">
                  Security
                </h1>
              </div>
              <p className="mt-4 text-xs md:text-sm leading-5 text-secondary-300">
                Protect What Matters Most: Ensure the Safety of Your
                Information with Us
              </p>
            </div>
            <div>
              <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                  <label
                    className="text-sm leading-none text-secondary-300"
                    id="age"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    tabIndex={0}
                    ref={gender_ref}
                    name="age"
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
                    aria-labelledby="gender"
                    placeholder="Gender"
                    required={true}
                  />
                </div>
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                <label
                    className="text-sm leading-none text-secondary-300"
                    id="age"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    tabIndex={0}
                    ref={age_ref}
                    name="age"
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
                    aria-labelledby="age"
                    placeholder="Age"
                    required={true}
                  />
                </div>
              </div>
              <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                <label
                    className="text-sm leading-none text-secondary-300"
                    id="height"
                  >
                    Height
                  </label>
                  <input
                    type="text"
                    tabIndex={0}
                    ref={height_ref}
                    name="height"
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
                    aria-labelledby="height"
                    placeholder="Height"
                    required={true}
                  />
                </div>
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                  <label
                    className="text-sm leading-none text-secondary-300"
                    id="weight"
                  >
                    Weight
                  </label>
                  <input
                    type="text"
                    tabIndex={0}
                    ref={weight_ref}
                    name="weight"
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
                    aria-labelledby="weight"
                    placeholder="Weight"
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col-reverse md:flex-row justify-between border-b border-gray-200 pb-16 mb-4 font-primary">
            <div>
              <Link href="/login">
                <span className="font-medium pr-2 leading-5 text-secondary-300">
                  Have an Account?{" "}
                </span>
                <button
                  type="button"
                  className="text-sm font-medium rounded-md text-primary-100 hover:text-primary-300 focus:outline-none hover:underline"
                >
                  SignIn
                </button>
              </Link>
            </div>
            <div>
              <div className="md:flex items-center lg:ml-20 lg:mt-0 mt-4 mb-2">
                <div className="md:w-64 md:mt-0 mt-4">
                  <button
                    type="submit"
                    disabled={
                      (pass.password === pass.confirmPassword
                        ? false
                        : true) ||
                      mobile_check ||
                      process
                    }
                    className={`${
                      pass.password === pass.confirmPassword
                        ? "hover:bg-primary-300"
                        : ""
                    } group relative w-64 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      {process === false ? <LockSVG /> : <ProcessCircle />}
                    </span>
                    <span>Create Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</StaticLayout>
</Container>
);
};

export default Login; */}
