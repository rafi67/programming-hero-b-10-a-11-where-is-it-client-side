import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Banner from "./Banner";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Header = () => {
  const { pathname: location } = useLocation();
  const { loading } = useContext(AuthContext);
  return (
    <div>
      <Navbar></Navbar>
      {location === "/" && !loading && <Banner className="rounded-xl"></Banner>}
    </div>
  );
};

export default Header;
