import React from "react";
import { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.css'
import AuthState from "../context/authentication";
import '../pages/css/style.css'

import { ToastContainer } from "react-toastify";
import "../styles/notify.css";
import "../styles/theme.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthState>
      <div>
      <Component {...pageProps} />
      </div>
      <ToastContainer />
    </AuthState>
  );
}

export default MyApp;
