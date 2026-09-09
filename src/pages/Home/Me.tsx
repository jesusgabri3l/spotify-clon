import { ReactElement, useEffect, useState } from "react";
import { User } from "../../store/UserStoreModels";
import api from "../../services/api";
import Loader from "../../components/layouts/Loader";
import HeaderProfile from "../../components/layouts/Header/HeaderProfile";
import Artist from "../../components/cards/Artist/Artist";
import { Artist as ArtistModel } from "../../components/cards/Artist/ArtistModel";
import Track from "../../components/layouts/Track/Track";
import { Track as TrackModel } from "../../components/layouts/Track/TrackModel";
import Playlist from "../../components/cards/Playlist/Playlist";
import { Playlist as PlaylistModel } from "../../components/cards/Playlist/PlaylistModel";
import SectionFlex from "../../components/layouts/SectionFlex";
import InfoAlert from "../../components/alerts/InfoAlert";
import ErrorAlert from "../../components/alerts/ErrorAlert";

const Me = ({ user }: { user: User }): ReactElement => {
  const [artists, setArtists] = useState<ArtistModel[]>([]);
  const [tracks, setTracks] = useState<TrackModel[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [followingArtists, setFollowingArtists] = useState<ArtistModel[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getUserLibrary = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data: artistsResponse } = await api.getCurrentUserInfo(
          "/top/artists/?limit=6&time_range=short_term",
        );
        const { data: tracksResponse } = await api.getCurrentUserInfo(
          "/top/tracks/?limit=5&time_range=short_term",
        );
        const { data: following } = await api.getCurrentUserInfo(
          "/following/?type=artist&limit=6",
        );
        setArtists(artistsResponse.items);
        setTracks(tracksResponse.items);
        setPlaylists(user.playlists!);
        setFollowingArtists(following.artists.items);
      } catch (err: any) {
        if (err.response.status === 400) setError(true);
      } finally {
        setLoading(false);
      }
    };
    getUserLibrary();
  }, []);

  return (
    <div className="h-full w-full home">
      <HeaderProfile user={user} type="user" />
      {loading ? (
        <Loader />
      ) : !error ? (
        <div className="home__content px-6 md:px-12">
          <SectionFlex title="Top artists this month">
            {artists.length > 0 ? (
              artists.map((artist: ArtistModel) => (
                <Artist artist={artist} key={artist.id} />
              ))
            ) : (
              <InfoAlert message="Looks like you have not listen to spotify for a quite ago" />
            )}
          </SectionFlex>
          <section className="home__content__tracks mt-14">
            <h3 className="home__content__title text-xl mb-2 font-bold mb-6 md:text-2xl">
              Top tracks this month
            </h3>
            <div className="home__content__tracks__content mt-2">
              {tracks.length > 0 ? (
                tracks.map((track: TrackModel, index: number) => (
                  <Track track={track} index={index + 1} key={track.id} />
                ))
              ) : (
                <InfoAlert message="Looks like you have not listen to spotify for a quite ago" />
              )}
            </div>
          </section>
          <SectionFlex title="Your playlists">
            {playlists.length > 0 ? (
              playlists.map((playlist: PlaylistModel) => (
                <Playlist playlist={playlist} key={playlist.id} />
              ))
            ) : (
              <InfoAlert message="Looks like you do not have a playlist yet" />
            )}
          </SectionFlex>
          <SectionFlex title="Artists you follow">
            {followingArtists.length > 0 ? (
              followingArtists.map((artist: ArtistModel) => (
                <Artist artist={artist} key={artist.id} />
              ))
            ) : (
              <InfoAlert message="Looks like you are not following any artist yet" />
            )}
          </SectionFlex>
        </div>
      ) : (
        <ErrorAlert />
      )}
    </div>
  );
};

export default Me;
