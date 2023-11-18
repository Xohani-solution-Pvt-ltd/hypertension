
import { useState, useRef, useContext, useEffect } from "react";
import Link from "next/link";
import Layout, { StaticLayout } from "../components/Layout";
import {LockSVG,ColoredLock,CrossSVG,ProcessCircle} from "../assets/SVG/image";
import { APP_INFO } from "../environments/index";
import { AuthContext } from "../context/authentication";
import notify from "../helpers/notify";

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


const Login = () => {
  const { TITLE } = APP_INFO;
  const [textValue, setTextValue] = useState("");
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
  const age_ref = useRef<HTMLInputElement>(null);
  const gender_ref = useRef<HTMLSelectElement>(null);
  const address_ref = useRef<HTMLInputElement>(null);
  const height_ref = useRef<HTMLInputElement>(null);
  const weight_ref = useRef<HTMLInputElement>(null);
  const alcoholConsumption_ref = useRef<HTMLSelectElement>(null);
  const smokingStatus_ref = useRef<HTMLSelectElement | null>(null);
  const physicalActivity_ref = useRef<HTMLSelectElement>(null);

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
      password: pass?.password
    };

    const err = await CreateAccount(body);
    if (err) {
        setProcess(false);
    }
  };

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleOptionSelect = () => {
    console.log("Option selected!");
  };

  return (
    <Layout title={`signup | ${TITLE}`}>

      <Container className="pt-5" fluid>
        <Row className="d-flex justify-content-center pt-5 pb-5">
          <Card className="bg-light" style={{ width: '40rem',border: 'groove',maxHeight:'46rem'}}>
            <Card.Body>
              <Card.Title>
                <h4 className="text-center text-primary">Create your account:-{TITLE}</h4>
              </Card.Title>
              <Card.Text>
                <ColoredLock />
                We take privacy issues seriously. You can be sure that your personal data is securely protected. <CrossSVG />
              </Card.Text>
              <h4 className=" text-center text-primary">
                Personal Information
              </h4>
              <p className="px-5"> Unlock Your Identity: Share Your Personal Information for a Better Experience.
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

                <Col md={4}>
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

                <button
                  type="button"
                  className="btn btn-primary display-4"
                >
                  SignIn
                </button>
              </Link>
               </div>
              <div className="float-right">
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
              >Create Account
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











// import { useState, useRef, useContext, useEffect } from "react";
// import Link from "next/link";
// import Layout, { StaticLayout } from "../components/Layout";
// import {
//   LockSVG,
//   ColoredLock,
//   CrossSVG,
//   ProcessCircle,
// } from "../assets/SVG/image";
// import { APP_INFO } from "../environments/index";
// import { AuthContext } from "../context/authentication";
// import notify from "../helpers/notify";
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';

// const Login = () => {
//   const { TITLE } = APP_INFO;
//   const [textValue, setTextValue] = useState('');
//   const { CreateAccount } = useContext(AuthContext);

//   const [mobile_check, setUsername_check] = useState<boolean>(false);
//   const [process, setProcess] = useState<boolean>(false);


//   const [pass, setPass] = useState({
//     password: "",
//     confirmPassword: "",
//   });
//   const ChangePass = (e) => {
//     setPass({
//       ...pass,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const name_ref = useRef<HTMLInputElement>(null);
//   const email_ref = useRef<HTMLInputElement>(null);
//   const mobile_ref = useRef<HTMLInputElement>(null);
//   const age_ref = useRef<HTMLInputElement>(null);
//   const gender_ref = useRef<HTMLInputElement>(null);
//   const address_ref = useRef<HTMLInputElement>(null);
//   const height_ref = useRef<HTMLInputElement>(null);
//   const weight_ref = useRef<HTMLInputElement>(null);
//   const alcoholConsumption_ref = useRef<HTMLInputElement>(null);
//   const smokingStatus_ref = useRef<HTMLInputElement>(null);
//   const physicalActivity_ref = useRef<HTMLInputElement>(null);

//   const Submit = async (e) => {
//     e.preventDefault();
//     if (
//       !(
//         name_ref!.current.value &&
//         email_ref!.current.value &&
//         mobile_ref!.current.value &&
//         age_ref!.current.value &&
//         gender_ref!.current.value &&
//         address_ref!.current.value &&
//         height_ref!.current.value &&
//         weight_ref!.current.value &&
//         alcoholConsumption_ref!.current.value &&
//         smokingStatus_ref!.current.value &&
//         physicalActivity_ref!.current.value &&
//         pass.password
//       )
//     ) {
//       console.log("Fill All values");
//       notify.error("Fill All values");
//       return;
//     }
//     setProcess(true);
//     const body = {
//       fullName: name_ref!.current.value,
//       age: age_ref!.current.value,
//       email: email_ref!.current.value,
//       mobile: mobile_ref!.current.value,
//       password: pass?.password,
//       gender: gender_ref!.current.value,
//       height: height_ref!.current.value,
//       weight: weight_ref!.current.value,
//       address: address_ref!.current.value,
//       alcoholConsumption: alcoholConsumption_ref!.current.value,
//       smokingStatus: smokingStatus_ref!.current.value,
//       physicalActivity: physicalActivity_ref!.current.value,
//     };
//     const err = await CreateAccount(body);
//     if (err) {
//       setTimeout(() => {
//         setProcess(false);
//       }, 1000);
//     }
//   };


//    const handleInputChange = (e) => {
//     setTextValue(e.target.value);
//     };

//   const handleOptionSelect = () => {
//     console.log('Option selected!');
//   };


//   return (
//     <Layout title={`signup | ${TITLE}`}>
//       <Container fluid>
//           <Row className="mb-20 pt-5 pb-5" id="features5-11">
//               <div className="text-center">
//                 <h2 className="text-xl md:text-3xl font-bold text-secondary-300 font-primary">
//                   Create your account-{" "}
//                   <span className="text-primary-100">{TITLE}</span>
//                 </h2>
//               </div>
//               <div className="text-center px-5 bg-gray-100 justify-content-between mt-7">
//                   <p className="px-5 md:text-sm text-xs text-secondary-300">
//                   <ColoredLock />
//                     We take privacy issues seriously. You can be sure that your personal data is securely protected. <CrossSVG />
//                   </p>
//                 </div>
//               <Form className="mt-8 space-y-6" onSubmit={Submit}>
//                 <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
//                   <div className="w-80">
//                     <div className="flex items-center">
//                       <h1 className=" text-center text-xl font-medium pr-2 leading-5 text-secondary-300 font-primary">
//                         Personal Information
//                       </h1>
//                     </div>
//                     <p className="text-center mt-4 text-xs md:text-sm leading-5 text-secondary-300">
//                       Unlock Your Identity: Share Your Personal Information for a
//                       Better Experience.
//                     </p>
//                   </div>
//                   <Row>
//                   <Col md={6}>
//                   <Form.Group controlId="fullName" className="mb-4">
//                     <Form.Label>Full Name</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="text"
//                       ref={name_ref}
//                       name="fullName"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="John Doe"
//                       aria-labelledby="fullName"
//                       required={true}
//                     />
//                   </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                   <Form.Group controlId="emailAddress" className="mb-4">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                       type="email"
//                       ref={email_ref}
//                       name="email"
//                       placeholder="youremail@example.com"
//                       required
//                     />
//                   </Form.Group>
//                    </Col>
//                    <Col md={4}>
//                   <Form.Group controlId="mobile" className="mb-4">
//                     <Form.Label>Mobile</Form.Label>
//                     <Form.Control
//                       type="text"
//                       ref={mobile_ref}
//                       name="mobile"
//                       className={mobile_check ? 'border-red-800' : ''}
//                       placeholder="9876543210"
//                       minLength={5}
//                       required
//                     />
//                   </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                   <Form.Group controlId="age" className="mb-4">
//                     <Form.Label>Age</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="text"
//                       ref={age_ref}
//                       name="age"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="age"
//                       aria-labelledby="age"
//                       required={true}
//                     />
//                   </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                   <Form.Group controlId="gender" className="mb-4">
//                     <Form.Label>Gender</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="text"
//                       ref={gender_ref}
//                       name="gender"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="gender"
//                       aria-labelledby="gender"
//                       required={true}
//                       value={textValue}
//                       onChange={handleInputChange}
//                       onSelectOption={handleOptionSelect}
//                     >
//                     </Form.Control>
//                   </Form.Group>
//                    </Col>
//                    <Col md={4}>
//                   <Form.Group controlId="address" className="mb-4">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="text"
//                       ref={address_ref}
//                       name="address"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="address"
//                       aria-labelledby="address"
//                       required
//                     />
//                   </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                   <Form.Group controlId="height" className="mb-4">
//                     <Form.Label>Height</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="number"
//                       ref={height_ref}
//                       name="height"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="height"
//                       aria-labelledby="height"
//                       required={true}
//                     />
//                   </Form.Group>
//                    </Col>
//                    <Col md={4}>
//                   <Form.Group controlId="weight" className="mb-4">
//                     <Form.Label>Weight</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="number"
//                       ref={weight_ref}
//                       name="weight"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="weight"
//                       aria-labelledby="weight"
//                       required={true}
//                     />
//                   </Form.Group>
//                    </Col>
//                    <Col md={4}>
//                   <Form.Group controlId="alcoholConsumption" className="mb-4">
//                     <Form.Label>AlcoholConsumption</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="text"
//                       ref={alcoholConsumption_ref}
//                       name="alcoholConsumption"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="alcoholConsumption"
//                       aria-labelledby="alcoholConsumption"
//                       required
//                     />
//                   </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                   <Form.Group controlId="smokingStatus" className="mb-4">
//                     <Form.Label>SmokingStatus</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="text"
//                       ref={smokingStatus_ref}
//                       name="smokingStatus"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="smokingStatus"
//                       aria-labelledby="smokingStatus"
//                       required
//                     />
//                   </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                   <Form.Group controlId="physicalActivity" className="mb-4">
//                     <Form.Label>PhysicalActivity</Form.Label>
//                     <Form.Control
//                       tabIndex={0}
//                       type="text"
//                       ref={physicalActivity_ref}
//                       name="physicalActivity"
//                       className="rounded-none form-control-secondary-300"
//                       placeholder="physicalActivity"
//                       aria-labelledby="physicalActivity"
//                       required={true}
//                     />
//                   </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                   <Form.Group controlId="password" className="mb-4">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       name="password"
//                       value={pass.password}
//                       onChange={ChangePass}
//                       placeholder="Enter your password"
//                       minLength={8}
//                       required
//                     />
//                   </Form.Group>
//                    </Col>
//                    <Col md={6}>
//                   <Form.Group controlId="confirmPassword" className="mb-4">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       name="confirmPassword"
//                       value={pass.confirmPassword}
//                       onChange={ChangePass}
//                       className={
//                         pass.password === pass.confirmPassword
//                           ? ''
//                           : 'border-red-800'
//                       }
//                       placeholder="Confirm Your Password"
//                       minLength={8}
//                       required
//                     />
//                   </Form.Group>
//                    </Col>
//                    </Row>
//                 </div>
//                   <div className="position-absolute end-0">
//                     <Link href="/login">
//                       <span className="font-medium pr-2 leading-5 text-secondary-300 display-4">
//                         Have an Account?{" "}
//                       </span>
//                       <button
//                         type="button"
//                         className="btn btn-primary display-4"
//                       >
//                         SignIn
//                       </button>
//                     </Link>
//                   </div>
//                 <div className="float-right">
//                   <Button variant="primary"
//                     type="submit"
//                     disabled={
//                       (pass.password === pass.confirmPassword
//                         ? false
//                         : true) ||
//                       mobile_check ||
//                       process
//                     }
//                     className={`${pass.password === pass.confirmPassword
//                       ? "hover:bg-primary-300"
//                       : ""
//                       } group relative w-64 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//                   >
//                     <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                       {process === false ? <LockSVG /> : <ProcessCircle />}
//                     </span>
//                     <span>Create Account</span>
//                   </Button>
//                 </div>
//               </Form>
//           </Row>

//       </Container>
//     </Layout>
//   );
// };


// export default Login;


