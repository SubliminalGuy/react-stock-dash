import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainGraph from "./components/MainGraph";
import Stats from "./components/Stats";
import SubGraph from "./components/SubGraph";

function App() {
  const apiKey = process.env.REACT_APP_COIN_API_KEY;
  const [primaryCoin, setPrimaryCoin] = useState([]);
  const [mainCoinSelected, setMainCoinSelected] = useState("BTC");

  const coinUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/${mainCoinSelected}/EUR?apikey=${apiKey}`;

  function handlePrimaryCoinSelection(e) {
    setMainCoinSelected(e.target.alt);
  }

  useEffect(() => {
    console.log("coin changed!");
    fetch(coinUrl)
      .then((res) => res.json())
      .then((data) => setPrimaryCoin(data));
  }, [coinUrl]);

  return (
    <div className="App">
      <Navbar />
      <div className="Main">
        <MainGraph
          data={primaryCoin}
          handleClick={handlePrimaryCoinSelection}
        />
        <div className="Third">
          <Stats number={1} />
          <Stats number={2} />
          <Stats number={3} />
        </div>
        <div className="Half">
          <SubGraph number={1} />
          <SubGraph number={2} />
        </div>
        <div className="Third">
          <Stats number={4} />
          <Stats number={5} />
          <Stats number={6} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
