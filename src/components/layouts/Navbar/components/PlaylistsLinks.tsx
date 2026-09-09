import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PropsObserver } from "../../../../models/GlobalModels";

const PlaylistsLinks = ({ UserStore }: PropsObserver): ReactElement => {
  return (
    <ul className="overflow-auto h-3/5 pt-6 hidden xl:block">
      <li
        className="mb-6 block text-sm text-gray-400 hover:underline hover:text-white"
        key="me"
      >
        <Link to="/playlist/me">Tracks you like</Link>
      </li>
      {UserStore.user.playlists && UserStore.user.playlists.length > 0 ? (
        UserStore.user.playlists.map((playlist: any) => (
          <li
            className="mb-6 block text-sm text-gray-400 hover:underline hover:text-white"
            key={playlist.id}
          >
            <Link
              to={`/playlist/${playlist.id}`}
              className="block text-left truncate"
            >
              {playlist.name}
            </Link>
          </li>
        ))
      ) : (
        <p className="text-xs">You have no playlists yet</p>
      )}
    </ul>
  );
};

export default PlaylistsLinks;
