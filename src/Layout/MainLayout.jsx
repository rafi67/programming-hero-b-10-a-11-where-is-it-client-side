import { Outlet, useLocation } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Pages/Loading";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  const { pathname } = useLocation();

  let path = "";

  path +=
    pathname === "/"
      ? "Home"
      : pathname.charAt(1).toUpperCase() + pathname.slice(2).split("/")[0];

  return (
    <div className="container min-h-screen flex flex-col font-display space-y-2 justify-between mx-auto">
      <header>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{path}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Header></Header>
      </header>
      <ToastContainer position="top-center" />
      <main className="mx-auto w-full text-center overflow-x-hidden">
        {loading ? <Loading></Loading> : <Outlet />}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
