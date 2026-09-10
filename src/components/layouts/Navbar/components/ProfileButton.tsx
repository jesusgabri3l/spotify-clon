import { ReactElement, useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import auth from "../../../../services/auth";
import userDefaultImg from "../../../../assets/images/default-user.png";
import { PropsObserver } from "../../../../models/GlobalModels";

const ProfileButton = ({ UserStore }: PropsObserver): ReactElement => {
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
    // Anonymous visitors have nothing personal to show in a dropdown - the
    // profile icon just doubles as the "log in" affordance for them.
    if (!isLoggedIn) {
      void auth.sendRequestToAuth();
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
          <i className="fa fa-sign-in-alt" aria-hidden="true" />
        </span>
      )}
      <p className="navigator__user__name text-m ml-3 hidden truncate xl:text-m xl:block">
        {isLoggedIn ? UserStore.user.display_name : "Log in"}
      </p>
      {isLoggedIn && <Dropdown active={activeDropDown} UserStore={UserStore} />}
    </div>
  );
};

export default ProfileButton;
