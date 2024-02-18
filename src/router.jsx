import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Staff from "./pages/staff";
import Login from "./pages/login";
import Host from "./pages/host";
import Listen from "./pages/listen";
import NotFound from "./pages/NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/staff/live_broadcast" element={<Host />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/staff/login" element={<Login />} />
      <Route path="/streaming" element={<Listen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};