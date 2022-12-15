import { useState, useEffect } from "react";

// Helper Functions
import shortenRate from "./helperFunctions/shortenRate";
import humanTime from "./helperFunctions/humanTime";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainGraph from "./components/MainGraph";
import Stats from "./components/Stats";
import SubGraph from "./components/SubGraph";

//import { chartRawData } from "./utils/Data";
import { fakeHistData } from "./utils/fakeHistData";
import { fakeCoinData } from "./utils/fakeCoinData";

function App() {
  const apiKey = process.env.REACT_APP_COIN_API_KEY;

  const [primaryCoin, setPrimaryCoin] = useState(fakeCoinData);
  const [mainCoinSelected, setMainCoinSelected] = useState("BTC");
  const [histDataMainCoin, setHistDataMainCoin] = useState(fakeHistData);

  // Prepares Raw Data for Chart.js

  const [chartData, setChartData] = useState({
    labels: histDataMainCoin.map((data) => humanTime(data.time_period_start)),
    datasets: [
      {
        label: "Dollar Price",
        data: histDataMainCoin.map((data) => shortenRate(data.rate_close)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 3,
      },
    ],
  });

  const actualCoinStateUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/${mainCoinSelected}/EUR?apikey=${apiKey}`;
  const histDataUrl = `https://rest.coinapi.io/v1/exchangerate/${mainCoinSelected}/USD/history?period_id=1DAY&time_start=2022-12-01T00:00:00&time_end=2022-12-14T00:00:00&apikey=${apiKey}`;

  function handlePrimaryCoinSelection(e) {
    setMainCoinSelected(e.target.alt);

    setChartData({
      labels: histDataMainCoin.map((data) => humanTime(data.time_period_start)),
      datasets: [
        {
          label: "Dollar Price",
          data: histDataMainCoin.map((data) => shortenRate(data.rate_close)),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 3,
        },
      ],
    });
  }

  useEffect(() => {
    fetch(actualCoinStateUrl)
      .then((res) => res.json())
      .then((data) => setPrimaryCoin(data));
  }, [actualCoinStateUrl]);

  useEffect(() => {
    console.log(`Fetching Hist Data ${mainCoinSelected}`);
    fetch(histDataUrl)
      .then((res) => res.json())
      .then((data) => setHistDataMainCoin(data));
    console.log(histDataMainCoin);
  }, [histDataUrl]);

  return (
    <div className="App">
      <Navbar />
      <div className="Main">
        <MainGraph
          chartData={chartData}
          handleClick={handlePrimaryCoinSelection}
          coin={mainCoinSelected}
        />
        <div className="Third">
          <Stats data={primaryCoin} />
          <Stats data={primaryCoin} />
          <Stats data={primaryCoin} />
        </div>
        <div className="Half">
          <SubGraph number={1} />
          <SubGraph number={2} />
        </div>
        <div className="Third">
          <Stats data={primaryCoin} />
          <Stats data={primaryCoin} />
          <Stats data={primaryCoin} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
