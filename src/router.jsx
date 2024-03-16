import { Routes, Route, Navigate } from "react-router-dom";
import { useHook }  from './context/use_context';

import Home from "./pages/home";
import Staff from "./pages/staff";
import Update from "./pages/update";
import Login from "./pages/login";
import Host from "./pages/host";
import Listen from "./pages/listen";
import Stream from "./pages/stream";
import Contact from "./pages/contact";
import NotFound from "./pages/NotFound";

export const Router = () => {
 const { user } = useHook();
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/staff/live_broadcast" element={!user ? <Navigate to="/staff/login" /> : <Host />} />
      <Route path="/staff" element={!user ? <Navigate to="/staff/login" /> : <Staff />} />
      <Route path="/staff/update" element={!user ? <Navigate to="/staff/login" /> : <Update />} />
      <Route path="/staff/login" element={user ? <Navigate to="/staff" /> : <Login />} />
      <Route path="/live-streaming" element={<Listen />} />
      <Route path="/streams" element={<Stream />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};