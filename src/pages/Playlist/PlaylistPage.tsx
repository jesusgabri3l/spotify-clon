import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import InfoAlert from "../../components/alerts/InfoAlert";
import HeaderPlaylist from "../../components/layouts/Header/HeaderPlaylist";
import Loader from "../../components/layouts/Loader";
import Track from "../../components/layouts/Track/Track";
import api from "../../services/api";
const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<any>();
  const [tracks, setTracks] = useState<any[]>([]);
  const [tracksRestricted, setTracksRestricted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getPlayListInfo = async () => {
      try {
        setLoading(true);
        setTracksRestricted(false);
        if (id === "me") {
          const { data: savedTracks } =
            await api.getCurrentUserInfo("/tracks/?limit=50");
          setPlaylist({
            name: "Liked tracks",
            owner: {
              display_name: "Me",
            },
            images: [
              {
                url: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
              },
            ],
          });
          setTracks(
            savedTracks.items
              .filter((entry: any) => entry?.track)
              .map((entry: any) => entry.track),
          );
        } else {
          const { data: playlistInfo } = await api.getPlaylistInfo(
            id as string,
          );
          setPlaylist(playlistInfo);
          try {
            const { data: items } = await api.getPlaylistItems(id as string);
            setTracks(
              items.items
                .filter((entry: any) => entry?.item)
                .map((entry: any) => entry.item),
            );
          } catch (itemsErr: any) {
            // Spotify forbids reading another user's playlist tracks for
            // apps without extended quota mode; show the playlist itself
            // (name, cover, owner) without crashing the whole page.
            if (itemsErr.response?.status === 403) setTracksRestricted(true);
            else throw itemsErr;
          }
        }
      } catch (err: any) {
        if (err.response?.status === 404 && id !== "me") navigate("/");
        if (err.response?.status === 400) setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPlayListInfo();
  }, [id]);
  return (
    <div className="h-full w-full playlistPage">
      {loading ? (
        <Loader />
      ) : !error ? (
        <>
          <HeaderPlaylist playlist={playlist} tracksTotal={tracks.length} />
          <div className="px-6 md:px-12">
            <section className="albumPage__trackList mt-6">
              <div className="home__content__tracks__content mt-2">
                {tracksRestricted ? (
                  <InfoAlert message="Spotify doesn't let this app read another user's playlist tracks" />
                ) : tracks.length > 0 ? (
                  tracks.map((track: any, index: number) => (
                    <Track
                      track={track}
                      index={index + 1}
                      key={track.id}
                      showImage={true}
                      showAlbum={false}
                    />
                  ))
                ) : (
                  <InfoAlert message="Looks like there's no tracks on this playlist" />
                )}
              </div>
            </section>
          </div>
        </>
      ) : (
        <ErrorAlert />
      )}
    </div>
  );
};

export default Playlist;
