import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
    return (
        <div className='container min-h-screen flex flex-col space-y-2 justify-between mx-auto'>
            <header>
                <Navbar></Navbar>
            </header>
            <main className="mx-auto">
                <Outlet/>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;