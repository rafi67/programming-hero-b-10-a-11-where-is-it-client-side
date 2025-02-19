import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-xl rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link>Lost & Found Items</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">
          WhereIsIt
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="font-bold" to="/">
              Home
            </Link>
          </li>
          {user && user?.email && (
            <li>
              <Link to="/lostAndFoundItems">Lost & Found Items</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end space-x-4">
        {user && user?.email && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
                <div className="w-10">
                  <img
                    className="rounded-full"
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/addLostAndFoundItems'>Add Lost & Found Items</Link>
              </li>
              <li>
                <a>All Recovered Items</a>
              </li>
              <li>
                <a>Manage My Items</a>
              </li>
            </ul>
          </div>
        )}

        {
          user && user?.email && <p>{user.displayName}</p>
        }

        {user && user?.email ? (
          <a className="btn" onClick={logOut}>
            Logout
          </a>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
