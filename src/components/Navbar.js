function Navbar() {
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
      <li className="Menu">
        <ul>Main</ul>
        <ul>About</ul>
      </li>
    </div>
  );
}

export default Navbar;
