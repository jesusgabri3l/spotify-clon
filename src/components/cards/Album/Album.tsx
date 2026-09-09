import { Link } from "react-router-dom";
import { getAlbumReleaseDate } from "../../../utils/index";
import { Album as AlbumModel } from "./AlbumModel";
const Album = ({ album }: { album: AlbumModel }) => {
  return (
    <Link to={`/album/${album.id}`} className="card p-4">
      <img className="card__image" src={album.images && album.images[0].url} />
      <p className="card__name font-medium mt-5 text-base truncate">
        {album.name}
      </p>
      <p className="text-gray text-xs font-normal mt-2 capitalize">
        {" "}
        {getAlbumReleaseDate(album)} • {album.album_type}
      </p>
    </Link>
  );
};

export default Album;
