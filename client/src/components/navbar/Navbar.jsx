import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { logout } from "../../reducers/userReducer";

const NavLinks = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();
  return (
    <>
      {!isAuth ? (
        <>
          <NavLink
            className="no-underline text-gray-800 font-semibold hover:text-gray-600"
            to="login"
          >
            Sign In
          </NavLink>
          <NavLink
            className="no-underline text-gray-800 font-semibold hover:text-gray-600"
            to="registration"
          >
            Sign Up
          </NavLink>
        </>
      ) : (
        <NavLink
          className="no-underline text-gray-800 font-semibold hover:text-gray-600"
          to="login"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log out
        </NavLink>
      )}
    </>
  );
};

export const ResponsiveNavBar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div className="border-y border-b-slate-900">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && (
        <MobileMenu>
          <NavLinks />
        </MobileMenu>
      )}
    </div>
  );
};

const Navbar = ({ menuOpen, setMenuOpen }) => (
  <div className="flex items-center justify-around p-3">
    <div className="flex items-center">
      <CloudSvg />
      <NavLink
        to="/"
        className="text-xl font-bold no-underline text-gray-800 hover:text-gray-600"
      >
        DCloud
      </NavLink>
    </div>
    <nav className="hidden md:block space-x-6">
      <NavLinks />
    </nav>
    <button
      type="button"
      aria-label="Toggle mobile menu"
      onClick={() => setMenuOpen(!menuOpen)}
      className="rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
    >
      <MenuAlt4Svg menuOpen={menuOpen} />
    </button>
  </div>
);

const MobileMenu = ({ children }) => (
  <nav className="p-4 flex flex-col space-y-3 md:hidden">{children}</nav>
);

const CloudSvg = () => (
  <svg width="10%" height="10%" viewBox="0 0 380 200" xmlSpace="preserve">
    <g transform="matrix(1,0,0,1,7.5,7.5)">
      <g>
        <path d="M125.25,47.844C141.085,20.752 170.482,2.536 204.1,2.536C244.125,2.536 278.167,28.357 290.461,64.237C294.455,63.393 298.597,62.95 302.841,62.95C335.818,62.95 362.591,89.723 362.591,122.7C362.591,155.677 335.818,182.45 302.841,182.45L55.471,182.455C26.28,182.455 2.58,158.755 2.58,129.564C2.58,100.373 26.28,76.673 55.471,76.673C59.085,76.673 62.615,77.036 66.026,77.729C78.145,59.668 98.752,47.772 122.116,47.772C123.167,47.772 124.212,47.796 125.25,47.844Z" />
      </g>
    </g>
  </svg>
);

const MenuAlt4Svg = ({ menuOpen }) => (
  <svg
    className={`transition duration-100 ease h-8 w-8 ${
      menuOpen ? "transform rotate-90" : ""
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
