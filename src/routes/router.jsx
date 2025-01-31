import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import PageNotFound from "../Pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: "/",
            element: <Home></Home>,
        }
    ],
    errorElement: <PageNotFound></PageNotFound>,
  },
]);

export default router;