import React from "react";
import { Props } from "./TrackModel";
import { millisToMinutesAndSeconds } from "../../../utils/index";
import { Link } from "react-router-dom";

const Track = ({
  track,
  index,
  showArtist = true,
  showAlbum = true,
  showImage = true,
}: Props) => {
  const concataneArtists = (artists: any[]) => {
    return (
      <p className="track__mainInfo__naming__name text-xs text-gray mt-1">
        {artists
          .map<React.ReactNode>((artist: any) => (
            <span key={artist.id} className="text-xs text-gray hover:underline">
              <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
            </span>
          ))
          .reduce((prev, curr) => [prev, ", ", curr])}
      </p>
    );
  };
  return (
    <div
      className="track py-5 px-5 rounded-xl flex justify-between items-center mt-1"
      key={track.id}
    >
      <div className="track__mainInfo flex items-center gap-x-5 basis-full md:basis-2/6">
        {index && <p className="track__mainInfo__number text-gray">{index}</p>}
        {showImage && (
          <img
            src={track.album.images[2].url}
            className="track__mainInfo__img"
          />
        )}
        <div className="toprack__mainInfo__naming">
          <p className="track__mainInfo__naming__name font-medium">
            {track.name}
          </p>
          {showArtist
            ? concataneArtists(track.artists)
            : track.explicit && (
                <p className="text-gray uppercase mt-2 text-xs">explicit</p>
              )}
        </div>
      </div>
      {showAlbum && (
        <Link
          to={`/album/${track.album.id}`}
          className="track__album text-sm hidden md:block text-gray text-left basis-1/6 hover:underline"
        >
          {track.album.name}
        </Link>
      )}
      <p className="track__album text-sm text-gray hidden md:block text-right basis-1/6">
        {millisToMinutesAndSeconds(track.duration_ms as number)}
      </p>
    </div>
  );
};

export default Track;
