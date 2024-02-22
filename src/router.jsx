import { Routes, Route, Navigate } from "react-router-dom";
import { useHook }  from './context/use_context';

import Home from "./pages/home";
import Staff from "./pages/staff";
import Login from "./pages/login";
import Host from "./pages/host";
import Listen from "./pages/listen";
import Contact from "./pages/contact";
import NotFound from "./pages/NotFound";

export const Router = () => {
 const { user } = useHook();
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/staff/live_broadcast" element={!user ? <Navigate to="/staff/login" /> : <Host />} />
      <Route path="/staff" element={!user ? <Navigate to="/staff/login" /> : <Staff />} />
      <Route path="/staff/login" element={user ? <Navigate to="/staff" /> : <Login />} />
      <Route path="/streaming" element={<Listen />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};