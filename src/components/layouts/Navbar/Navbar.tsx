import { ReactElement } from "react";
import { observer } from "mobx-react";
import ProfileButton from "./components/ProfileButton";
import Links from "./components/Links";
import PlaylistsLinks from "./components/PlaylistsLinks";
import { PropsObserver } from "../../../models/GlobalModels";
// Styles at 'components/_nav.scss'

const Navbar = observer(({ UserStore }: PropsObserver): ReactElement => {
  return (
    <>
      <nav className="navigator page_wrapper__nav">
        <Links />
        <hr className="hr hidden xl:block" />
        <PlaylistsLinks UserStore={UserStore} />
      </nav>
      <ProfileButton UserStore={UserStore} />
    </>
  );
});
export default Navbar;
