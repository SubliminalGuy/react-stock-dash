function Navbar({ toggleColorMode, isDarkMode }) {
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
        <li className="navbar-page-list">
          <ul>Main</ul>
          <ul>About</ul>
        </li>
      </div>
      <img
        className="navbar-mode-icon"
        src={isDarkMode ? "sun.png" : "moon.png"}
        alt="A symbolic sun"
        onClick={toggleColorMode}
      ></img>
    </div>
  );
}

export default Navbar;
