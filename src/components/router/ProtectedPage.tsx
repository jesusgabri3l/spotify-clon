import { ReactElement } from "react";
import { UserStoreImpl } from "../../store/UserStore";
import { observer } from "mobx-react";
import { useLocation, Navigate } from "react-router-dom";
interface Props {
  UserStore: UserStoreImpl;
  children: ReactElement;
}
const ProtectedPage = observer(
  ({ UserStore, children }: Props): ReactElement => {
    const location = useLocation();
    if (!UserStore.user.id)
      return <Navigate to="/" state={{ from: location }} replace />;
    return children;
  },
);

export default ProtectedPage;
