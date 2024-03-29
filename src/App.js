import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./routes/Main";
import About from "./routes/About";

//import { chartRawData } from "./utils/Data";
//import { fakeHistData } from "./utils/fakeHistData";
//import { fakeCoinData } from "./utils/fakeCoinData";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("myScheme") === "true"
  );

  const [showModal, setShowModal] = useState(false);

  function menuIconClick() {
    const modal = !showModal;
    setShowModal(modal);
  }

  function toggleColorMode() {
    const darkMode = !isDarkMode;
    setIsDarkMode(darkMode);
    localStorage.setItem("myScheme", darkMode);
  }

  function setColorMode() {
    if (isDarkMode === false) {
      document.documentElement.style.setProperty(
        "--background-color",
        "rgb(241 245 249)"
      );
      document.documentElement.style.setProperty("--font-color", "#1F2937");
      document.documentElement.style.setProperty("--border-color", "#60A5FA");
    }
    if (isDarkMode === true) {
      document.documentElement.style.setProperty(
        "--background-color",
        "#282c34"
      );
      document.documentElement.style.setProperty("--font-color", "#e2e8f0");
      document.documentElement.style.setProperty("--border-color", "#4f46e5");
    }
  }

  // Set the initial Dark Mode preference that comes from local Storage
  setColorMode();

  return (
    <div className="App">
      <BrowserRouter>
        {!showModal && (
          <>
            <Navbar
              toggleColorMode={toggleColorMode}
              menuIconClick={menuIconClick}
              isDarkMode={isDarkMode}
            />
            <Routes>
              <Route path="/" element={<Main isDarkMode={isDarkMode} />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </>
        )}
        {showModal && (
          <div className="modal">
            <div className="modal-link-container">
              <Link className="modal-link" onClick={menuIconClick} to={"/"}>
                Main
              </Link>
            </div>
            <div className="modal-link-container">
              <Link
                className="modal-link"
                onClick={menuIconClick}
                to={"/about"}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
