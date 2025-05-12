import { Route } from "react-router";
import { Routes } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import ChangePasswordForm from "./pages/change-password";
import Protected from "./components/route-hocs/Protected";
import ListDashBoard from "./pages/Entry";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route exact path="/" element={<Protected />}>
          <Route index element={<ListDashBoard />} />
          <Route path="change-password" element={<ChangePasswordForm />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

library.add(fab, fas, far);
