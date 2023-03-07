import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./firebase/config";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
