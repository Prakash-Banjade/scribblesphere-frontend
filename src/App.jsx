import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import SetHomePage from "./features/auth/SetHomePage";

import Navbar from "./components/Navbar";
const Dash = lazy(() => import("./features/auth/Dash"));
const PublicHome = lazy(() => import("./components/PublicHome"));
const SignUp = lazy(() => import("./components/SignUp"));
const Login = lazy(() => import("./features/auth/Login"));

import Loader from "./components/Loader";
import SingleArticlePage from "./features/article/SingleArticlePage";
import ArticlesList from "./features/article/ArticlesList";
import MyArticles from "./features/article/MyArticles";
import CreateArticle from "./features/article/CreateArticle";

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* private routes */}
          <Route element={<PersistLogin />}>
            <Route element={<SetHomePage />}>
              <Route path="/" element={<PublicHome />} />
            </Route>
            <Route element={<RequireAuth authorizedRoles={[2059]} />}>
              <Route path="/dash" element={<Dash />} />
              <Route path="/articles">
                <Route index element={<ArticlesList />} />
                <Route path="myarticles" element={<MyArticles />} />
                <Route path="create" element={<CreateArticle />} />
                <Route path=":id" element={<SingleArticlePage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
