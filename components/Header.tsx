import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
// import DownloadseconadryImg from '../assets/images/Downloadseconadry.png'
import logo3 from "../assets/images/logo3.png";
import { APP_INFO } from "../environments/index";
import { AuthContext } from "../context/authentication";

export default function Header({}) {
  const { TITLE } = APP_INFO;
  const [toggle, setToggle] = useState(false);
  const { isAuthenticated, LogoutUser, router } = useContext(AuthContext);
  const handleToggle = () => {
    setToggle(!toggle);
    router.push("/");
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <section>
      <Container fluid>
        <Navbar className=" fixed-top flex items-center justify-between bg-light px-4">
          {/* <Navbar.Brand href="/">
            <Image
              className="pr-2"
              src={DownloadseconadryImg}
              height={35}
              width={35}
              alt={`Logo | ${TITLE}`}
            />
          </Navbar.Brand>  */}
          <Navbar.Brand href="/">
            <Image
              className="pr-2"
              src={logo3}
              height={35}
              width={35}
              alt={`Logo | ${TITLE}`}
            />
          </Navbar.Brand>
          <h4 className=" text-2xl font-semibold text-danger-emphasis">
            My BP Coach
          </h4>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={toggle ? "show" : "d-flex justify-content-end"}
          >
            <Nav className="ml-auto">
              <Nav.Link href="/" className="mouse-hover">
                Home
              </Nav.Link>
              <Nav.Link href="/about" className="mouse-hover">
                About
              </Nav.Link>
              <Nav.Link href="/contact" className="mouse-hover">
                Contact
              </Nav.Link>
              {isAuthenticated ? (
                <>
                  <Nav.Link href="/users" className="nav-link mouse-hover">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      LogoutUser();
                    }}
                    className="nav-link mouse-hover"
                    href="/"
                  >
                    {" "}
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login" className="nav-link mouse-hover">
                    Login
                  </Nav.Link>
                  {/* <Nav.Link href="/login" className="nav-link mouse-hover" /> */}
                  <>
                    <Nav.Link href="/signup" className="nav-link mouse-hover">
                      Signup
                    </Nav.Link>
                  </>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </section>
  );
}
