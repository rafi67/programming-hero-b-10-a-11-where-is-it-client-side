import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Pages/Loading";

const MainLayout = () => {

    const { loading } = useContext(AuthContext);

    return (
        <div className='container min-h-screen flex flex-col font-display space-y-2 justify-between mx-auto'>
            <header>
                <Header></Header>
            </header>
            <main className="mx-auto">
                {
                    loading ? <Loading></Loading> : <Outlet/>
                }
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;