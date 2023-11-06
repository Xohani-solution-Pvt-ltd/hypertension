import React, { useContext, useEffect } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

import { AuthContext } from "../context/authentication";
import Loading from "./Loading";

import { LayoutProps } from "../interfaces/index";
import { Container } from "react-bootstrap";

const Layout = ({
  children,
  title = "This is the default title",
}: LayoutProps) => {
  const router = useRouter();
  const { loading, isAuthenticated } = useContext(AuthContext);

  return (
    <>
    <Container>
      <Header />
      {children}
      {/* {loading === true || isAuthenticated === null ? (
        <Loading />
      ) : (
        <div className="min-h-[30rem]">{children}</div>
      )} */}
      <Footer />
      </Container>
    </>
  );
};

const StaticLayout = ({
  children,
  title = "This is the default title",
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
};
export { StaticLayout }
export default Layout;
