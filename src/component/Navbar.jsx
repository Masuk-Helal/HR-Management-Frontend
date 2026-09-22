import React, { useContext } from "react";
import { Link, Links } from "react-router";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthProvider";
import SignUp from "./../pages/SignUp";

const Navbar = () => {
  const { authUser, logout } = useContext(AuthContext);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/alljobs"}>All Jobs</Link>
              </li>
              <li>
                <Link to={"/apply"}>My Applyed</Link>
              </li>
              
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/alljobs"}>All Jobs</Link>
            </li>
            <li>
              <Link to={"/apply"}>My Applyed</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle avatar avatar-placeholder"
              >
                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                  <span>{authUser?.sub?.[0]?.toUpperCase()}</span>
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >

                {authUser?.role === "hr" && (
                  <li>
                    <Link to={"/hr"}>HR Profile</Link>
                  </li>
                )}

                <li>
                  <Link to={"/profile"}>User Profile</Link>
                </li>
                <li>
                  <Link to={"/change-password"}>Change Password</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="btn">
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
