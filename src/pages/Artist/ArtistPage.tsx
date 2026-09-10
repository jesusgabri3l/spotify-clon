import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import auth from "../../services/auth";
import { UserStore } from "../../store/UserStore";
import HeaderProfile from "../../components/layouts/Header/HeaderProfile";
import Loader from "../../components/layouts/Loader";
import Track from "../../components/layouts/Track/Track";
import { Track as TrackModel } from "../../components/layouts/Track/TrackModel";
import FilterDiscography from "../../components/pages/ArtistPage/FilterDiscography";
import InfoAlert from "../../components/alerts/InfoAlert";
import ErrorAlert from "../../components/alerts/ErrorAlert";

const ArtistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artistInfo, setArtistInfo] = useState<any>();
  const [artistTopTracks, setArtistTopTracks] = useState<any>();

  const [seeMore, setSeeMore] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const followAnArtist = async () => {
    if (!UserStore.getAccessToken()) {
      void auth.sendRequestToAuth();
      return;
    }
    try {
      await api.putCurrentUserInfo(`/library?uris=spotify:artist:${id}`);
      setArtistInfo({
        ...artistInfo,
        following: true,
        followers: { total: (artistInfo?.followers?.total ?? 0) + 1 },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const unfollowAnArtist = async () => {
    try {
      await api.deleteCurrentUserInfo(`/library?uris=spotify:artist:${id}`);
      setArtistInfo({
        ...artistInfo,
        following: false,
        followers: { total: (artistInfo?.followers?.total ?? 0) - 1 },
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getArtistInfo = async () => {
    try {
      setLoading(true);
      const { data: artist } = await api.getArtistInfo(id as string);
      const { data: topTracksSearch } = await api.getArtistTopTracksApprox(
        artist.name,
      );
      // Following status is personal data - only check it when logged in,
      // anonymous visitors just see an artist page they can't follow from.
      const following = UserStore.getAccessToken()
        ? (
            await api.getCurrentUserInfo(
              `/library/contains?uris=spotify:artist:${id}`,
            )
          ).data[0]
        : false;
      artist.display_name = artist.name;
      artist.following = following;
      setArtistInfo(artist);
      // Spotify no longer returns `popularity` on track objects, so this is
      // left in Search's own relevance order rather than re-sorted.
      setArtistTopTracks(topTracksSearch.tracks.items);
    } catch (err: any) {
      // err.response is only set for a rejected Spotify request - a failed
      // public-token fetch (see services/publicAuth.ts) or a network error
      // has no .response at all, and would otherwise crash reading
      // artistTopTracks below instead of showing the error state.
      if (err.response?.status === 404) navigate("/");
      else setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on route param change, not a derived state sync
      getArtistInfo();
    } else navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="h-full w-full artistPage">
      {loading ? (
        <Loader />
      ) : !error ? (
        <>
          <HeaderProfile
            user={artistInfo}
            type="artist"
            actions={{ follow: followAnArtist, unfollow: unfollowAnArtist }}
          />
          <div className="artistPage__content mt-12 px-6 md:px-12">
            <div className="artistPage__content__toptracks">
              <h3 className="home__content__title text-xl mb-2 font-bold mb-6 md:text-2xl">
                Most popular tracks
              </h3>
              <div className="artistPage__content__toptracks__content mt-2">
                {
                  // FIRST 5
                  artistTopTracks.length > 0 ? (
                    artistTopTracks.map((track: TrackModel, index: number) => {
                      if (index < 5) {
                        return (
                          <Track
                            track={track}
                            index={index + 1}
                            key={track.id}
                            showArtist={false}
                          />
                        );
                      } else {
                        return "";
                      }
                    })
                  ) : (
                    <InfoAlert
                      message={
                        "Hey looks like this artist does not have any track yet!"
                      }
                    />
                  )
                }
                {
                  // LAST 5
                  seeMore &&
                    artistTopTracks.map((track: TrackModel, index: number) => {
                      if (index > 5 && track) {
                        return (
                          <Track
                            track={track}
                            index={index + 1}
                            key={track.id}
                            showArtist={false}
                          />
                        );
                      } else {
                        return "";
                      }
                    })
                }
                {artistTopTracks.length > 5 && (
                  <button
                    className="ml-6 mt-8 text-sm uppercase text-gray font-bold"
                    onClick={() => setSeeMore(!seeMore)}
                  >
                    {seeMore ? "See less" : "See more"}
                  </button>
                )}
              </div>
            </div>
            <FilterDiscography id={id} />
          </div>
        </>
      ) : (
        <ErrorAlert />
      )}
    </div>
  );
};

export default ArtistPage;
