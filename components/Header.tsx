import React, { useContext, useState } from "react";
import { Container, Nav, NavLink, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import DownloadseconadryImg from '../assets/images/Downloadseconadry.png'

import { MenuBarSVG } from "../assets/SVG/image";
import NextImgLogo from "../assets/images/lock-dark-64.png";

import { APP_INFO } from "../environments/index";
import { AuthContext } from "../context/authentication";
import useRouter from 'next/router';

import notify from "../helpers/notify";

export default function Header() {
  const { TITLE } = APP_INFO;
  const [toggle, setToggle] = useState(false);
  const { isAuthenticated, LogoutUser, router } = useContext(AuthContext);
  const handleToggle = () => {
    setToggle(!toggle);
    router.push('/home');
  };


  return (
    <section className="menu cid-rGtBGu0BpJ" id="menu1-1a">
      <Container>
        <Navbar className=" fixed-top flex items-center justify-between px-4">
          <Navbar.Brand href="/">
            <Image
              className="pr-2"
              src={DownloadseconadryImg}
              height={35}
              width={35}
              alt={`Logo | ${TITLE}`}
            />
          </Navbar.Brand>
          <h4 className=" text-2xl font-semibold text-danger-emphasis">
            HYPERTENSION
          </h4>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="basic-navbar-nav" className={toggle ? 'show' : 'd-flex justify-content-end'}>
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {(isAuthenticated) ? <>
                <Nav.Link href="/users" className="nav-link">
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => { LogoutUser(); }} className="nav-link" href="/" > Logout
                </Nav.Link>
              </>
                : <>
                  <Nav.Link href="/login" className="nav-link">
                    Login
                  </Nav.Link>
                  <>
                    <Nav.Link href="/signup" className="nav-link">
                      Signup
                    </Nav.Link></>
                </>

              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </section>
  );
}
