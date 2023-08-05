import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";

const Dash = lazy(() => import("./features/user/Dash"));
const PublicHome = lazy(() => import("./components/PublicHome"));
const SignUp = lazy(() => import("./features/auth/SignUp"));
const Login = lazy(() => import("./features/auth/Login"));
const Layout = lazy(() => import("./components/layout/Layout"));
const SingleArticlePage = lazy(() => import("./features/article/SingleArticlePage"))
const ArticlesList = lazy(() => import("./features/article/ArticlesList"));
const MyProfile = lazy(() => import("./features/user/MyProfile"));

import Loader from "./components/Loader";
const MyArticles = lazy(() => import("./features/article/MyArticles"));
const CreateArticle = lazy(() => import("./features/article/CreateArticle"));
import NotFound from "./components/404";
import SearchArticles from "./features/article/SearchArticles";
import UpdateArticle from "./features/article/UpdateArticle";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAppTheme from "./hooks/useAppTheme";
import { SnackbarProvider } from 'notistack';

const App = () => {
  const location = useLocation();
  const { dark } = useAppTheme();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [location]);

  const token = useSelector(selectCurrentToken);

  const theme = createTheme({
    palette: {
      primary: {
        // main: "#be0b44", // red primary
        main: '#0bbe64', // green primary
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#0bbe64',
            '&:hover': {
              backgroundColor: '#0bbe64',
              opacity: .9
            }
          },
          outlined: {
            background: 'transparent',
            '&:hover': {
              opacity: 1,
              background: 'rgb(0 0 0 / 0.05)',
            }
          }
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: dark ? "white" : "#343434",
            "&:hover": {
              backgroundColor: dark ? "rgb(35, 35, 35)" : "rgb(0 0 10 / .1)",
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: 'var(--text-100)',
          }
        }
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
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
                <Route element={<Layout />}>
                  <Route index path="/dash" element={<Dash />} />
                  <Route path="/articles">
                    <Route index element={<ArticlesList />} />
                    <Route path="myarticles" element={<MyArticles />} />
                    <Route path="create" element={<CreateArticle />} />
                    <Route path="search" element={<SearchArticles />} />
                    <Route path=":id">
                      <Route index element={<SingleArticlePage />} />
                      <Route path="edit" element={<UpdateArticle />} />
                    </Route>

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
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
