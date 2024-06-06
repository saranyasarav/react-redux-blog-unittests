import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";
import { fetchUsers } from "./features/users/usersSlice";

store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root")); // Use ReactDOM.createRoot().render() for React 18
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
