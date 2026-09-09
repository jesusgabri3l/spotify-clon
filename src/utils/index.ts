const numberWithCommas = (followers: number) =>
  followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

const millisToMinutesAndSeconds = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`;
};

const getAlbumReleaseDate = (album: any) => {
  if (album.release_date_precision === "year") return album.release_date;
  else if (album.release_date_precision === "day")
    return getAlbumReleaseDateByDay(album);
  else return getAlbumReleaseDateByDay(album);
};

const getAlbumReleaseDateByDay = (album: any) => {
  const index = album.release_date.indexOf("-");
  return album.release_date.slice(0, index);
};
const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  ms = 300,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};

export {
  getAlbumReleaseDate,
  numberWithCommas,
  millisToMinutesAndSeconds,
  debounce,
};
