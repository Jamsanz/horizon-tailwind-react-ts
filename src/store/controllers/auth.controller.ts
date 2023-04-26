import { AxiosError } from "axios";
import { Dispatch } from "react";
import { IAuth, IUser } from "../../interfaces/user.interface";
import { AsyncSaveItem, http } from "../../utils";
import {
  authenticate,
  authenticated,
  authenticationError,
} from "../slices/auth.slice";
import { login } from "../slices/authFlow.slice";
import { signUp, signUpError, signUpSuccessful } from "../slices/signUp.slice";
import { toast } from "react-toastify";


export const authController =
  (auth: IAuth, callback: ()=> void) => async (dispatch: Dispatch<any>) => {
    if (auth.email === "" || auth.password === "") {
      dispatch(authenticationError("please fill fields"));
      return;
    }

    dispatch(authenticate());

    try {
      const response = await http.post("/login", auth);
      if (
        !(response.data.data.role.includes("ADMIN") ||
        response.data.data.role.includes("SUPER_ADMIN"))
      ) {
        throw new Error("Unauthorized, Access Denied!");
      }
      dispatch(authenticated(response.data.data));
      window.localStorage.setItem("token", response.data.token);
      AsyncSaveItem("user", response.data.data);
      dispatch(login());
      callback()
    } catch (error) {
      console.log(error);
      dispatch(
        authenticationError(
          ((error as AxiosError)?.response?.data as any)?.message ?? (error as any )?.message
        )
      );
      toast.error(((error as AxiosError)?.response?.data as any)?.message ?? (error as any )?.message)
    }
  };

export const signUpController =
  (user: IUser) => async (dispatch: Dispatch<any>) => {
    if (user?.name === undefined || user?.name === "") {
      alert("Please enter your name");
      return;
    }
    if (user?.email === undefined || user?.email === "") {
      alert("Please enter your name");
      return;
    }
    if (user?.phone === undefined || user?.phone === "") {
      alert("Please enter your name");
      return;
    }

    dispatch(signUp());

    try {
      const response = await http.post("/signup", user);
      (http.defaults.headers as any)[
        "Authorization"
      ] = `Bearer ${response.headers["token"]}`;
      dispatch(signUpSuccessful(response.data.data));
      AsyncSaveItem("token", response.headers["token"]);
      AsyncSaveItem("user", response.data.data);
      alert('Registration Successful');
      // dispatch(login());
    } catch (error) {
      dispatch(
        signUpError(((error as AxiosError).response?.data as any).message)
      );
      console.log(error);
      console.log(((error as AxiosError).response?.data as any).message);
    }
  };
