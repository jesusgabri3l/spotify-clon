import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoAlert from "../../components/alerts/InfoAlert";
import Album from "../../components/cards/Album/Album";
import Loader from "../../components/layouts/Loader";
import SectionFlex from "../../components/layouts/SectionFlex";
import api from "../../services/api";
import useFilterDiscography from "../../utils/hooks/useFilterDiscography";
const DiscographyPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const discography = useFilterDiscography();

  const handleSearchChange = (keywordChange: string) =>
    discography.setKeyword(keywordChange);

  useEffect(() => {
    const getDiscographyInfo = async () => {
      try {
        setLoading(true);
        const { data: albumsResponse } = await api.getArtistInfo(
          id as string,
          "/albums/?include_groups=album&limit=50",
        );
        const { data: singlesResponse } = await api.getArtistInfo(
          id as string,
          "/albums/?include_groups=single&limit=50",
        );
        const { data: compilationsResponse } = await api.getArtistInfo(
          id as string,
          "/albums/?include_groups=compilation&limit=50",
        );
        discography.setDataDiscography({
          albumsResponse: albumsResponse.items,
          singlesResponse: singlesResponse.items,
          compilationsResponse: compilationsResponse.items,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getDiscographyInfo();
  }, []);

  useEffect(() => {
    discography.searchAlbumOrSingle();
  }, [discography.keyword]);
  return (
    <div className="h-full w-full pt-12 px-6 discographyPage md:px-12">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex gap-x-7 gap-y-5 flex-wrap">
            <div className="search">
              <input
                placeholder={`Search by ${discography.filterBy} name`}
                className="search__input"
                value={discography.keyword}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <i className="fa fa-search search__icon" />
            </div>
            {discography.albums.length > 0 && (
              <button
                onClick={() =>
                  discography.handleFilterDiscographyClick("album")
                }
                className={`px-4 py-2 text-xs font-medium 
                      ${discography.filterBy === "album" ? "bg-white rounded-xl text-black" : "element_wrapper"}`}
              >
                ALBUMS
              </button>
            )}
            {discography.singles.length > 0 && (
              <button
                onClick={() =>
                  discography.handleFilterDiscographyClick("single")
                }
                className={`px-4 py-2 text-xs font-medium 
                    ${discography.filterBy === "single" ? "bg-white rounded-xl text-black" : "element_wrapper"}`}
              >
                SINGLES
              </button>
            )}
            {discography.compilations.length > 0 && (
              <button
                onClick={() =>
                  discography.handleFilterDiscographyClick("compilation")
                }
                className={`px-4 py-2 text-xs font-medium 
                    ${discography.filterBy === "compilation" ? "bg-white rounded-xl text-black" : "element_wrapper"}`}
              >
                COMPILATIONS
              </button>
            )}
          </div>
          <SectionFlex>
            {discography.items.length > 0 ? (
              discography.items.map((album: any) => (
                <Album album={album} key={album.id} />
              ))
            ) : (
              <InfoAlert
                message={`Hey looks like this artist does not have any ${discography.filterBy} yet!`}
              />
            )}
          </SectionFlex>
        </>
      )}
    </div>
  );
};

export default DiscographyPage;
