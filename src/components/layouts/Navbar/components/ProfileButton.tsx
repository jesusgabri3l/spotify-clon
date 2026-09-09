import { ReactElement, useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import userDefaultImg from "../../../../assets/images/default-user.png";
import { PropsObserver } from "../../../../models/GlobalModels";

const ProfileButton = ({ UserStore }: PropsObserver): ReactElement => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeDropDown, setActiveDropdown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("click", (evt: any) => {
      if (dropdownRef.current!.contains(evt.target)) return;
      setActiveDropdown(false);
    });
  }, []);
  return (
    <div
      className="navigator__user element_wrapper"
      onClick={() => setActiveDropdown(!activeDropDown)}
      ref={dropdownRef}
    >
      <img
        className="navigator__user__img"
        src={
          UserStore.user.images?.length
            ? UserStore.user.images[0].url
            : userDefaultImg
        }
      />
      <p className="navigator__user__name text-sm ml-3 hidden truncate xl:text-lg xl:block">
        {UserStore.user.display_name}
      </p>
      <i className="fa fa-angle-right ml-2 xl:ml-8"></i>
      <Dropdown active={activeDropDown} UserStore={UserStore} />
    </div>
  );
};

export default ProfileButton;
