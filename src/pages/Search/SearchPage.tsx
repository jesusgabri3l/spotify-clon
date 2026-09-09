import { useCallback, useMemo, useState } from "react";
import api from "../../services/api";
import { debounce } from "../../utils";
import Loader from "../../components/layouts/Loader";
import SectionFlex from "../../components/layouts/SectionFlex";
import Artist from "../../components/cards/Artist/Artist";
import Album from "../../components/cards/Album/Album";
import Track from "../../components/layouts/Track/Track";
import Playlist from "../../components/cards/Playlist/Playlist";
const SearchPage = () => {
  const [infoSearch, setInfoSearch] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const fetchSearchInformation = useCallback(async (keywordChange: string) => {
    setQuery(keywordChange);
    if (keywordChange) {
      setLoading(true);
      const { data: searchResponse } = await api.getSearchInfo(keywordChange);
      const { data: searchResponseTracks } =
        await api.getSearchInfoTracks(keywordChange);
      setLoading(false);
      setInfoSearch({ ...searchResponse, ...searchResponseTracks });
    }
  }, []);
  const debouncedFetchSearchInformation = useMemo(
    () => debounce(fetchSearchInformation, 500),
    [fetchSearchInformation],
  );

  return (
    <div className="h-full w-full px-6 md:px-12">
      <div className=" w-full lg:w-1/3  md:w-1/2">
        <div className="search mt-10">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              debouncedFetchSearchInformation(e.target.value);
            }}
            className="search__input"
            placeholder="Artist, track, album, or playlist"
          />
          <i className="fa fa-search" />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : query ? (
        <div className="mt-12">
          <section className="home__content__tracks mt-12">
            <h3 className="home__content__title text-xl mb-2 font-bold mb-6 md:text-2xl">
              Tracks
            </h3>
            <div className="home__content__tracks__content mt-2">
              {infoSearch.tracks.items.map((track: any) => (
                <Track track={track} key={track.id} />
              ))}
            </div>
          </section>
          <SectionFlex title="Artist">
            {infoSearch.artists.items.map((artist: any) => (
              <Artist artist={artist} key={artist.id} />
            ))}
          </SectionFlex>
          <SectionFlex title="Albums">
            {infoSearch.albums.items.map((album: any) => (
              <Album album={album} key={album.id} />
            ))}
          </SectionFlex>
          <SectionFlex title="Playlists">
            {infoSearch.playlists.items.map((playlist: any) => (
              <Playlist playlist={playlist} key={playlist.id} />
            ))}
          </SectionFlex>
        </div>
      ) : (
        <p className="mt-12 text-gray">
          Search for an artist, track, album, or playlist to get started.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
