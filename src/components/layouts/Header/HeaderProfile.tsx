import { Props } from "./Props";
import { numberWithCommas } from "../../../utils/index";
import defaultUserImg from "../../../assets/images/default-user.png";
const HeaderProfile = ({ user, type = "user", actions }: Props) => {
  const handleClickFollow = () => {
    if (user.following) actions.unfollow();
    else actions.follow();
  };
  return (
    <header
      className={`header ${type === "user" ? "blue" : "red"} flex flex-col items-center lg:items-center lg:flex-row`}
    >
      <img
        src={
          user.images && user.images?.length > 0
            ? user.images[0].url
            : defaultUserImg
        }
        className="header__img"
      />
      <div className="lg:ml-12">
        <p className="header__profile hidden text-l mb-2 text-center font-medium lg:text-left lg:block">
          {type === "user" ? "PROFILE" : "ARTIST"}
        </p>
        <h2
          className={`header__name font-bold text-center mt-2 lg:text-left 
              ${user.display_name && user.display_name?.length > 25 ? "text-lg md:text-4xl" : "text-2xl md:text-5xl lg:text-7xl"}`}
        >
          {user.display_name}
        </h2>
        <p className="header__profile text-base text-center text-gray mt-3 md:text-xl  lg:text-left lg:mt-6">
          {numberWithCommas(user.followers.total)} followers
        </p>
        {type !== "user" && (
          <button
            className="header__following block rounded-md text-xs font-bold text-center mt-6 lg:text-left lg:mt-12"
            onClick={handleClickFollow}
          >
            {user.following ? (
              <>
                <i className="fa fa-check mr-2"></i>
                FOLLOWING
              </>
            ) : (
              "FOLLOW"
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderProfile;
