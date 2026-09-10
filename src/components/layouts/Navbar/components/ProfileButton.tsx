import { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import Dropdown from "./Dropdown";
import userDefaultImg from "../../../../assets/images/default-user.png";
import { PropsObserver } from "../../../../models/GlobalModels";

// observer() matters here, not just cosmetic: without it this component
// doesn't re-render when UserStore.user is filled in after login, so it
// kept showing the default avatar until some unrelated click (e.g. opening
// the dropdown) forced a re-render and picked up the now-current value.
const ProfileButton = observer(({ UserStore }: PropsObserver): ReactElement => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeDropDown, setActiveDropdown] = useState<boolean>(false);
  const isLoggedIn = !!UserStore.getAccessToken();

  useEffect(() => {
    document.addEventListener("click", (evt: any) => {
      if (dropdownRef.current!.contains(evt.target)) return;
      setActiveDropdown(false);
    });
  }, []);

  const handleClick = () => {
    // Anonymous visitors have nothing personal to show in a dropdown - send
    // them to a page explaining they likely can't log in (Spotify's
    // Development Mode whitelist) instead of dropping them straight into a
    // Spotify OAuth screen that will just fail for almost everyone.
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setActiveDropdown(!activeDropDown);
  };

  return (
    <div
      className="navigator__user element_wrapper"
      onClick={handleClick}
      ref={dropdownRef}
    >
      {isLoggedIn ? (
        <img
          className="navigator__user__img"
          src={
            UserStore.user.images?.length
              ? UserStore.user.images[0].url
              : userDefaultImg
          }
        />
      ) : (
        <span className="navigator__user__img navigator__user__img--login">
          <i className="fab fa-spotify" aria-hidden="true" />
        </span>
      )}
      <p className="navigator__user__name text-m ml-3 hidden truncate xl:text-m xl:block">
        {isLoggedIn ? UserStore.user.display_name : "Log in"}
      </p>
      {isLoggedIn && <Dropdown active={activeDropDown} UserStore={UserStore} />}
    </div>
  );
});

export default ProfileButton;
