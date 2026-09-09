import { useEffect } from "react";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import auth from "../services/auth";
import Loader from "../components/layouts/Loader";
import { PropsObserver } from "../models/GlobalModels";

const Callback = observer(({ UserStore }: PropsObserver) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = async (code: any): Promise<void> => {
    const { data } = await auth.getToken(code);
    const { access_token: accessToken, refresh_token: refreshToken } = data;
    UserStore.setAuth({ accessToken, refreshToken });
    navigate("/");
  };

  useEffect(() => {
    if (!location.search) navigate("/", { replace: true });
    else {
      const parsed = queryString.parse(location.search);
      if (parsed.error) navigate("/", { replace: true });
      else {
        const { code } = parsed;
        getToken(code);
      }
    }
  }, []);
  return <Loader />;
});
export default Callback;
