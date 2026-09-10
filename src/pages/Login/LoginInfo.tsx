import { ReactElement } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/auth";

// Standalone screen (no Navbar - rendered outside <Layout>). Reached from
// the profile button instead of firing Spotify's OAuth screen directly: a
// random visitor clicking "Log in" would otherwise just hit a dead end
// (Spotify's Development Mode only allows a handful of approved accounts),
// so this frames the app as the portfolio demo it is instead of pretending
// to be a real product - the "Log in with Spotify" button still works for
// whoever IS approved.
const LoginInfo = (): ReactElement => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-0 md:p-20 lg:p-5">
      <div className="element_wrapper w-full flex flex-col justify-center items-center py-12 px-5 md:w-11/12 md:px-16 lg:w-1/2 lg:px-28">
        <span className="login-mark">
          <i className="fab fa-spotify" aria-hidden="true" />
        </span>
        <p className="text-l text-center mt-5 md:text-xl md:mt-10 lg:text-xl lg:mt-12">
          This is a portfolio demo built on Spotify&apos;s Web API.
        </p>
        <button
          onClick={() => void auth.sendRequestToAuth()}
          className="button button--primary w-full mt-12 md:text-xl lg:text-xl"
        >
          <i className="fab fa-spotify mr-2" aria-hidden="true" />
          Log in with Spotify
        </button>
        <p className="text-gray text-xs text-center mt-4">
          Note: Spotify only allows a handful of approved accounts on demo
          apps like this one, so this likely won&apos;t work unless
          you&apos;re one of them.
        </p>
        <Link to="/search" className="text-gray text-sm underline mt-6">
          Continue without an account
        </Link>
      </div>
    </div>
  );
};

export default LoginInfo;
