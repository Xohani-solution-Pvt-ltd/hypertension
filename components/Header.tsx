import React, { useContext, useState } from "react";
import { Container, Nav, NavLink, Navbar } from "react-bootstrap";
import Image from "next/image";
import DownloadseconadryImg from "../assets/images/Downloadseconadry.png";
import { APP_INFO } from "../environments/index";
import { AuthContext } from "../context/authentication";

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

              {(isAuthenticated) ? <>
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
                    </NavLink>
                  </li>
                </>

              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </section>
  );
}
