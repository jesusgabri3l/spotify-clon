import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import api from "../../services/api";
import Loader from "../../components/layouts/Loader";
import Me from "./Me";
import Login from "./Login";
import { PropsObserver } from "../../models/GlobalModels";

// styles at 'pages/home/_home.scss'

const Home = observer(({ UserStore }: PropsObserver): ReactElement => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const location: any = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const from = location.state?.from?.pathname || "/";

    const getMeData = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data: user } = await api.getCurrentUserInfo();
        const { data: playlistsResponse } =
          await api.getCurrentUserInfo("/playlists");
        UserStore.setUser({ ...user, playlists: playlistsResponse.items });
        setIsLogged(true);
        if (from) navigate(from, { replace: true });
      } catch (err: any) {
        if (err.response.status !== 401) setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };

    if (UserStore.user.id) {
      setIsLogged(true);
      setLoading(false);
    } else if (UserStore.auth.accessToken && !UserStore.user.id) {
      getMeData();
    } else if (!UserStore.auth.accessToken) {
      setIsLogged(false);
      setLoading(false);
    }
  }, [UserStore.user.id]);
  const renderComponent = (): ReactElement => {
    if (isLogged) return <Me user={UserStore.user} />;
    return <Login />;
  };
  return <>{loading ? <Loader /> : renderComponent()}</>;
});

export default Home;
