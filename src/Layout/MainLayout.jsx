import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <header></header>
            <main>
                <Outlet/>
            </main>
            <footer></footer>
        </div>
    );
};

export default MainLayout;