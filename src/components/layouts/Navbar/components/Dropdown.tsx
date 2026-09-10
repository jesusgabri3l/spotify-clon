import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { UserStoreImpl } from "../../../../store/UserStore";

interface Props {
  active: boolean;
  UserStore: UserStoreImpl;
}
const Dropdown = ({ active, UserStore }: Props): ReactElement => {
  const Logout = (): void => {
    UserStore.Logout();
    location.reload();
  };
  return (
    <div className={`navigator__dropdown ${active && "active"}`}>
      <ul className="navigator__dropdown__playlists">
        <li className="navigator__dropdown__list__item" key="me">
          <Link
            to="/playlist/me"
            className="navigator__dropdown__list__button navigator__dropdown__list__button--liked"
          >
            <span className="navigator__dropdown__list__cover navigator__dropdown__list__cover--liked">
              <i className="fa fa-heart" aria-hidden="true" />
            </span>
            Liked tracks
          </Link>
        </li>
        {UserStore.user.playlists && UserStore.user.playlists.length > 0 ? (
          UserStore.user.playlists.map((playlist: any) => (
            <li className="navigator__dropdown__list__item" key={playlist.id}>
              <Link
                to={`/playlist/${playlist.id}`}
                className="navigator__dropdown__list__button"
              >
                {playlist.images?.[0]?.url ? (
                  <img
                    src={playlist.images[0].url}
                    alt=""
                    className="navigator__dropdown__list__cover"
                  />
                ) : (
                  <span className="navigator__dropdown__list__cover navigator__dropdown__list__cover--empty">
                    <i className="fa fa-music" aria-hidden="true" />
                  </span>
                )}
                <span className="navigator__dropdown__list__name">
                  {playlist.name}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <p className="navigator__dropdown__empty">
            You have no playlists yet
          </p>
        )}
      </ul>
      <hr className="navigator__dropdown__divider" />
      <ul className="navigator__dropdown__list">
        <li className="navigator__dropdown__list__item">
          <Link to="/" className="navigator__dropdown__list__button">
            <i className="fa fa-user" aria-hidden="true" />
            Profile
          </Link>
        </li>
        <li className="navigator__dropdown__list__item">
          <button
            className="navigator__dropdown__list__button navigator__dropdown__list__button--danger"
            onClick={Logout}
          >
            <i className="fa fa-sign-out-alt" aria-hidden="true" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
