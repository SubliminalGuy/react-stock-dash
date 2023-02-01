import { useMediaQuery } from "@react-hook/media-query";
import { Link } from "react-router-dom";

function Navbar({ toggleColorMode, isDarkMode }) {
  const isSmallScreen = useMediaQuery("only screen and (max-width: 800px)");

  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <img
          className="navbar-icon"
          src="chart-increasing.png"
          alt="Increasing Chart"
        ></img>
        <p className="navbar-site-name">Investicon</p>
      </div>
      <div className="navbar-sitemap-container">
        {!isSmallScreen && (
          <li className="navbar-page-list">
            <Link className="router-link" to={"/"}>
              <ul>Main</ul>
            </Link>
            <Link className="router-link" to={"/about"}>
              <ul>About</ul>
            </Link>
          </li>
        )}
      </div>
      <div className="navbar-icons-container">
        {isSmallScreen && (
          <img
            src={isDarkMode ? "menu-white.png" : "menu-black.png"}
            alt="menu-icon"
          />
        )}
        <img
          className="navbar-mode-icon"
          src={isDarkMode ? "sun.png" : "moon.png"}
          alt="A symbolic sun"
          onClick={toggleColorMode}
        />
      </div>
    </div>
  );
}

export default Navbar;
