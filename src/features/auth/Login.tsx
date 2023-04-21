import { SyntheticEvent, useRef, useState } from "react";
import LogoImage from "../../assets/logo.png";
import axios from "axios";

import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [isNewUser, setIsNewUser] = useState(false);

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPwd, setIsPwd] = useState(true);
  const [isRePwd, setIsRePwd] = useState(true);
  const [email, setEmail] = useState<string>();
  //   const [refRePassword, setRefRePassword] = useState<QInput | null>(null);
  const refEmail = useRef();
  const [newUser, setNewUser] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [disableLetMeIn, setDisableLetMeIn] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const confirmRef = useRef();

  const [store, setStore] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const command = "login";

    axios.defaults.baseURL = "https://stockdiv.com:8445/api";

    if (!isNewUser) {
      try {
        const data = await login({
          email: email?.toLowerCase(),
          password,
          confirmationCode: codeSent ? confirmationCode : undefined,
        }).unwrap();

        dispatch(setCredentials({ user: email, accessToken: data.token }));
        setEmail("");
        setPassword("");
        navigate("/mainLayout");
      } catch (error) {
        console.log(error);
        // todo:30:06
      }

      // axios
      //   .post(`user/${command}`, {
      //     email: email?.toLowerCase(),
      //     password: password,
      //     confirmationCode: codeSent ? confirmationCode : undefined,
      //   })
      //   .then((response) => {
      //     if (response.data.result || response.data.token) {
      //       if (response.data.result) {
      //         setCodeSent(true);
      //         setTimeout(() => {
      //           //confirmationCodeRef?.focus(); //field where user enter confirmation code sent via email
      //         }, 500);
      //       } else {
      //         setStore((prev) => ({ ...prev, token: response.data.token }));
      //         dispatch(
      //           setCredentials({
      //             user: email,
      //             accessToken: response.data.token,
      //           })
      //         );
      //       }
      //     } else {
      //       //   showNotification(
      //       //     response.data.error
      //       //       ? response.data.error
      //       //       : 'Oops, there was a problem'
      //       //   );
      //     }
      //   })
      //   .catch((err) => {
      //     //showAPIError(err);
      //     console.error(err);
      //   })
      //   .finally(() => {
      //     setDisableLetMeIn(false);
      //   });
    } else {
      //login
    }
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
                    type="confirm"
                    name="confirm"
                    id="confirm"
                    placeholder=" Confirm Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div> */}
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
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
