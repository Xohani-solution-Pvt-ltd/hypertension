import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Diagnosis from "../components/diagnosis/Diagnosis";
import { getToken, removeToken, setToken } from "../helpers/index";
import { User } from "../interfaces/index";
import notify from "../helpers/notify";

import {
  getUserDetailsAPI,
  createUserAPI,
  loginUserAPI,
  createProfileAPI,
  profileAPIData,
} from "../services/call";
import { getCookie } from "cookies-next";

const AuthContext = createContext(null);

const AuthState = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(true);
  const [userInfo, setUserInfo] = useState<User>({
    _id: "",
    fullName: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    if (isAuthenticated === false) {
      LogoutUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    VerifyUser();
    setLoading(false);
  }, [1]);

  const LoginToAccount = async (body) => {
    const [data, err] = await loginUserAPI(body);
    if (data?.success === true) {
      console.log("Successfully Login user with ID:", data?.data._id);
      console.log("Succesfully Login user");
      setIsAuthenticated(true);
      setUserInfo(data?.data);
      setToken(data?.token);

      notify.success("Succesfully Login");

      if (data) {
        const id = data?.data._id;
        const [idData, errs] = await profileAPIData(id);

        if (idData != null) {
          if (
            idData?.data.dateOfBirth &&
            idData?.data.address &&
            idData?.data.gender
          ) {
            router.push("/dashboard");
          } else {
            router.push("/createProfile");
          }
        } else {
          router.push("/createProfile");
        }
      }

      return null;
    } else if (err) {
      console.log(err?.message);
      notify.error(err?.message);
      return err;
    }
  };

  const CreateAccount = async (body) => {
    const [data, err] = await createUserAPI(body);
    if (data?.success === true) {
      console.log("Account Created Succesfully user!");
      router.push("/login");
      notify.success("Account Created Succesfully user!");
      return null;
    } else if (err) {
      console.log(err?.message);
      notify.error(err?.message);
      return err;
    }
  };

  const CreateProfile = async (body) => {
    const [data, err] = await createProfileAPI(body);
    if (data?.success === true) {
      console.log("Profile Created Succesfully!");
      router.push("/dashboard");
      notify.success("Profile Created Succesfully!");
      return null;
    } else if (err) {
      console.log(err?.message);
      notify.error(err?.message);
      return err;
    }
  };

  const VerifyUser = async () => {
    if (!getToken()) {
      setIsAuthenticated(false);
      return;
    }
    const app = 90;
    const [data, err] = await getUserDetailsAPI();
    if (data?.success === true) {
      setIsAuthenticated(true);
      console.log(data.data);
      setUserInfo(data?.data);
    } else if (err) {
      console.log(err?.message);
      notify.error(err?.message);
      LogoutUser();
    }
  };

  const LogoutUser = () => {
    setIsAuthenticated(false);
    setUserInfo({
      _id: "",
      fullName: "",
      mobile: "",
      email: "",
    });
    removeToken();
    console.log("log out user successfully");
  };
  return (
    <AuthContext.Provider
      value={{
        router,
        userInfo,
        loading,
        setLoading,
        isAuthenticated,
        setUserInfo,
        VerifyUser,
        LoginToAccount,
        CreateProfile,
        CreateAccount,
        LogoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
export { AuthContext };
