import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Banner from "./Banner";

const Header = () => {
  const { pathname: location } = useLocation();
  return (
    <div>
      <Navbar></Navbar>
      {location === "/" && <Banner className="rounded-xl"></Banner>}
    </div>
  );
};

export default Header;
