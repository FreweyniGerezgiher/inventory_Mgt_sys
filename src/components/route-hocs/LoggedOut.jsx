import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function OnlyWhenLoggedOut({ component }) {
  const auth = useSelector((state) => state.auth);

  if (auth.signedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return component();
}
