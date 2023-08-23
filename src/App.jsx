import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";

import SignUp from "./features/auth/SignUp"
import Login from "./features/auth/Login"
import Public_main from "./components/Public_home/Public_main";
import NotFound from "./components/404";


const Dash = lazy(() => import("./features/user/Dash/Dash"));
const Layout = lazy(() => import("./components/layout/Layout"));
const SingleArticlePage = lazy(() => import("./features/article/SingleArticlePage"))
const ArticlesList = lazy(() => import("./features/article/ArticlesList"));
const MyProfile = lazy(() => import("./features/user/MyProfile"));

const MyArticles = lazy(() => import("./features/article/MyArticles"));
const CreateArticle = lazy(() => import("./features/article/CreateArticle"));
const UpdateArticle = lazy(() => import("./features/article/UpdateArticle"));
import SearchArticles from "./features/article/SearchArticles";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAppTheme from "./hooks/useAppTheme";
import { SnackbarProvider } from 'notistack';
const SingleUserPage = lazy(() => import("./features/user/SingleUserPage"));
const AllUsers = lazy(() => import("./features/user/AllUsers"));

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
      secondary: {
        main: dark ? '#f2f2f2' : '#232323'
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {

          },
          contained: {
            color: 'white',
            '&:hover': {
              opacity: .8
            }
          },
          outlined: {
          },
          text: {
            background: 'transparent',
            border: 'none',
            '&:hover': {
              background: 'transparent',
              border: 'none',
            }
          }
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: dark ? "white" : "#343434",
            "&:hover": {
              backgroundColor: dark ? "rgb(55, 55, 55)" : "rgb(0 0 10 / .1)",
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
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Routes path="/*">
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* private routes */}
          <Route element={<PersistLogin />}>
            <Route
              path="/"
              element={!token ? <Public_main /> : <Navigate to="/dash" />}
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
                <Route path="/authors">
                  <Route index element={<AllUsers />} />
                  <Route path=":id" element={<SingleUserPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
            {/* </Route> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
