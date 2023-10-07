import React, { useContext, useState } from "react";
import { Container, Nav, NavLink, Navbar } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import DownloadseconadryImg from "../assets/images/Downloadseconadry.png";

import { MenuBarSVG } from "../assets/SVG/image";
import NextImgLogo from "../assets/images/lock-dark-64.png";

import { APP_INFO } from "../environments/index";
import { AuthContext } from "../context/authentication";
import useRouter from "next/router";

import notify from "../helpers/notify";

export default function Header() {
  const { TITLE } = APP_INFO;
  const [toggle, setToggle] = useState(false);
  const { isAuthenticated, LogoutUser, router } = useContext(AuthContext);
  const handleToggle = () => {
    setToggle(!toggle);
    router.push("/home");
  };

  const handleLogout = () => {
    router.push("/home");
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
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={toggle ? "show" : "d-flex justify-content-end"}
          >
            <Nav className="ml-auto nav-link text-black display-4">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              {/* {(isAuthenticated) ? <>
                <Nav.Link href="/dashboard" className="nav-link">
                  Dashboard
                </Nav.Link> 
                 <Nav.Link onClick={() => { LogoutUser(); }} className="nav-link" href="/" > Logout
                </Nav.Link> 
              </>
                : <>
                  <Nav.Link href="/login" className="nav-link">
                    Login
                  </Nav.Link><>
                    <Nav.Link href="/signup" className="nav-link">
                      Signup
                    </Nav.Link></>
                </>
              } */}
              {isAuthenticated ? (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link text-black display-4"
                      href="/dashboard"
                      aria-expanded="false"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link text-black display-4"
                      href="/login"
                      aria-expanded="false"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link text-black display-4"
                      href="/signup"
                      aria-expanded="false"
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      {/* <Container>
        <Navbar className=" fixed-top flex items-center justify-between px-4">
          <Navbar.Brand href="/">
            <Image
              className="navbar-logo"
              src={NextImgLogo}
              height={35}
              width={35}
              alt={`Logo | ${TITLE}`}
            />
          </Navbar.Brand>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li className="nav-item">
                <NavLink className="nav-link text-black display-4" href="/" aria-expanded="false">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link text-black display-4" href="/about" aria-expanded="false">
                  About
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link text-black display-4" href="/contact" aria-expanded="false">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link text-black display-4" href="/createProfile" aria-expanded="false">
                  UserProfile
                </NavLink>
              </li>
              {(isAuthenticated) ? <>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link text-black display-4" href="/dashboard" aria-expanded="false">
                    Dashboard
                  </NavLink>
                </li></> : <>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link text-black display-4" href="/login" aria-expanded="false">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link text-black display-4" href="/signup" aria-expanded="false">
                    Signup
                  </NavLink>
                </li>
              </>}
            </ul>
          </div>
        </Navbar>
      </Container> */}
    </section>
  );
}
{
  /* <Container>
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
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link href="/contact">Contact</Nav.Link>
       <NavLink className="nav-link text-black display-4" href="/createProfile" aria-expanded="false">
         UserProfile
         </NavLink>
      {(isAuthenticated) ? <>
        <Nav.Link href="/users" className="nav-link">
          Dashboard
        </Nav.Link>
        <Nav.Link onClick={() => { LogoutUser(); }} className="nav-link" > Logout
        </Nav.Link>
      </> : <>
        <Nav.Link href="/login" className="nav-link">
          Login
        </Nav.Link>
        <Nav.Link href="/signup" className="nav-link">
          Signup
        </Nav.Link>
      </>
      }
    </Nav>
  </Navbar.Collapse>
</Navbar>
</Container> */
}
