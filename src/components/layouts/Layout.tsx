import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react";
import Navbar from "../layouts/Navbar/Navbar";
import BackButton from "./BackButton";
import { PropsObserver } from "../../models/GlobalModels";
// Styles at 'layouts/_layouts.scss'
const Layout = observer(({ UserStore }: PropsObserver): ReactElement => {
  // Home is a real public landing page now (search CTA + suggested artists)
  // instead of a login wall, so the nav shell shows everywhere, logged in or
  // not - anonymous visitors need it to get around just as much as testers do.
  return (
    <div className="page_wrapper">
      <Navbar UserStore={UserStore} />
      <div className="page_wrapper__content">
        <BackButton />
        <Outlet />
      </div>
    </div>
  );
});

export default Layout;
