import { ReactElement } from "react";

const Loader = (): ReactElement => {
  return (
    <div className="h-60 w-full flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
