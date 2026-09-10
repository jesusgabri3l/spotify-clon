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
import LoginInfo from "../../pages/Login/LoginInfo";

const IndexRouter = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="callback/*" element={<Callback UserStore={UserStore} />} />
        <Route path="login" element={<LoginInfo />} />
        {/*  This is the main path for the whole application you can see all the routes are inside it,
            The element it renders is a layout component which has the Navbar component + Outlet from REACT ROUTER DOM
      */}
        <Route path="/" element={<Layout UserStore={UserStore} />}>
          <Route index element={<Home UserStore={UserStore} />} />
          {/* Public: catalog browsing works for anonymous visitors via the
              Client Credentials flow (see services/publicAuth.ts), since
              Spotify's Development Mode whitelist would otherwise block
              anyone but the 5 approved test accounts from using the app at
              all - see memory/project notes for why. */}
          <Route path="artist/:id" element={<ArtistPage />}></Route>
          <Route
            path="artist/:id/discography"
            element={<DiscographyPage />}
          ></Route>
          <Route path="search" element={<SearchPage />}></Route>
          <Route path="album/:id" element={<AlbumPage />}></Route>
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
