import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Album from "../../cards/Album/Album";
import Loader from "../../layouts/Loader";
import useFilterDiscography from "../../../utils/hooks/useFilterDiscography";
import InfoAlert from "../../alerts/InfoAlert";
const FilterDiscography = ({ id = "" }: { id?: string }) => {
  const discography = useFilterDiscography();
  const [loading, setLoading] = useState<boolean>(true);

  const getDiscographyInfo = async () => {
    try {
      const { data: albumsResponse } = await api.getArtistInfo(
        id as string,
        "/albums/?include_groups=album&limit=6",
      );
      const { data: singlesResponse } = await api.getArtistInfo(
        id as string,
        "/albums/?include_groups=single&limit=6",
      );
      const { data: compilationsResponse } = await api.getArtistInfo(
        id as string,
        "/albums/?include_groups=compilation&limit=6",
      );
      discography.setDataDiscography({
        albumsResponse: albumsResponse.items,
        singlesResponse: singlesResponse.items,
        compilationsResponse: compilationsResponse.items,
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDiscographyInfo();
  }, [id]);
  return (
    <section className="mt-14">
      <h3 className="text-xl mb-2 font-bold mb-6 md:text-2xl">Discography</h3>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="pl-2 flex items-center justify-between pr-6 flex-wrap">
            <div className="flex items-center gap-x-5 gap-y-5 flex-wrap">
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
              <button
                onClick={() =>
                  discography.handleFilterDiscographyClick("single")
                }
                className={`px-4 py-2 text-xs font-medium 
                                ${discography.filterBy === "single" ? "bg-white rounded-xl text-black" : "element_wrapper"}`}
              >
                SINGLES
              </button>
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
            <Link
              to={`/artist/${id}/discography`}
              className="text-gray text-xs font-bold float-right mt-5 md:mt-0 hover:underline"
            >
              SEE ALL DISCOGRAPHY
            </Link>
          </div>
          <div className="flex items-center justify-start flex-wrap gap-y-5 gap-x-7 mt-8">
            {discography.items.length > 0 ? (
              discography.items.map((album: any) => (
                <Album key={album.id} album={album} />
              ))
            ) : (
              <InfoAlert
                message={`Hey looks like this artist does not have any ${discography.filterBy} yet!`}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default FilterDiscography;
