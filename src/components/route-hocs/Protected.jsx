import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function Protected() {
  const auth = useSelector((state) => state.auth);

  if (!auth.signedIn) {
      return <Navigate to="/login" replace />;
  }

  return (
    <div className="overflow-y-auto text-zinc-50 w-full h-screen">
        <Outlet />
    </div>
  );
}
