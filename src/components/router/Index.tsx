import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedPage from "./ProtectedPage";
import Layout from "../../components/layouts/Layout";
import { UserStore } from "../../store/UserStore";
// PAGES
import Home from "../../pages/Home/Home";
import Callback from "../../pages/Callback";
import ArtistPage from "../../pages/Artist/ArtistPage";
import DiscographyPage from "../../pages/Artist/DiscographyPage";
import AlbumPage from "../../pages/Album/AlbumPage";
import SearchPage from "../../pages/Search/SearchPage";
import PlaylistPage from "../../pages/Playlist/PlaylistPage";
import MyMusic from "../../pages/MyMusic/MyMusic";

const IndexRouter = (): ReactElement => {
  return (
    <BrowserRouter basename="/spotify-clon">
      <Routes>
        <Route path="callback/*" element={<Callback UserStore={UserStore} />} />
        {/*  This is the main path for the whole application you can see all the routes are inside it,
            The element it renders is a layout component which has the Navbar component + Outlet from REACT ROUTER DOM
      */}
        <Route path="/" element={<Layout UserStore={UserStore} />}>
          <Route index element={<Home UserStore={UserStore} />} />
          <Route
            path="artist/:id"
            element={
              <ProtectedPage UserStore={UserStore}>
                <ArtistPage />
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="artist/:id/discography"
            element={
              <ProtectedPage UserStore={UserStore}>
                <DiscographyPage />
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="search"
            element={
              <ProtectedPage UserStore={UserStore}>
                <SearchPage />
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="album/:id"
            element={
              <ProtectedPage UserStore={UserStore}>
                <AlbumPage />
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="playlist/:id"
            element={
              <ProtectedPage UserStore={UserStore}>
                <PlaylistPage />
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="mymusic"
            element={
              <ProtectedPage UserStore={UserStore}>
                <MyMusic UserStore={UserStore} />
              </ProtectedPage>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRouter;
