
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Nav, Tab, Card, Form } from 'react-bootstrap';
import { HouseExclamationFill, PersonFillUp } from 'react-bootstrap-icons';
import Layout from "../components/Layout";
import DisplayUser from "../components/DisplayUser";
import { useRouter } from "next/router";
import { AuthContext } from "../context/authentication";
import { APP_INFO } from "../environments/index";
import BackgroundImg from '../assets/images/Background.png'
import Background2Img from '../assets/images/Background2.png'
import card1Img from '../assets/images/card1.jpg'
import card2Img from '../assets/images/card2.jpg'
import card3Img from '../assets/images/card3.jpg'
import boneImg from '../assets/images/bone.png'
import face1Img from '../assets/images/face1.jpg'
import face2Img from '../assets/images/face2.jpg'
import face3Img from '../assets/images/face3.png'
import rockImg from '../assets/images/rock.png'
import Image from "next/image";
import NoContraindication from "../components/diagnosis/NoContraindication";
import ResponsivePieCircle from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import HomeImg from '../assets/images/Home.svg'
import { Carousel } from 'react-bootstrap';
import { Twitter } from "react-bootstrap-icons";
import Loading from "../components/Loading";


const plans = [
  {
    title: 'PET TRAIN',
    duration: '1 Day',
    items: [
      { text: 'Double room', icon: 'mbrib-success', iconColor: 'rgb(122, 186, 89)' },
      { text: 'Socialise', icon: 'mbrib-success', iconColor: 'rgb(122, 186, 89)' },
      { text: 'Brush', icon: 'mbrib-success', iconColor: 'rgb(122, 186, 89)' },
      { text: 'Pet TV', icon: 'mbri-close', iconColor: 'rgb(56, 56, 56)' },
    ],
    price: 50,
  },
  {
    title: 'PET TRAIN',
    duration: '10 Day',
    items: [
      { text: 'Single room', icon: 'mbrib-success', iconColor: 'rgb(255, 255, 255)' },
      { text: 'Socialise Excercise', icon: 'mbrib-success', iconColor: 'rgb(255, 255, 255)' },
      { text: 'Custom Meals', icon: 'mbrib-success', iconColor: 'rgb(255, 255, 255)' },
      { text: 'Spa and Grooming', icon: 'mbri-success', iconColor: 'rgb(255, 255, 255)' },
    ],
    price: 350,
  },
  {
    title: 'PET TRAIN',
    duration: '20 Day',
    items: [
      { text: 'Single room', icon: 'mbrib-success', iconColor: 'rgb(122, 186, 89)' },
      { text: 'Excercise 2x', icon: 'mbrib-success', iconColor: 'rgb(122, 186, 89)' },
      { text: 'Custom Meals', icon: 'mbrib-success', iconColor: 'rgb(122, 186, 89)' },
      { text: 'Grooming 2x', icon: 'mbri-close', iconColor: 'rgb(56, 56, 56)' },
    ],
    price: 550,
  },
];



