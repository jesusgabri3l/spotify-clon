import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import HeaderAlbum from "../../components/layouts/Header/HeaderAlbum";
import Loader from "../../components/layouts/Loader";
import Track from "../../components/layouts/Track/Track";
import api from "../../services/api";
const AlbumPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [albumInfo, setAlbumInfo] = useState<any>();

  useEffect(() => {
    const getAlbumInfo = async () => {
      try {
        setLoading(true);
        const { data } = await api.getAlbumInfo(id as string);
        setAlbumInfo(data);
      } catch (err: any) {
        // err.response is only set for a rejected Spotify request - a failed
        // public-token fetch (see services/publicAuth.ts) or a network error
        // has no .response at all, and would otherwise crash reading
        // albumInfo.tracks below instead of showing the error state.
        if (err.response?.status === 404) navigate("/");
        else setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) getAlbumInfo();
    else navigate("/");
  }, []);
  return (
    <div className="w-full h-full albumPage">
      {loading ? (
        <Loader />
      ) : !error ? (
        <>
          <HeaderAlbum album={albumInfo} />
          <div className="px-6 md:px-12">
            <section className="albumPage__trackList mt-6">
              <div className="home__content__tracks__content mt-2">
                {albumInfo.tracks.items.map((track: any, index: number) => (
                  <Track
                    track={track}
                    index={index + 1}
                    key={track.id}
                    showImage={false}
                    showAlbum={false}
                  />
                ))}
              </div>
            </section>
            <section className="albumPage__copyright mt-12">
              <p className="text-sm text-gray font-medium">
                {albumInfo.release_date}
              </p>
              {albumInfo.copyrights.map((copyright: any) => (
                <p
                  className="text-sm text-gray text-xs mt-2"
                  key={copyright.text}
                >
                  {copyright.text}
                </p>
              ))}
            </section>
          </div>
        </>
      ) : (
        <ErrorAlert />
      )}
    </div>
  );
};

export default AlbumPage;
