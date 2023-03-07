import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import AppProvider from "../context/AppProvider";
import ProtectedRoute from "./ProtectedRoute";
import NoteList from "../components/NoteList";
import NoteDetail from "../components/NoteDetail";
import {
  addNewNote,
  NoteDetailLoader,
  NoteLoader,
  updateNote,
} from "../utils/NoteLoader";
import { FolderLoader } from "../utils/FolderLoader";

const AuthProvider = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <HomePage />,
            loader: FolderLoader,
            path: "/",
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                action: addNewNote,
                loader: NoteLoader,
                children: [
                  {
                    element: <NoteDetail />,
                    path: `note/:noteId`,
                    action: updateNote,
                    loader: NoteDetailLoader,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
