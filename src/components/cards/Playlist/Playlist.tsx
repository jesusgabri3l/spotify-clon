import { Link } from "react-router-dom";
import { Playlist as PlaylistModel } from "./PlaylistModel";
const Playlist = ({ playlist }: { playlist: PlaylistModel }) => {
  return (
    <Link to={`/playlist/${playlist.id}`} className="card p-4">
      <img
        className="card__image"
        src={playlist.images && playlist.images[0].url}
      />
      <p className="card__name font-medium mt-5 text-base truncate">
        {playlist.name}
      </p>
      <p className="text-gray text-xs font-normal mt-2">
        by {playlist.owner.display_name}
      </p>
    </Link>
  );
};

export default Playlist;
