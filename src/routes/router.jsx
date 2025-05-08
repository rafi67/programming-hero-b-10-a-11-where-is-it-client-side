import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import PageNotFound from "../Pages/PageNotFound";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddLostAndFoundItem from "../Pages/AddLostAndFoundItem";
import PrivateRoute from "./PrivateRoute";
import LostAndFoundItem from "../Pages/LostAndFoundItem";
import Details from "../Pages/Details";
import ManageMyItems from "../Pages/ManageMyItems";
import EditLostAndFoundItem from "../Pages/EditLostAndFoundItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addLostAndFoundItems",
        element: (
          <PrivateRoute>
            <AddLostAndFoundItem></AddLostAndFoundItem>
          </PrivateRoute>
        ),
      },
      {
        path: "/manageMyItems",
        element: (
          <PrivateRoute>
            <ManageMyItems></ManageMyItems>
          </PrivateRoute>
        ),
      },
      {
        path: "/lostAndFoundItems",
        element: <LostAndFoundItem></LostAndFoundItem>,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateItem/:id",
        element: (
          <PrivateRoute>
            <EditLostAndFoundItem></EditLostAndFoundItem>
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <PageNotFound></PageNotFound>,
  },
]);

export default router;
