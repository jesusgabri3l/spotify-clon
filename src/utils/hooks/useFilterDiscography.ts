import { useState } from "react";
import { Album as AlbumModel } from "../../components/cards/Album/AlbumModel";
const useFilterDiscography = () => {
  const [filterBy, setFilterBy] = useState<string>("album");
  const [items, setItems] = useState<AlbumModel[]>([]);
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [singles, setSingles] = useState<AlbumModel[]>([]);
  const [compilations, setCompilations] = useState<AlbumModel[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const handleFilterDiscographyClick = (filter: string) => {
    setKeyword("");
    setFilterBy(filter);
    if (filter === "album") setItems(albums);
    if (filter === "single") setItems(singles);
    if (filter === "compilation") setItems(compilations);
  };
  const searchAlbumOrSingle = () => {
    if (keyword !== "") {
      const itemsToFilter = filterBy === "album" ? albums : singles;
      const itemsFiltered = itemsToFilter.filter((item: AlbumModel) =>
        item.name!.toLowerCase().includes(keyword.toLowerCase()),
      );
      setItems(itemsFiltered);
    } else {
      if (filterBy === "album") setItems(albums);
      if (filterBy === "single") setItems(singles);
      if (filterBy === "compilation") setItems(compilations);
    }
  };
  const setDataDiscography = ({
    albumsResponse = [],
    singlesResponse = [],
    compilationsResponse = [],
  }: {
    albumsResponse: AlbumModel[];
    singlesResponse: AlbumModel[];
    compilationsResponse: any[];
  }) => {
    if (albumsResponse.length === 0) {
      setItems(singlesResponse);
      setFilterBy("single");
    } else {
      setItems(albumsResponse);
    }
    setAlbums(albumsResponse);
    setSingles(singlesResponse);
    setCompilations(compilationsResponse);
  };
  return {
    setDataDiscography,
    searchAlbumOrSingle,
    handleFilterDiscographyClick,
    setKeyword,
    filterBy,
    items,
    keyword,
    albums,
    singles,
    compilations,
  };
};

export default useFilterDiscography;
