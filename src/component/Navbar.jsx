import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { authUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm px-3 sm:px-4 lg:px-8">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
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
              <Link to={"/alljobs"}>Jobs</Link>
            </li>
            {authUser?.role !== "hr" && (
              <li>
                <Link to={"/apply"}>My Applyed</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 sm:h-7 sm:w-7 text-primary shrink-0"
          >
            <path d="M20 7h-9" />
            <path d="M14 17H5" />
            <circle cx="17" cy="17" r="3" />
            <circle cx="7" cy="7" r="3" />
          </svg>
          <div className="leading-tight">
            <p className="text-base sm:text-xl font-extrabold whitespace-nowrap">
              Jobs <span className="text-primary">Portal</span>
            </p>
            <p className="hidden sm:block text-[10px] tracking-widest text-base-content/50 -mt-1">
              ONLINE JOBS FINDER
            </p>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1 font-medium">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/alljobs"}>Jobs</Link>
          </li>
          {authUser?.role !== "hr" && (
            <li>
              <Link to={"/apply"}>My Applyed</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-2 sm:gap-3">
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
                  <Link to={"/hr/manage-jobs"}>HR Profile</Link>
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
          <>
            <Link
              to={"/login"}
              className="btn btn-sm sm:btn-md btn-outline btn-primary rounded-full px-3 sm:px-6"
            >
              Sign in
            </Link>
            <Link
              to={"/signup"}
              className="btn btn-sm sm:btn-md btn-primary rounded-full px-3 sm:px-6"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
