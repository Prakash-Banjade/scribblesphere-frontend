import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./Utility.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { CurrentArticleProvider } from "./context/CurrentArticleProvider.jsx";
import { AppThemeProvider } from "./context/AppThemeProvider.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CurrentArticleProvider>
          <AppThemeProvider>
              <App />
          </AppThemeProvider>
        </CurrentArticleProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
