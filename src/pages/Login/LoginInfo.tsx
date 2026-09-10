import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../services/auth";

// Reached from the profile button instead of firing Spotify's OAuth screen
// directly - a random visitor clicking "Log in" would otherwise just hit a
// dead end (Spotify's Development Mode only allows a handful of approved
// accounts). This explains that up front and points them at what they can
// still do, while the real "Log in with Spotify" button below still works
// for whoever IS on that approved list.
const LoginInfo = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full px-6 md:px-12 pt-16">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-3 md:text-4xl">
          You won&apos;t be able to log in here
        </h1>
        <p className="text-gray mb-6">
          Spotify only allows a handful of approved accounts on this app
          (it&apos;s running in what Spotify calls Development Mode), so
          logging in with your own Spotify account isn&apos;t possible for
          most visitors right now.
        </p>
        <p className="text-gray mb-1">Without logging in you can still:</p>
        <ul className="text-gray mb-6" style={{ listStyle: "disc", paddingLeft: "1.25rem" }}>
          <li>Search for any artist, album, track, or playlist</li>
          <li>Browse an artist&apos;s profile and full discography</li>
          <li>Open an album and see its tracklist</li>
        </ul>
        <button
          className="button button--primary"
          onClick={() => navigate("/search")}
        >
          <i className="fa fa-search mr-2" aria-hidden="true" />
          Start searching
        </button>
      </div>

      <hr className="hr my-10 max-w-xl" />

      <div>
        <h2 className="text-xl font-bold mb-3 md:text-2xl">
          Approved test account? Log in below.
        </h2>
        <button
          className="button button--primary"
          onClick={() => void auth.sendRequestToAuth()}
        >
          <i className="fab fa-spotify mr-2" aria-hidden="true" />
          Log in with Spotify
        </button>
      </div>
    </div>
  );
};

export default LoginInfo;
