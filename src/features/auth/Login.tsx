import { SyntheticEvent, useRef, useState } from "react";
import LogoImage from "../../assets/logo.png";
import axios from "axios";

import { useLoginMutation, useRegisterMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

import { useNavigate } from "react-router-dom";
import {
  showAPIError,
  showNotification,
  validateEmail,
} from "../../utils/utils";
import {
  useForgotPasswordMutation,
  usersApiSlice,
} from "../users/usersApiSlice";

export default function Login() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [forgotPassword] = useForgotPasswordMutation();

  const dispatch = useDispatch();

  const [isNewUser, setIsNewUser] = useState(false);

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPwd, setIsPwd] = useState(true);
  const [isRePwd, setIsRePwd] = useState(true);
  const [email, setEmail] = useState<string>();
  const [newUser, setNewUser] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [disableLetMeIn, setDisableLetMeIn] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  const rePasswordRef = useRef(null);
  const emailRef = useRef(null);
  const refConfirmationCode = useRef(null);
  const confirmationCodeRef = useRef(null);

  const navigate = useNavigate();

  const letMeIn = async () => {
    if (forgotPasswordMode) {
      // this.$q
      //   .dialog({
      //     position: "bottom",
      //     title: "Change password",
      //     message: "Your new password",
      //     prompt: {
      //       model: "",
      //       isValid: (val: string) => val.length > 7,
      //       type: "password",
      //     },
      //   })
      //   .onOk((newPassword: string) => {
      //     processForgotPassword(newPassword);
      //   });
    } else if (!validateEmail(email)) {
      showNotification("Invalid email");
    } else if (password.length < 8) {
      showNotification("Password must have at least 8 characters");
    } else if (isNewUser && password !== rePassword) {
      showNotification("Passwords do not match");
    } else {
      setDisableLetMeIn(true);
      if (codeSent || !isNewUser) {
        try {
          const data = await login({
            email: email?.toLowerCase() ?? "",
            password,
            confirmationCode: codeSent ? confirmationCode : undefined,
          }).unwrap();

          dispatch(setCredentials({ user: email, accessToken: data.token }));
          setEmail("");
          setPassword("");
          navigate("/mainLayout");
        } catch (error) {
          showAPIError(error);
        }
      } else {
        await register({
          email: email?.toLowerCase() ?? "",
          password,
          confirmationCode: codeSent ? confirmationCode : undefined,
        })
          .unwrap()
          .then((response) => {
            if (response.result || response.token) {
              if (response.result) {
                setCodeSent(true);
                setTimeout(() => {
                  confirmationCodeRef?.current?.focus();
                }, 500);
              } else {
                dispatch(
                  setCredentials({
                    user: email,
                    accessToken: response.data.token,
                  })
                );
                //bus.emit("transactionChange");
              }
            } else {
              showNotification(
                response.data.error
                  ? response.data.error
                  : "Oops, there was a problem"
              );
            }
          })
          .catch((error) => {
            showAPIError(error);
          })
          .finally(() => {
            setDisableLetMeIn(false);
          });
      }
    }
  };

  const handleForgotPassword = () => {
    if (!validateEmail(email)) {
      showNotification("Invalid email");
      emailRef?.current?.focus();
    } else {
      processForgotPassword("xxx");
    }
  };

  const processForgotPassword = async (password: string) => {
    setDisableLetMeIn(true);

    await forgotPassword({
      email: email?.toLowerCase() ?? "",
      password,
      confirmationCode: codeSent ? confirmationCode : undefined,
    })
      .unwrap()
      .then((response) => {
        console.log(111);
        console.log(response);

        if (response.data.result) {
          if (!confirmationCode) {
            setCodeSent(true);
            setForgotPasswordMode(true);
            setTimeout(() => {
              refConfirmationCode?.current?.focus();
            }, 500);
          } else {
            setCodeSent(false);
            setPassword(password);
            setForgotPasswordMode(false);
            letMeIn();
          }
        } else {
          showNotification(
            response.data.error
              ? response.data.error
              : "Oops, there was a problem"
          );
        }
      })
      .catch((err) => {
        showAPIError(err);
      })
      .finally(() => {
        setDisableLetMeIn(false);
      });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    letMeIn();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img src={LogoImage} alt="logo" style={{ width: "400px" }} />
            <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Your portfolio. Your income.
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isNewUser && (
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    ref={rePasswordRef}
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder=" Confirm Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center mb-4">
                  <input
                    id="new-user"
                    type="checkbox"
                    checked={isNewUser}
                    onChange={() => setIsNewUser((prev) => !prev)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="new-user"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    New User
                  </label>
                </div>
                <a
                  onClick={handleForgotPassword}
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              {codeSent && (
                <div>
                  <label
                    htmlFor="confirmationCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    A confirmation code was sent to your email
                  </label>
                  <input
                    ref={confirmationCodeRef}
                    type="text"
                    name="confirmationCode"
                    id="confirmationCode"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                </div>
              )}

              <button
                disabled={disableLetMeIn}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                LET ME IN
              </button>
              <div className="flex flex-row justify-between">
                <a href="#" className="text-sm font-medium">
                  Privacy policy
                </a>
                <a href="#" className="text-sm font-medium ">
                  Disclaimer
                </a>
                <a href="#" className="text-sm font-medium ">
                  Why email?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
