function Navbar({ toggleColorMode, isDarkMode }) {
  return (
    <div className="Navbar">
      <div className="Logo">
        <img
          className="icon"
          src="chart-increasing.png"
          alt="Increasing Chart"
        ></img>
        <p>Investicon</p>
      </div>
      <div className="Menu">
        <li>
          <ul>Main</ul>
          <ul>About</ul>
        </li>
      </div>
      <img
        className="mode-icon"
        src={isDarkMode ? "moon.png" : "sun.png"}
        alt="A symbolic sun"
        onClick={toggleColorMode}
      ></img>
    </div>
  );
}

export default Navbar;
