import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./features/auth/Login";
import Dash from "./features/auth/Dash";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth authorizedRoles={[2059]} />}>
            <Route path="/dash" element={<Dash />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