const IndexPage = () => {
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const { TITLE } = APP_INFO;
  const router = useRouter();
  const navigateToStep = (step: number) => {
    setStep(step);
  };
  useEffect(() => { }, [1]);

  return (
    <Layout title={`Dashboard | ${TITLE}`}>
      <main className="justify-center mt-8 font-primary">
        {isAuthenticated === true ? (
          <>
            {/* <Container className="mx-auto items-center">
              <Row>
                <Col>
                  <div className="board">
                    <div className="board-inner">
                      <Tab.Container id="myTab" defaultActiveKey="home">
                        <Nav variant="tabs" className="nav nav-tabs nav-justified" id="myTab">
                          <div className="liner"></div>
                          <Nav.Item>
                            <Nav.Link eventKey="diagnosis" title="Diagnosis">
                              <span className="round-tabs one">
                                <HouseExclamationFill />
                              </span>
                              <p>Diagnosis</p>
                            </Nav.Link>
                         
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="comorbidities" title="Comorbidities">
                              <span className="round-tabs two">
                                <PersonFillUp/>
                              </span>
                             <p> Comorbidities</p>
                            </Nav.Link>
                            
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="symptoms" title="Symptoms Monitoring">
                              <span className="round-tabs three">
                              <HouseExclamationFill />
                              </span>
                              <p>Symptoms Monitoring</p>
                            </Nav.Link>
                           
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="bloodTest" title="Blood Test">
                              <span className="round-tabs four">
                              <HouseExclamationFill />
                              </span>
                              <p>Blood Test</p>
                            </Nav.Link>
                            
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="riskStratification" title="Risk Stratification">
                              <span className="round-tabs five">
                              <HouseExclamationFill />
                              </span>
                              <p>Risk Stratification</p>
                            </Nav.Link>
                         
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="decideContraindications" title="Decide Contraindications">
                              <span className="round-tabs five">
                              <HouseExclamationFill />
                              </span>
                              <p>Decide Contraindications</p>
                            </Nav.Link>
                         
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="recommendedTreatment" title="Recommended Treatment">
                              <span className="round-tabs five">
                              <HouseExclamationFill />
                              </span>
                              <p>Recommended Treatment</p>
                            </Nav.Link>
                            
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="treatmentModality" title="TreatmentModality">
                              <span className="round-tabs five">
                              <HouseExclamationFill />
                              </span>
                              <p>TreatmentModality</p>
                            </Nav.Link>
                            
                          </Nav.Item>
                        </Nav>
                        <Tab.Content>
                          <Tab.Pane eventKey="diagnosis">
                            <Diagnosis />
                          </Tab.Pane>
                          <Tab.Pane eventKey="comorbidities">
                            <Comorbidities />
                          </Tab.Pane>

                          <Tab.Pane eventKey="symptoms">
                            <Symptoms />
                          </Tab.Pane>

                          <Tab.Pane eventKey="bloodTest">
                            <BloodTest />
                          </Tab.Pane>

                          <Tab.Pane eventKey="riskStratification">
                            <RiskStratification />
                          </Tab.Pane>

                          <Tab.Pane eventKey="decideContraindications">
                            <DecideContraindication />
                          </Tab.Pane>

                          <Tab.Pane eventKey="treatmentModality">
                            <TreatmentModality/>
                          </Tab.Pane>
                          <Tab.Pane eventKey="recommendedTreatment">
                            <div className="text-center">
                              <i className="img-intro icon-checkmark-circle"></i>
                            </div>
                            <h3 className="head text-center">
                              thanks for staying tuned! <span style={{ color: '#f48260' }}>♥</span> Recommended Treatment
                            </h3>
                            <p className="narrow text-center">
                              Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut,
                              utinam saperet facilisi an vim.
                            </p>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </div>
                  </div>
                </Col>
              </Row>

            </Container> */}
          </>
        ) : (
          <section className="bg-white">
            <Container className="py-4">
              <Row className="align-items-center">
                <Col md={12} lg={5} className="content align-left py-4">
                  <h1 className="mbr-section-title align-left mbr-bold pb-3 display-4">
                    Hypertension Training School
                  </h1>
                  <p className="mbr-text pb-3 align-left display-7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu dui non diam eleifend egestas id a ligula.
                  </p>
                  <div className="align-wrap align-left">
                    <div className="icons-wrap">
                      <div className="icon-wrap">
                        <span className="mbr-iconfont mbrib-apple"></span>
                        <h3 className="icon-title mbr-bold display-7">EAT</h3>
                      </div>
                      <div className="icon-wrap">
                        <span className="mbr-iconfont mbrib-globe"></span>
                        <h3 className="icon-title mbr-bold display-7">PLAY</h3>
                      </div>
                      <div className="icon-wrap">
                        <span className="mbr-iconfont mbrib-github"></span>
                        <h3 className="icon-title mbr-bold display-7">BRUSH</h3>
                      </div>
                    </div>
                  </div>
                  <div className="align-left mbr-section-btn ">
                    <Button className="btn btn-md btn-primary display-4 " href="https://hypertension.co">VIEW MORE</Button>
                    <Button className="btn btn-md btn-primary display-4" href="https://hypertension.co">BOOK NOW</Button>
                  </div>
                </Col>
                <Col md={12} lg={5} className="content align-left py-4">
                  <Image src={BackgroundImg} height={550} width={690} alt="Hypertension" />
                </Col>
              </Row>
            </Container>
            <section className="pt-5 bg-white">
              <Container>
                <Row className="gap-6 md:gap-2">
                  <Col md={3} className="bg-primary">
                    <div style={{ width: '12rem' }} >
                      <div className="d-flex align-items-center  justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="70"
                          fill="currentColor"
                          className="bi bi-house"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.5 8.882V15.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-6.618L7.293 1.62a1 1 0 0 1 1.414 0l6.793 6.793zm-1 0a.5.5 0 0 0-.354-.854L8 6.293 2.854 1.028a.5.5 0 0 0-.708.708l6.5 6.5a.5.5 0 0 0 .708 0l6.5-6.5a.5.5 0 0 0-.708-.708L8 6.293l-4.146-4.147a.5.5 0 0 0-.708.708L7.5 8.882V15.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5V8.882z" />
                        </svg>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">pets boarding</h5>
                        <p className="card-text">
                          Pellentesque habitant felis morbi tristique senectus et netus et malesuada fames ac turpis netus egestas.
                        </p>
                        <h5 className="link font-weight-bold display-8">
                          <a href="#" className="text-dark">
                            VIEW MORE
                          </a>
                        </h5>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="card bg-orange-500" style={{ width: '12rem' }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-apple"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.5 8.882V15.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-6.618L7.293 1.62a1 1 0 0 1 1.414 0l6.793 6.793zm-1 0a.5.5 0 0 0-.354-.854L8 6.293 2.854 1.028a.5.5 0 0 0-.708.708l6.5 6.5a.5.5 0 0 0 .708 0l6.5-6.5a.5.5 0 0 0-.708-.708L8 6.293l-4.146-4.147a.5.5 0 0 0-.708.708L7.5 8.882V15.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5V8.882z" />
                        </svg>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Healthy Meals</h5>
                        <p className="card-text">
                          Pellentesque habitant felis morbi tristique senectus et netus et malesuada fames ac turpis netus egestas.
                        </p>
                        <h6>
                          viewmore
                        </h6>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="card bg-orange-500" style={{ width: '12rem' }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-house-door"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.5 8.882V15.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-6.618L7.293 1.62a1 1 0 0 1 1.414 0l6.793 6.793zm-1 0a.5.5 0 0 0-.354-.854L8 6.293 2.854 1.028a.5.5 0 0 0-.708.708l6.5 6.5a.5.5 0 0 0 .708 0l6.5-6.5a.5.5 0 0 0-.708-.708L8 6.293l-4.146-4.147a.5.5 0 0 0-.708.708L7.5 8.882V15.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5V8.882z" />
                        </svg>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Activity Games</h5>
                        <p className="card-text">
                          Pellentesque habitant felis morbi tristique senectus et netus et malesuada fames ac turpis netus egestas.
                        </p>
                        <h6>
                          viewmore
                        </h6>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="card bg-orange-500" style={{ width: '12rem' }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-house-door"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.5 8.882V15.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-6.618L7.293 1.62a1 1 0 0 1 1.414 0l6.793 6.793zm-1 0a.5.5 0 0 0-.354-.854L8 6.293 2.854 1.028a.5.5 0 0 0-.708.708l6.5 6.5a.5.5 0 0 0 .708 0l6.5-6.5a.5.5 0 0 0-.708-.708L8 6.293l-4.146-4.147a.5.5 0 0 0-.708.708L7.5 8.882V15.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5V8.882z" />
                        </svg>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">Pet Taxi</h5>
                        <p className="card-text">
                          Pellentesque habitant felis morbi tristique senectus et netus et malesuada fames ac turpis netus egestas.
                        </p>
                        <h6>
                          viewmore
                        </h6>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white">
              <Container>
                <Row className="align-items-center">
                  <Col md={12} lg={6} className="content align-left py-4">
                    <Image src={Background2Img} height={550} width={690} alt="Hypertension" />
                  </Col>
                  <Col md={12} lg={6} className="d-flex justify-content-right py-4">
                    <h5 className=" display-4">
                      Hypertension Training School
                    </h5>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="d-flex justify-content-center pt-5 bg-white px-5 py-5">
              <Container fluid>
                <Row className="gap-10 md:gap-6">
                  <h4>pet activity</h4>
                  <h1>Take a closer look</h1>
                  <div className="d-flex justify-content-end mbr-section-btn">
                    <a href="https://hypertension.co" className="btn btn-md btn-primary display-4">VIEW ALL</a>
                  </div>
                  <Col md={3}>
                    <Card>
                      <div className="d-flex justify-content-center">
                        <Image src={card1Img} alt="hypertension" height={450} width={400} className="figure-img img-fluid rounded"></Image>
                      </div>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="rounded-2">
                      <Image src={card2Img} alt="hypertension" height={450} width={400} className="figure-img img-fluid rounded"></Image>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="rounded-2">
                      <Image src={card3Img} alt="hypertension" height={450} width={400} className="figure-img img-fluid rounded"></Image>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white">
              <Container>
                <Row>
                  <Col md={7} className="pb-5">
                    <h2 className="align-left mbr-bold mbr-fonts-style display-2">
                      Happy to welcome you
                      to our circle of friends
                    </h2>
                  </Col>
                  <Col md={5} className="align-center pb-5 m-auto">
                    <div className="link-wrap px-5">
                      <Image src={boneImg} alt="hypertension" height={100} width={100} />
                      <h3 className="mbr-white align-left mbr-bold mbr-fonts-style display-5" />
                      Book a Tour
                    </div>
                  </Col>
                </Row>
                <Row className="media-container-row">
                  <Col md={3} className="pb-3">
                    <Card className="p-3">
                      <div className="wrap">
                        <div className="pie_progress progress1" role="progressbar">
                          <div className="undefined"
                          >
                            <svg version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 150 150">

                              <ellipse rx="51" ry="51" cx="55" cy="55" stroke="#f2f2f2" fill="none" strokeWidth="6"></ellipse>
                              <path fill="none" strokeWidth="8" stroke="url(#progress-bars2-3f-svg-gradient)" d="M75,4 A71,71 0 0 1 75.00000000000001,146" style={{ strokeDasharray: '223.084, 223.084', strokeDashoffset: 0 }}></path>
                            </svg>
                            <i className="fab fa-twitter"><Twitter /></i>
                          </div>
                        </div>
                      </div>
                      <h4 className="card-title align-center mbr-semibold pb-2 mbr-fonts-style display-7">FOOD SAFETY</h4>
                      <p className="mbr-fonts-style align-center mbr-regular card-text display-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla metus metus, ornare
                        dictum.
                      </p>
                    </Card>
                  </Col>
                  <Col md={3} className="pb-3">
                    <Card className="p-3">
                      <div className="wrap">
                        <div className="pie_progress progress1" role="progressbar">
                          <span className="fab fa-idea">idea
                          </span>
                          <div className="undefined">
                            <svg version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 150 150">
                              <ellipse rx="51" ry="51" cx="55" cy="55" stroke="#f2f2f2" fill="none" strokeWidth="6"></ellipse>
                              <path fill="none" strokeWidth="8" stroke="url(#progress-bars2-3f-svg-gradient)" d="M75,4 A71,71 0 0 1 75.00000000000001,146" style={{ strokeDasharray: '223.084, 223.084', strokeDashoffset: 0 }}></path>
                            </svg>
                          </div>
                          <h4 className="card-title align-center mbr-semibold pb-2 mbr-fonts-style display-7">ADJUSTED TEMPERATURE</h4>
                          <p className="mbr-fonts-style align-center mbr-regular card-text display-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla metus metus, ornare
                            dictum.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col md={3} className="pb-3">
                    <Card className="p-3">
                      <div className="wrap">
                        <div className="pie_progress progress1" role="progressbar">
                          <span className="fab fa-idea">idea
                          </span>
                          <div className="undefined">
                            <svg version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 150 150">
                              <ellipse rx="51" ry="51" cx="55" cy="55" stroke="#f2f2f2" fill="none" strokeWidth="6"></ellipse>
                              <path fill="none" strokeWidth="8" stroke="url(#progress-bars2-3f-svg-gradient)" d="M75,4 A71,71 0 0 1 75.00000000000001,146" style={{ strokeDasharray: '223.084, 223.084', strokeDashoffset: 0 }}></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <h4 className="card-title align-center mbr-semibold pb-2 mbr-fonts-style display-7">PET MADICAL HISTORY</h4>
                      <p className="mbr-fonts-style align-center mbr-regular card-text display-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla metus metus, ornare
                        dictum.
                      </p>
                    </Card>
                  </Col>
                  <Col md={3} className="pb-3">
                    <Card className="p-3">
                      <div className="wrap">
                        <div className="pie_progress progress1" role="progressbar">
                          <span className="fab fa-idea">idea
                          </span>
                          <div className="undefined">
                            <svg version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 150 150">
                              <ellipse rx="51" ry="51" cx="55" cy="55" stroke="#f2f2f2" fill="none" strokeWidth="6"></ellipse>
                              <path fill="none" strokeWidth="8" stroke="url(#progress-bars2-3f-svg-gradient)" d="M75,4 A71,71 0 0 1 75.00000000000001,146" style={{ strokeDasharray: '223.084, 223.084', strokeDashoffset: 0 }}></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <h4 className="card-title align-center mbr-semibold pb-2 mbr-fonts-style display-7">PLACE SPACE</h4>
                      <p className="mbr-fonts-style align-center mbr-regular card-text display-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla metus metus, ornare
                        dictum.
                      </p>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white px-5">
              <Container className="bg-white">
                <Row>
                  <Col md={4}>
                    <Card className="bg-light border">
                      <div className="px-5">
                        <div className="plan col-12 col-lg-4 ">
                          <div className="plan-header card1">
                            <h3 className="plan-title mbr-black mbr-bold pb-1 mbr-fonts-style display-7">{'PET TRAIN'}</h3>
                            <h4 className="month mbr-black mbr-bold mbr-fonts-style display-2">{'1 DAY'}</h4>
                            <div className="pt-3 pb-2">
                              <Image src={HomeImg} height={50} width={50} alt="hypertension"></Image>
                            </div></div>
                          <div className="plan-body card1">
                            <div className="plan-list">
                              {plans.map((plan, index) => (
                                <div className="plan-item d-flex justify-content-center" key={index}>
                                  <span className={`mbr-iconfont ${plan.items[index].icon}`} style={{ color: plan.items[index].iconColor, fill: plan.items[index].iconColor }}></span>
                                  <p className="mbr-fonts-style display-4">{plan.items[index].text}</p>
                                </div>
                              ))}
                            </div>
                            <div className="plan-price">
                              <span className="price-value mbr-bold mbr-fonts-style display-5">$</span>
                              <span className="price-figure mbr-bold mbr-fonts-style display-2">{'100'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className=" bg-primary border">
                      <div className="px-5 pt-5">
                        <div className="plan col-12 justify-content-center col-lg-4 ">
                          <div className="plan-header card1">
                            <h3 className="plan-title mbr-black mbr-bold pb-1 mbr-fonts-style display-7">{'PET TRAIN'}</h3>
                            <h4 className="month mbr-black mbr-bold mbr-fonts-style display-2">{'10 DAY'}</h4>
                            <div className="pd-5 pb-4">
                              <Image src={HomeImg} height={70} width={70} alt="hypertension"></Image>
                            </div></div>
                          <div className="plan-body card1">
                            <div className="plan-list">
                              {plans.map((plan, index) => (
                                <div className="plan-item d-flex justify-content-center" key={index}>
                                  <span className={`mbr-iconfont ${plan.items[index].icon}`} style={{ color: plan.items[index].iconColor, fill: plan.items[index].iconColor }}></span>
                                  <p className="mbr-fonts-style display-4">{plan.items[index].text}</p>
                                </div>
                              ))}
                            </div>
                            <div className="plan-price">
                              <span className="price-value mbr-bold mbr-fonts-style display-5">$</span>
                              <span className="price-figure mbr-bold mbr-fonts-style display-2">{'100'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="bg-light border">
                      <div className="px-5">
                        <div className="col-lg-4 ">
                          <div className="plan-header card1">
                            <h3 className="plan-title mbr-black mbr-bold pb-1 mbr-fonts-style display-7">{'PET TRAIN'}</h3>
                            <h4 className="month mbr-black mbr-bold mbr-fonts-style display-2">{'20DAY'}</h4>
                            <div className="pt-3 pb-2">
                              <Image src={HomeImg} height={50} width={50} alt="hypertension"></Image>
                            </div>
                          </div>
                          <div className="plan-body card1">
                            <div className="plan-list">
                              {plans.map((plan, index) => (
                                <div className="plan-item d-flex justify-content-center" key={index}>
                                  <span className={`mbr-iconfont ${plan.items[index].icon}`} style={{ color: plan.items[index].iconColor, fill: plan.items[index].iconColor }}></span>
                                  <p className="mbr-fonts-style display-4">{plan.items[index].text}</p>
                                </div>
                              ))}
                            </div>
                            <div className="plan-price">
                              <span className="price-value font-weight-bold lead">$</span>
                              <span className="price-figure font-weight-bold display-2">350</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white">
              <Container fluid>
                <Row >
                  <h1 className="d-flex justify-content-center">Our Pricing</h1>
                  <Col md={6} className="pt-5">
                    <div className="menu-group">
                      <div className="align-wrap align-left">
                        <div className="inline-wrap">
                          <div className="icon-wrap">
                            <span className="mbr-iconfont mbrib-home"></span>
                            <h3 className="mbr-fonts-style group-title mbr-black display-5">Basic Offer</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row menu-row">
                        <div className="col-md-12 menu-item">
                          <div className="menu-box">
                            <p className="box-text mbr-black mbr-bold mbr-fonts-style display-7 d-inline-block text-danger-50">ALL DOGS<br /></p>
                            <div className="line"></div>
                            <span className="mbr-fonts-style mbr-bold box-price mbr-black display-7">$18</span>
                          </div>
                          <h3 className="item-title mbr-fonts-style display-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper eget lectus porta euismod a libero.</h3>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="pt-5">
                    <div className="menu-group">
                      {/* Basic Offer */}
                      <div className="align-wrap align-left">
                        <div className="inline-wrap">
                          <div className="icon-wrap">
                            <span className="mbr-iconfont mbrib-home"></span>
                            <h3 className="mbr-fonts-style group-title mbr-black display-5">Basic Offer</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row menu-row">
                        {/* Menu Items */}
                        <div className="col-md-12 menu-item">
                          <div className="menu-box">
                            <p className="box-text mbr-black mbr-bold mbr-fonts-style display-7 d-inline-block">
                              Premium Offer<br /></p>
                            <div className="line"></div>
                            <span className="mbr-fonts-style mbr-bold box-price mbr-black display-7">$18</span>
                          </div>
                          <h3 className="item-title mbr-fonts-style display-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper eget lectus porta euismod a libero.</h3>
                        </div>
                        {/* More menu items */}
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="pt-5">
                    <div className="menu-group">
                      {/* Basic Offer */}
                      <div className="align-wrap align-left">
                        <div className="inline-wrap">
                          <div className="icon-wrap">
                            <span className="mbr-iconfont mbrib-home"></span>
                            <h3 className="mbr-fonts-style group-title mbr-black display-5">Basic Offer</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row menu-row">
                        {/* Menu Items */}
                        <div className="col-md-12 menu-item">
                          <div className="menu-box">
                            <p className="box-text mbr-black mbr-bold mbr-fonts-style display-7 d-inline-block">
                              Premium Offer<br /></p>
                            <div className="line"></div>
                            <span className="mbr-fonts-style mbr-bold box-price mbr-black display-7">$18</span>
                          </div>
                          <h3 className="item-title mbr-fonts-style display-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper eget lectus porta euismod a libero.</h3>
                        </div>
                        {/* More menu items */}
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="pt-5">
                    <div className="menu-group">
                      {/* Basic Offer */}
                      <div className="align-wrap align-left">
                        <div className="inline-wrap">
                          <div className="icon-wrap">
                            <span className="mbr-iconfont mbrib-home"></span>
                            <h3 className="mbr-fonts-style group-title mbr-black display-5">Basic Offer</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row menu-row">
                        {/* Menu Items */}
                        <div className="col-md-12 menu-item">
                          <div className="menu-box">
                            <p className="box-text mbr-black mbr-bold mbr-fonts-style display-7 d-inline-block">
                              Premium Offer<br /></p>
                            <div className="line"></div>
                            <span className="mbr-fonts-style mbr-bold box-price mbr-black display-7">$18</span>
                          </div>
                          <h3 className="item-title mbr-fonts-style display-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper eget lectus porta euismod a libero.</h3>
                        </div>
                        {/* More menu items */}
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="pt-5">
                    <div className="menu-group">
                      {/* Basic Offer */}
                      <div className="align-wrap align-left">
                        <div className="inline-wrap">
                          <div className="icon-wrap">
                            <span className="mbr-iconfont mbrib-home"></span>
                            <h3 className="mbr-fonts-style group-title mbr-black display-5">Basic Offer</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row menu-row">
                        {/* Menu Items */}
                        <div className="col-md-12 menu-item">
                          <div className="menu-box">
                            <p className="box-text mbr-black mbr-bold mbr-fonts-style display-7 d-inline-block">ALL DOGS<br /></p>
                            <div className="line"></div>
                            <span className="mbr-fonts-style mbr-bold box-price mbr-black display-7">$18</span>
                          </div>
                          <h3 className="item-title mbr-fonts-style display-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper eget lectus porta euismod a libero.</h3>
                        </div>
                        {/* More menu items */}
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="pt-5">
                    <div className="menu-group">
                      {/* Basic Offer */}
                      <div className="align-wrap align-left">
                        <div className="inline-wrap">
                          <div className="icon-wrap">
                            <span className="mbr-iconfont mbrib-home"></span>
                            <h3 className="mbr-fonts-style group-title mbr-black display-5">Basic Offer</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row menu-row">
                        {/* Menu Items */}
                        <div className="col-md-12 menu-item">
                          <div className="menu-box">
                            <p className="box-text mbr-black mbr-bold mbr-fonts-style display-7 d-inline-block">
                              Premium Offer<br /></p>
                            <div className="line"></div>
                            <span className="mbr-fonts-style mbr-bold box-price mbr-black display-7">$18</span>
                          </div>
                          <h3 className="item-title mbr-fonts-style display-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper eget lectus porta euismod a libero.</h3>
                        </div>
                        {/* More menu items */}
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="pt-5">
                    <div className="menu-group">
                      {/* Basic Offer */}
                      <div className="align-wrap align-left">
                        <div className="inline-wrap">
                          <div className="icon-wrap">
                            <span className="mbr-iconfont mbrib-home"></span>
                            <h3 className="mbr-fonts-style group-title mbr-black display-5">Basic Offer</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row menu-row">
                        {/* Menu Items */}
                        <div className="col-md-12 menu-item">
                          <div className="menu-box">
                            <p className="box-text mbr-black mbr-bold mbr-fonts-style display-7 d-inline-block">
                              Premium Offer<br /></p>
                            <div className="line"></div>
                            <span className="mbr-fonts-style mbr-bold box-price mbr-black display-7">$18</span>
                          </div>
                          <h3 className="item-title mbr-fonts-style display-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper eget lectus porta euismod a libero.</h3>
                        </div>
                        {/* More menu items */}
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="pt-5">
                    <div className="menu-group">
                      <div className="align-wrap align-left">
                        <div className="inline-wrap">
                          <div className="icon-wrap">
                            <span className="mbr-iconfont mbrib-home"></span>
                            <h3 className="mbr-fonts-style group-title mbr-black display-5">Basic Offer</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row menu-row">
                        <div className="col-md-12 menu-item">
                          <div className="menu-box">
                            <p className="box-text mbr-black mbr-bold mbr-fonts-style display-7 d-inline-block">
                              Premium Offer<br /></p>
                            <div className="line"></div>
                            <span className="mbr-fonts-style mbr-bold box-price mbr-black display-7">$18</span>
                          </div>
                          <h3 className="item-title mbr-fonts-style display-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper eget lectus porta euismod a libero.</h3>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white">
              <Container className="bg-danger" fluid>
                <Row>
                  <Col md={3} lg={4} className="pt-5">
                    <h1 className="flex">STEP ONE</h1>
                  </Col>
                  <Col md={3} lg={4} className="pt-5">
                    <h1 className="flex">STEP TWO</h1>
                  </Col>
                  <Col md={3} lg={4} className="pt-5">
                    <h1 className="flex">STEP THREE</h1>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white">
              <Container>
                <Row className="align-items-center">
                  <Col md={12} lg={5} className="content align-left py-4">
                    <h1 className="mbr-section-title align-left mbr-bold pb-3 display-4">
                      Marianne  Lawrence
                    </h1>
                    <p className="mbr-text pb-3 align-left display-7">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac feugiat neque. Nulla gravida sodales enim at interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    </p>
                    <Row className="gap-15 px-6 py-8 md:gap-4">
                      <Col md={3}>
                        <h6>CAT CARE</h6>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                      </Col>
                      <Col md={3}>
                        <h6>NUTRITION</h6>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                      </Col>
                      <Col md={3}>
                        <h6>FIRST AID</h6>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12} lg={5} className="content  py-4">
                    <Image src={BackgroundImg} height={550} width={690} alt="Hypertension" />
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white">
              <Container>
                <Row className="gap-15 md:gap-4">
                  <Col md={12}>
                    <h1 className="d-flex justify-content-center">Our Team</h1>
                    <Row className="gap-5">
                      <Col md={3} className="px-5">
                        <Image src={face1Img} height={350} width={300} alt="Hypertension" />
                        <h3 className="d-flex justify-content-center pt-3">Emilia</h3>
                        <p className="d-flex justify-content-center pt-3">Founder</p>
                        <button></button>
                      </Col>
                      <Col md={3} className="px-5">
                        <Image src={face2Img} height={350} width={300} alt="Hypertension" />
                      </Col>
                      <Col md={3} className="px-5">
                        <Image src={face3Img} height={350} width={300} alt="Hypertension" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className=" pt-5 bg-white">
              <Container className="pt-5">
                <Row>
                  <Col md={6}>
                    <Image src={rockImg} alt="/hypertension" height={550} width={690}></Image>
                  </Col>
                  <Col md={6} className="pt-5">
                    <h1 className="d-flex justify-content-center">Robbert salliban</h1>
                    <p className="justify-content-center mx-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, cupiditate. Dolorum nesciunt repudiandae sequi vitae aut. Cum quas nihil, quos esse tempore numquam nobis, laudantium corrupti ad molestias autem soluta.</p>
                    <Row className=" d-flex justify-content-center gap-15 px-6 py-8 md:gap-4">
                      <Col md={3}>
                        <h6>CAT CARE</h6>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                      </Col>
                      <Col md={3}>
                        <h6>NUTRITION</h6>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                      </Col>
                      <Col md={3}>
                        <h6>FIRST AID</h6>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className=" pt-5 bg-white">
              <Container>
                <Row>
                  <Col md={6} lg={5}>
                    <Card className=" border rounded">
                      <Col lg={12} md={12} sm={12}>
                        <h4 className="mbr-semibold mbr-fonts-style display-7">PLANNING A TRAINING?</h4>
                        <h5 className="mbr-bold pb-3 mbr-fonts-style display-2">Contact Us</h5>
                      </Col>
                      <Form>
                        <Row>
                          <Col lg={12} md={12} sm={12} className="pt-3 form-group">
                            <Form.Control type="text" name="name" placeholder="Name" className="form-control display-7 mx-1" />
                          </Col>
                          <Col lg={12} md={12} sm={12} className="pt-4 form-group">
                            <Form.Control type="email" name="email" placeholder="E-mail" className="form-control display-7" />
                          </Col>
                          <Col lg={12} md={12} sm={12} className="pt-4
                         form-group">
                            <Form.Control as="textarea" name="textarea" placeholder="Message" className="form-control display-7" />
                          </Col>
                          <Col className="col-auto">
                            <Button type="submit" className="btn btn-primary display-7">SEND</Button>
                          </Col>
                        </Row>
                      </Form>
                    </Card>
                  </Col>
                  <Col md={6} lg={5}>
                    <Col lg={12} md={12} sm={12}>
                      <Image src={BackgroundImg} height={550} width={710} alt="Hypertension" />
                    </Col>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="bg-white h-100 pt-5">
              <Container className=" d-flex justify-content-center">
                <Row>
                  <Col>
                    <div className="d-flex justify-content-between">
                      <Carousel pause="hover" keyboard={true} interval={2000} id="testimonials-slider1-3c-carousel">
                        <Carousel.Item>
                          <div className="carausal_image">
                            <div className="user_image">
                              <Image src={face1Img} height={200} width={200} alt="hypertension"></Image>
                            </div>
                            <     div className="user_text pb-2">
                              <p className="mbr-fonts-style mbr-regular display-5">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae itaque iste adipisci, accusamus dignissimos,Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                              </p>
                            </div>
                            <div className="card-img pb-3">
                              <span className="flame-outline text-danger"></span>
                            </div>
                            <h3 className="user_status mbr-semibold mbr-fonts-style display-4">DOG OWNER</h3>
                            <h4 className="user_name mbr-bold mbr-fonts-style display-5">Peter Ronson</h4>
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div className="carausal_image">
                            <div className="user_image">
                              <Image src={face2Img} height={200} width={200} alt="hypertension"></Image>
                            </div>
                            <div className="user_text pb-2">
                              <p className="mbr-fonts-style mbr-regular display-5 ">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae itaque iste adipisci, accusamus dignissimos,Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                              </p>
                            </div>
                            <div className="card-img pb-3">
                              <span className="mbr-iconfont mbrib-quote-left"></span>
                            </div>
                            <h3 className="user_status mbr-semibold mbr-fonts-style display-4">CAT OWNER</h3>
                            <h4 className="user_name mbr-bold mbr-fonts-style display-5">Emilia Johnson</h4>
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div className="carausal_image">
                            <div className="user_image">
                              <Image src={face3Img} height={200} width={200} alt="hypertension"></Image>
                            </div>
                            <div className="user_text pb-2">
                              <p className="mbr-fonts-style mbr-regular display-5">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae itaque iste adipisci, accusamus dignissimos,Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                              </p>
                            </div>
                            <div className="card-img pb-3">
                              <span className="mbr-iconfont mbrib-quote-left"></span>
                            </div>
                            <h3 className="user_status mbr-semibold mbr-fonts-style display-4">DOG OWNER</h3>
                            <h4 className="user_name mbr-bold mbr-fonts-style display-5">Ben Jason</h4>
                          </div>
                        </Carousel.Item>
                      </Carousel>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="bg-white h-100 pt-5">
              <Container fluid>
                <Row>
                  <Col md={8}>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12 svg-col col-lg-8">
                          <svg
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                            viewBox="0 0 600 355"
                            style={{}}
                          >
                            <path
                              fill="red"
                              d="M-12.90108,-24.49671L-33.23076,13.96482C44.79122,45.83296 142.04396,30.44834 222.8132,16.71208C303.58244,2.97582 334.35167,35.94286 352.48354,72.20659C370.61541,108.47032 384.90111,119.45933 437.64838,130.44835C490.39564,141.43736 499.18684,144.18462 518.41761,164.51429C537.64839,184.84395 539.82415,209.11209 532.41759,235.16484C525.01102,261.21758 500.81316,277.79341 491.75824,284.61539C482.70332,291.43736 462.90108,303.06814 437.91209,306.04396C412.92310,309.01978 407.40657,311.30990 353.29670,307.14286C299.18683,302.97582 292.02196,305.26594 268.68132,306.59341C245.34068,307.92088 228.85716,312.31647 172.81320,320.00879C116.76924,327.70111 84.35166,337.04177 44.79122,334.84396C5.23078,332.64615 -11.27474,328.89231 -32.96704,323.62638C-54.65933,318.36044 -31.03296,380.44836 -30.76923,380.21978C-31.03296,380.44836 152.48353,393.08572 154.68134,392.53627C156.87914,391.98682 504.68135,393.63517 504.39560,393.40659C504.68135,393.63517 659.07696,385.39341 658.79121,385.16484C659.07696,385.39341 642.59344,177.70110 644.24179,174.40439C645.89014,171.10769 638.19784,20.00878 637.09894,9.01977C636.00003,-1.96924 643.69234,-47.57364 625.56047,-48.67254C607.42860,-49.77144 280.50552,-39.33188 279.95606,-40.43078C279.40661,-41.52968 208.52748,-28.34287 153.58243,-32.18902C98.63738,-36.03518 42.04397,-29.44177 -12.90108,-24.49671z"
                              id="svg_10"
                              className=""
                            ></path>
                          </svg>
                          <div className="google-map">
                            <iframe
                              frameBorder="0"
                              style={{ border: 0 }}
                              src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:ChIJn6wOs6lZwokRLKy1iqRcoKw"
                            >
                            </iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <Card className=" border rounded">
                      <div className="card-head">
                        <Image className="rounded" src={card3Img} alt="hypertension" height={250} width={380}></Image>
                      </div>
                      <div className="align-center card-wrapper">
                        <div className="item">
                          <div className="card-img">
                            <span className="mbr-iconfont mbrib-pin"></span>
                          </div>
                          <div className="card-box">
                            <h4 className="card-title mbr-bold mbr-fonts-style display-5 ">Address</h4>
                            <p className="mbr-text pb-3 mbr-fonts-style display-4">
                              Green Meadows
                              <br />
                              Street 26
                              <br />
                              Victoria, Australia
                            </p>
                          </div>
                        </div>

                        <div className="item">
                          <div className="card-img">
                            <span className="mbr-iconfont mbrib-alert"></span>
                          </div>
                          <div className="card-box">
                            <h4 className="card-title mbr-bold mbr-fonts-style display-5">Telephone</h4>
                            <p className="mbr-text pb-3 mbr-fonts-style display-4">
                              +971 2 3843847
                              <br />
                              +971 4 2848849
                              <br />
                              +971 6 2845848&nbsp;
                              <br />
                            </p>
                          </div>
                        </div>
                        <div className="item">
                          <div className="card-img">
                            <span className="mbr-iconfont mbrib-letter"></span>
                          </div>
                          <div className="card-box">
                            <h4 className="card-title mbr-bold mbr-fonts-style display-5">E-mail</h4>
                            <p className="mbr-text pb-3 mbr-fonts-style display-4">support@mobirise.com</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white">
              <Container fluid>
                <Row>
                  <Col md={12}>
                    <Col md={4} lg={5}>
                    </Col>
                    <Col md={4} lg={5}>
                    </Col>
                    <Col md={4} lg={5}>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="pt-5 bg-white">
              <Container className="d-flex justify-content-center" fluid>
              </Container>
            </section>
          </section>
        )
        }
      </main>
    </Layout>
  );
};

export default IndexPage;
