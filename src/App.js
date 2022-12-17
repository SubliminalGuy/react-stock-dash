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

  const [primaryCoin, setPrimaryCoin] = useState(fakeCoinData[0]);
  const [secondaryCoin, setSecondaryCoin] = useState(fakeCoinData[1]);
  const [thirdCoin, setThirdCoin] = useState(fakeCoinData[2]);
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

  const primaryCoinUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/BTC/EUR?apikey=${apiKey}`;
  const secondaryCoinUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/ETH/EUR?apikey=${apiKey}`;

  async function handlePrimaryCoinSelection(e) {
    const mainCoin = e.target.alt;
    setMainCoinSelected(e.target.alt);

    const mainCoinHistUrl = `https://rest.coinapi.io/v1/exchangerate/${mainCoin}/EUR/history?period_id=1DAY&time_start=2022-12-02T00:00:00&time_end=2022-12-17T00:00:00&apikey=${apiKey}`;

    console.log(`Fetching Hist Data ${mainCoin}`);
    let mainCoinHistData = [];
    await fetch(mainCoinHistUrl)
      .then((res) => res.json())
      .then((data) => (mainCoinHistData = data));

    setHistDataMainCoin(mainCoinHistData);
    console.log(mainCoinHistData[15]);
    setChartData({
      labels: mainCoinHistData.map((data) => humanTime(data.time_period_start)),
      datasets: [
        {
          label: "Dollar Price",
          data: mainCoinHistData.map((data) => shortenRate(data.rate_close)),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 3,
        },
      ],
    });
  }

  // useEffect(() => {
  //   fetch(primaryCoinUrl)
  //     .then((res) => res.json())
  //     .then((data) => setPrimaryCoin(data));
  //   fetch(secondaryCoinUrl)
  //     .then((res) => res.json())
  //     .then((data) => setSecondaryCoin(data));
  // }, [primaryCoinUrl, secondaryCoinUrl]);

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
          <Stats data={secondaryCoin} />
          <Stats data={thirdCoin} />
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
