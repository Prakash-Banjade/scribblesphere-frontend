import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./Utility.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
// import { CurrentArticleProvider } from "./context/CurrentArticleProvider.jsx";
import { AppThemeProvider } from "./context/AppThemeProvider.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="272699469610-soqhg941qflshb8bsp4brdpe193d1if0.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
