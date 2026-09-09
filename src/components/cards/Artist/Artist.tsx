import { useNavigate } from "react-router-dom";
import { Artist as ArtistModel } from "./ArtistModel";
import defaultUserImg from "../../../assets/images/default-user.png";
// Styles at components/_artist.scss

const Artist = ({ artist }: { artist: ArtistModel }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card card--artist py-6 px-4 justify-self-start"
      key={artist.id}
      onClick={() => navigate(`/artist/${artist.id}`)}
    >
      {
        <img
          className="card__image card--artist__image"
          src={
            artist.images && artist.images?.length > 0
              ? artist.images[0].url
              : defaultUserImg
          }
        />
      }
      <div className="">
        <p className="card__name block font-medium mt-4 text-sm truncate md:text-base">
          {artist.name}
        </p>
        <p className="artist__name mt-1 text-xs md:text-sm text-gray">Artist</p>
      </div>
    </div>
  );
};

export default Artist;
