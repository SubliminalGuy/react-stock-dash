import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainGraph from "./components/MainGraph";
import Stats from "./components/Stats";
import SubGraph from "./components/SubGraph";

import { chartRawData } from "./utils/Data";
import { fakeHistData } from "./utils/fakeHistData";
import { fakeCoinData } from "./utils/fakeCoinData";

function App() {
  // const apiKey = process.env.REACT_APP_COIN_API_KEY;

  const [primaryCoin, setPrimaryCoin] = useState(fakeCoinData);
  const [mainCoinSelected, setMainCoinSelected] = useState("BTC");
  const [histDataMainCoin, setHistDataMainCoin] = useState(fakeHistData);

  // Prepares Raw Data for Chart.js

  const [chartData, setChartData] = useState({
    labels: chartRawData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: chartRawData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  //const actualCoinStateUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/${mainCoinSelected}/EUR?apikey=${apiKey}`;
  // const histDataUrl = `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1DAY&time_start=2022-12-01T00:00:00&time_end=2022-12-14T00:00:00&apikey=${apiKey}`;

  function handlePrimaryCoinSelection(e) {
    setMainCoinSelected(e.target.alt);
  }

  // useEffect(() => {
  //   console.log("Fetching Coin Data");
  //   fetch(actualCoinStateUrl)
  //     .then((res) => res.json())
  //     .then((data) => setPrimaryCoin(data));
  // }, [actualCoinStateUrl]);

  // useEffect(() => {
  //   fetch(histDataUrl)
  //     .then((res) => res.json())
  //     .then((data) => setHistDataMainCoin(data));
  // }, [histDataUrl]);

  return (
    <div className="App">
      <Navbar />
      <div className="Main">
        <MainGraph
          chartData={chartData}
          handleClick={handlePrimaryCoinSelection}
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
