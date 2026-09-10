import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PropsObserver } from "../../../../models/GlobalModels";
import { RESTRICTED_TOOLTIP } from "../../../../utils/restrictionMessage";

const PlaylistsLinks = ({ UserStore }: PropsObserver): ReactElement => {
  const isLoggedIn = !!UserStore.getAccessToken();

  return (
    <div className="navigator__playlists hidden xl:flex">
      {isLoggedIn ? (
        <Link to="/playlist/me" className="navigator__playlists__liked">
          <span className="navigator__playlists__liked__icon">
            <i className="fa fa-heart" />
          </span>
          Tracks you like
        </Link>
      ) : (
        <span
          className="navigator__playlists__liked navigator__playlists__liked--disabled"
          data-tooltip={RESTRICTED_TOOLTIP}
          tabIndex={0}
        >
          <span className="navigator__playlists__liked__icon">
            <i className="fa fa-heart" aria-hidden="true" />
          </span>
          Tracks you like
          <i
            className="fa fa-info-circle navigator__playlists__liked__info"
            aria-hidden="true"
          />
        </span>
      )}
      <p className="navigator__playlists__title">Your playlists</p>
      <ul className="navigator__playlists__list">
        {!isLoggedIn ? (
          <p className="navigator__playlists__empty">
            Log in to see your playlists
          </p>
        ) : UserStore.user.playlists && UserStore.user.playlists.length > 0 ? (
          UserStore.user.playlists.map((playlist: any) => (
            <li key={playlist.id}>
              <Link to={`/playlist/${playlist.id}`}>
                {playlist.images?.[0]?.url ? (
                  <img
                    src={playlist.images[0].url}
                    alt=""
                    className="navigator__playlists__list__cover"
                  />
                ) : (
                  <span className="navigator__playlists__list__cover navigator__playlists__list__cover--empty">
                    <i className="fa fa-music" aria-hidden="true" />
                  </span>
                )}
                <span className="navigator__playlists__list__name">
                  {playlist.name}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <p className="navigator__playlists__empty">
            You have no playlists yet
          </p>
        )}
      </ul>
    </div>
  );
};

export default PlaylistsLinks;
