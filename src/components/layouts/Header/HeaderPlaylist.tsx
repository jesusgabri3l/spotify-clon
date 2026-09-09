const HeaderPlaylist = ({ playlist }: any) => {
  return (
    <header className="header header--track-list green flex flex-col items-center lg:items-center lg:flex-row">
      <img
        src={playlist.images[0].url}
        className="header__img header--track-list__img shadow-xl"
      />
      <div className="lg:ml-12">
        <p className="header__profile hidden text-l mb-2 uppercase text-center font-medium lg:text-left lg:block">
          List
        </p>
        <h2
          className={`header__name font-bold text-center mt-2 lg:text-left 
              ${playlist.name && playlist.name?.length > 20 ? "text-lg md:text-4xl" : "text-2xl md:text-5xl lg:text-8xl"}`}
        >
          {playlist.name}
        </h2>
        <p className="header__profile text-xs text-center font-bold mt-3 md:text-base  lg:text-left lg:mt-6">
          {playlist.owner.display_name}
          <span className="font-normal text-gray">
            {" "}
            • {playlist.tracks.total} tracks
          </span>
        </p>
      </div>
    </header>
  );
};

export default HeaderPlaylist;
