import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Pages/Loading";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  

  return (
    <div className="container min-h-screen flex flex-col font-display space-y-2 justify-between mx-auto">
      <header>{!loading && <Header></Header>}</header>
      <ToastContainer position="top-center" />
      <main className="mx-auto w-full">
        {loading ? <Loading></Loading> : <Outlet />}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
