import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const MainLayout = () => {
    return (
        <div className='container min-h-screen flex flex-col space-y-2 justify-between mx-auto'>
            <header>
                <Header></Header>
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