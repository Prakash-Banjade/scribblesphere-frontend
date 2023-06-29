import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import SetHomePage from "./features/auth/SetHomePage";

import Navbar from "./components/Navbar/Navbar";
const Dash = lazy(() => import("./features/auth/Dash"));
const PublicHome = lazy(() => import("./components/PublicHome"));
const SignUp = lazy(() => import("./features/auth/SignUp"));
const Login = lazy(() => import("./features/auth/Login"));

import Loader from "./components/Loader";
import SingleArticlePage from "./features/article/SingleArticlePage";
import ArticlesList from "./features/article/ArticlesList";
import MyArticles from "./features/article/MyArticles";
import CreateArticle from "./features/article/CreateArticle";
import NotFound from "./components/404";
import SearchArticles from "./features/article/SearchArticles";
import UpdateArticle from "./features/article/UpdateArticle";
import CanAccessUpdate from "./features/article/CanAccessUpdate";
import MyProfile from "./features/auth/MyProfile";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";
import Home from "./features/auth/Home";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [location]);

  const token = useSelector(selectCurrentToken);

  return (
    <Suspense fallback={<Loader />}>
      <Routes path="/*">
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route
            path="/"
            element={!token ? <PublicHome /> : <Navigate to="/dash" />}
          />
          <Route element={<RequireAuth authorizedRoles={[2059]} />}>
            <Route element={<Home />}>
              <Route index path="/dash" element={<Dash />} />
              <Route path="/articles">
                <Route index element={<ArticlesList />} />
                <Route path="myarticles" element={<MyArticles />} />
                <Route path="create" element={<CreateArticle />} />
                <Route element={<CanAccessUpdate />}>
                  <Route path="edit" element={<UpdateArticle />} />
                </Route>
                <Route path="search" element={<SearchArticles />} />
                <Route path=":id" element={<SingleArticlePage />} />
              </Route>
              <Route path="/profile" element={<MyProfile />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          {/* </Route> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
