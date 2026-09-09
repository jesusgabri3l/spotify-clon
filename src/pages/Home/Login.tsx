import { ReactElement } from "react";
import auth from "../../services/auth";
import illustration from "../../assets/images/home_illustration.svg";

const Login = (): ReactElement => {
  const sendRequestToSpotify = (): void => {
    void auth.sendRequestToAuth();
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-0 md:p-20 lg:p-5">
      <div className="element_wrapper w-full flex flex-col justify-center items-center py-12 px-5 md:w-11/12 md:px-16 lg:w-1/2 lg:px-28">
        <img
          src={illustration}
          alt="Illustration"
          className="w-72 h-72 lg:w-80 lg:h-80"
        />
        <p className="text-l text-center text-gray mt-5 md:text-xl md:mt-10 lg:text-xl lg:mt-12">
          Hey, Welcome back! Here you can find your favourite music directly
          from Spotify!
        </p>
        <button
          onClick={sendRequestToSpotify}
          className="button button--primary w-full mt-12 md:text-xl lg:text-xl "
        >
          Login to Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
