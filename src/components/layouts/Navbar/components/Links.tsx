import { ReactElement } from "react";
import { observer } from "mobx-react";
import CustomLink from "../../../router/CustomLink";
import { UserStore } from "../../../../store/UserStore";
import { RESTRICTED_TOOLTIP } from "../../../../utils/restrictionMessage";

const Links = observer((): ReactElement => {
  const isLoggedIn = !!UserStore.getAccessToken();

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
        {isLoggedIn ? (
          <CustomLink to="/mymusic">
            <i className="fa fa-music mr-2" />
            <span>Your music</span>
          </CustomLink>
        ) : (
          <span
            className="navigator__list__item__link navigator__list__item__link--disabled"
            data-tooltip={RESTRICTED_TOOLTIP}
            tabIndex={0}
          >
            <i className="fa fa-music mr-2" aria-hidden="true" />
            <span>Your music</span>
            <i
              className="fa fa-info-circle navigator__list__item__link__info"
              aria-hidden="true"
            />
          </span>
        )}
      </li>
    </ul>
  );
});

export default Links;
