import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import HeaderProfile from "../../components/layouts/Header/HeaderProfile";
import Loader from "../../components/layouts/Loader";
import Track from "../../components/layouts/Track/Track";
import { Track as TrackModel } from "../../components/layouts/Track/TrackModel";
import FilterDiscography from "../../components/pages/ArtistPage/FilterDiscography";
import SectionFlex from "../../components/layouts/SectionFlex";
import { Artist as ArtistModel } from "../../components/cards/Artist/ArtistModel";
import Artist from "../../components/cards/Artist/Artist";
import InfoAlert from "../../components/alerts/InfoAlert";
import ErrorAlert from "../../components/alerts/ErrorAlert";

const ArtistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artistInfo, setArtistInfo] = useState<any>();
  const [artistTopTracks, setArtistTopTracks] = useState<any>();
  const [relatedArtists, setRelatedArtists] = useState<ArtistModel[]>();

  const [seeMore, setSeeMore] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const followAnArtist = async () => {
    try {
      await api.putCurrentUserInfo(`/following/?ids=${id}&type=artist`);
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
      await api.deleteCurrentUserInfo(`/following/?ids=${id}&type=artist`);
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
      const { data: artistTop } = await api.getArtistTopTracks(id as string);
      const { data: isFollowing } = await api.getCurrentUserInfo(
        `/following/contains/?ids=${id}&type=artist`,
      );
      const { data: relatedArtistsResponse } = await api.getArtistInfo(
        id as string,
        "/related-artists",
      );
      artist.display_name = artist.name;
      artist.following = isFollowing[0];
      setArtistInfo(artist);
      setArtistTopTracks(artistTop.tracks);
      setRelatedArtists(relatedArtistsResponse.artists);
    } catch (err: any) {
      if (err.response.status === 404) navigate("/");
      if (err.response.status === 400) setError(true);
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
            {relatedArtists && relatedArtists.length > 0 && (
              <SectionFlex title="Fans also listen to">
                {relatedArtists &&
                  relatedArtists.map((artist: ArtistModel, index: number) => {
                    if (index < 6)
                      return <Artist artist={artist} key={artist.id} />;
                    else return null;
                  })}
              </SectionFlex>
            )}
          </div>
        </>
      ) : (
        <ErrorAlert />
      )}
    </div>
  );
};

export default ArtistPage;
