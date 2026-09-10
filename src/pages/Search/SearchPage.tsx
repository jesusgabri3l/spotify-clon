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
      try {
        const { data: searchResponse } = await api.getSearchInfo(keywordChange);
        const { data: searchResponseTracks } =
          await api.getSearchInfoTracks(keywordChange);
        setInfoSearch({ ...searchResponse, ...searchResponseTracks });
      } catch (err) {
        console.error(err);
        setInfoSearch(undefined);
      } finally {
        setLoading(false);
      }
    }
  }, []);
  const debouncedFetchSearchInformation = useMemo(
    () => debounce(fetchSearchInformation, 500),
    [fetchSearchInformation],
  );

  const clearSearch = () => {
    setInputValue("");
    setQuery("");
    setInfoSearch(undefined);
  };

  // Spotify's search now returns null entries for some items (e.g. restricted
  // algorithmic playlists) instead of omitting them, so every list is
  // filtered before it's counted or rendered.
  const tracks: any[] = infoSearch?.tracks?.items.filter(Boolean) ?? [];
  const artists: any[] = infoSearch?.artists?.items.filter(Boolean) ?? [];
  const albums: any[] = infoSearch?.albums?.items.filter(Boolean) ?? [];
  const playlists: any[] = infoSearch?.playlists?.items.filter(Boolean) ?? [];
  const hasResults =
    tracks.length > 0 ||
    artists.length > 0 ||
    albums.length > 0 ||
    playlists.length > 0;

  return (
    <div className="h-full w-full px-6 mt-24 md:px-12">
      <div className="w-full">
        <div className="search">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              debouncedFetchSearchInformation(e.target.value);
            }}
            className="search__input"
            placeholder="Artist, track, album, or playlist"
          />
          {inputValue ? (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              className="search__clear"
            >
              <i className="fa fa-times" aria-hidden="true" />
            </button>
          ) : (
            <i className="fa fa-search search__icon" aria-hidden="true" />
          )}
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : query ? (
        hasResults ? (
          <div className="mt-12">
            {tracks.length > 0 && (
              <section className="home__content__tracks mt-12">
                <h3 className="home__content__title text-xl mb-2 font-bold mb-6 md:text-2xl">
                  Tracks
                </h3>
                <div className="home__content__tracks__content mt-2">
                  {tracks.map((track: any) => (
                    <Track track={track} key={track.id} />
                  ))}
                </div>
              </section>
            )}
            {artists.length > 0 && (
              <SectionFlex title="Artist">
                {artists.map((artist: any) => (
                  <Artist artist={artist} key={artist.id} />
                ))}
              </SectionFlex>
            )}
            {albums.length > 0 && (
              <SectionFlex title="Albums">
                {albums.map((album: any) => (
                  <Album album={album} key={album.id} />
                ))}
              </SectionFlex>
            )}
            {playlists.length > 0 && (
              <SectionFlex title="Playlists">
                {playlists.map((playlist: any) => (
                  <Playlist playlist={playlist} key={playlist.id} />
                ))}
              </SectionFlex>
            )}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center text-center">
            <i
              className="fa fa-search text-3xl text-gray mb-4"
              aria-hidden="true"
            />
            <p className="font-bold mb-1">
              No results found for &quot;{query}&quot;
            </p>
            <p className="text-gray text-sm">
              Try searching for something else, or check the spelling.
            </p>
          </div>
        )
      ) : (
        <div className="mt-16 flex flex-col items-center text-center">
          <i
            className="fa fa-search text-3xl text-gray mb-4"
            aria-hidden="true"
          />
          <p className="text-gray">
            Search for an artist, track, album, or playlist to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
