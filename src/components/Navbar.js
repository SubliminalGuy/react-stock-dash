function Navbar({ toggleColorMode, isDarkMode }) {
  return (
    <div className="navbar-container">
      <div className="Logo">
        <img
          className="icon"
          src="chart-increasing.png"
          alt="Increasing Chart"
        ></img>
        <p className="investicon">Investicon</p>
      </div>
      <div className="Menu">
        <li className="page-selector">
          <ul>Main</ul>
          <ul>About</ul>
        </li>
      </div>
      <img
        className="mode-icon"
        src={isDarkMode ? "sun.png" : "moon.png"}
        alt="A symbolic sun"
        onClick={toggleColorMode}
      ></img>
    </div>
  );
}

export default Navbar;
