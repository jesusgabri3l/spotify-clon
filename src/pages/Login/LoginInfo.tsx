import { ReactElement } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/auth";
import illustration from "../../assets/images/home_illustration.svg";

// Standalone screen (no Navbar - rendered outside <Layout>), matching the
// original centered-card login look. Reached from the profile button
// instead of firing Spotify's OAuth screen directly: a random visitor
// clicking "Log in" would otherwise just hit a dead end (Spotify's
// Development Mode only allows a handful of approved accounts), so this
// explains that briefly as a small note rather than a wall of text - the
// real "Log in with Spotify" button still works for whoever IS approved.
const LoginInfo = (): ReactElement => {
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
          onClick={() => void auth.sendRequestToAuth()}
          className="button button--primary w-full mt-12 md:text-xl lg:text-xl"
        >
          Login to Spotify
        </button>
        <p className="text-gray text-xs text-center mt-4">
          Note: Spotify only allows a handful of approved accounts on this
          app, so this likely won&apos;t work unless you&apos;re one of them.
        </p>
        <Link to="/search" className="text-gray text-sm underline mt-6">
          Continue without an account
        </Link>
      </div>
    </div>
  );
};

export default LoginInfo;
