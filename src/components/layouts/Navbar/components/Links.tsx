import { ReactElement } from "react";
import CustomLink from "../../../router/CustomLink";

const Links = (): ReactElement => {
  return (
    <ul className="navigator__list">
      <li className="navigator__list__item">
        <CustomLink to="/">
          <i className="fa fa-home mr-2" />
          <span>Home</span>
        </CustomLink>
      </li>
      <li className="navigator__list__item">
        <CustomLink to="/search">
          <i className="fa fa-search mr-2" />
          <span>Search</span>
        </CustomLink>
      </li>
      <li className="navigator__list__item">
        <CustomLink to="/mymusic">
          <i className="fa fa-music mr-2" />
          <span>Your music</span>
        </CustomLink>
      </li>
    </ul>
  );
};

export default Links;
