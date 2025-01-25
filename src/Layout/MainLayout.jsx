import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
    return (
        <div className='container min-h-screen flex flex-col'>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer></footer>
        </div>
    );
};

export default MainLayout;