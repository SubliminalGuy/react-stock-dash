import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainGraph from "./components/MainGraph";
import Stats from "./components/Stats";
import SubGraph from "./components/SubGraph";

function App() {
  const apiKey = process.env.REACT_APP_COIN_API_KEY;

  const [primaryCoin, setPrimaryCoin] = useState({
    time: "2022-12-15T09:45:09.0000000Z",
    asset_id_base: "BTC",
    asset_id_quote: "EUR",
    rate: 16593.772372547216268745901526,
  });
  const [mainCoinSelected, setMainCoinSelected] = useState("BTC");
  const [histDataMainCoin, setHistDataMainCoin] = useState([
    {
      time_period_start: "2022-12-13T00:00:00.0000000Z",
      time_period_end: "2022-12-14T00:00:00.0000000Z",
      time_open: "2022-12-13T00:00:00.0000000Z",
      time_close: "2022-12-13T23:59:00.0000000Z",
      rate_open: 17211.898765449856,
      rate_high: 17946.24984045843,
      rate_low: 17097.440060477966,
      rate_close: 17774.755745344482,
    },
    {
      time_period_start: "2022-12-14T00:00:00.0000000Z",
      time_period_end: "2022-12-15T00:00:00.0000000Z",
      time_open: "2022-12-14T00:00:00.0000000Z",
      time_close: "2022-12-14T00:00:00.0000000Z",
      rate_open: 17772.123388645774,
      rate_high: 17772.123388645774,
      rate_low: 17772.123388645774,
      rate_close: 17772.123388645774,
    },
  ]);

  const actualCoinStateUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/${mainCoinSelected}/EUR?apikey=${apiKey}`;
  const histDataUrl = `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1DAY&time_start=2022-12-01T00:00:00&time_end=2022-12-14T00:00:00&apikey=${apiKey}`;

  function handlePrimaryCoinSelection(e) {
    setMainCoinSelected(e.target.alt);
  }

  console.log(histDataMainCoin);

  useEffect(() => {
    console.log("Fetching Coin Data");
    fetch(actualCoinStateUrl)
      .then((res) => res.json())
      .then((data) => setPrimaryCoin(data));
  }, [actualCoinStateUrl]);

  useEffect(() => {
    fetch(histDataUrl)
      .then((res) => res.json())
      .then((data) => setHistDataMainCoin(data));
  }, [histDataUrl]);

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
