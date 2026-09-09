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
      <ul className="overflow-auto block h-2/3 block xl:hidden">
        <li className="navigator__dropdown__list__item w-full text-xs" key="me">
          <Link
            to="/playlist/me"
            className="navigator__dropdown__list__button block p-3 text-left"
          >
            Liked tracks
          </Link>
        </li>
        {UserStore.user.playlists && UserStore.user.playlists.length > 0 ? (
          UserStore.user.playlists.map((playlist: any) => (
            <li
              className="navigator__dropdown__list__item w-full text-xs"
              key={playlist.id}
            >
              <Link
                to={`/playlist/${playlist.id}`}
                className="navigator__dropdown__list__button block p-3 text-left truncate text-xs"
              >
                {playlist.name}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-xs text-left p-3">You have no playlists yet</p>
        )}
      </ul>
      <hr className="block xl:hidden mt-4" />
      <ul className="navigator__dropdown__list w-full block">
        <li className="navigator__dropdown__list__item w-full text-sm">
          <Link
            to="/"
            className="navigator__dropdown__list__button block p-3 text-left"
          >
            Profile
          </Link>
        </li>
        <li className="navigator__dropdown__list__item w-full text-sm">
          <button
            className="navigator__dropdown__list__button block p-3 w-full text-left"
            onClick={Logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
