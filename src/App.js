import { useState, useEffect } from "react";

// Helper Functions
import shortenRate from "./helperFunctions/shortenRate";

import { urlTime, humanTime } from "./helperFunctions/timeConverters";

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
  const [fourthCoin, setFourthCoin] = useState(fakeCoinData[3]);
  const [mainCoinSelected, setMainCoinSelected] = useState("BTC");
  const [mainGraphTimespan, setMainGraphTimespan] = useState(14);
  const [mainGraphPeriod, setMainGraphPeriod] = useState("1DAY");

  const [histDataMainCoin, setHistDataMainCoin] = useState(fakeHistData);

  // Prepares Raw Data for Chart.js

  const [chartData, setChartData] = useState({
    labels: histDataMainCoin.map((data) => humanTime(data.time_period_start)),
    datasets: [
      {
        label: "Euro Price",
        data: histDataMainCoin.map((data) => shortenRate(data.rate_close)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 3,
      },
    ],
  });

  const primaryCoinUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/BTC/EUR?apikey=${apiKey}`;
  const secondaryCoinUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/ETH/EUR?apikey=${apiKey}`;
  const thirdCoinUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/MATIC/EUR?apikey=${apiKey}`;
  const fourthCoinUrl = `https://rest-sandbox.coinapi.io/v1/exchangerate/SOL/EUR?apikey=${apiKey}`;

  function handlePrimaryCoinSelection(e) {
    setMainCoinSelected(e.target.alt);
  }

  function handleTimespan(e) {
    const newTimespan = Number(e.target.value);
    setMainGraphTimespan(newTimespan);
    if (newTimespan > 30) {
      setMainGraphPeriod("5DAY");
    } else if (newTimespan >= 14) {
      setMainGraphPeriod("2DAY");
    } else {
      setMainGraphPeriod("1DAY");
    }
  }

  function fetchPrimaryCoin() {
    fetch(primaryCoinUrl)
      .then((res) => res.json())
      .then((data) => {
        setPrimaryCoin(data);
      });
  }

  function fetchSecondaryCoin() {
    fetch(secondaryCoinUrl)
      .then((res) => res.json())
      .then((data) => {
        setSecondaryCoin(data);
      });
  }

  function fetchThirdCoin() {
    fetch(thirdCoinUrl)
      .then((res) => res.json())
      .then((data) => {
        setThirdCoin(data);
      });
  }

  function fetchFourthCoin() {
    fetch(fourthCoinUrl)
      .then((res) => res.json())
      .then((data) => {
        setFourthCoin(data);
      });
  }

  function refreshCoin(e) {
    const coin = e.target.alt;
    if (coin === "BTC") {
      fetchPrimaryCoin();
    } else if (coin === "ETH") {
      fetchSecondaryCoin();
    } else if (coin === "MATIC") {
      fetchThirdCoin();
    } else if (coin === "SOL") {
      fetchFourthCoin();
    }
  }

  useEffect(() => {
    const mainCoin = mainCoinSelected;
    const { date, newDate } = urlTime(mainGraphTimespan);
    const period = mainGraphPeriod;
    const mainCoinHistUrl = `https://rest.coinapi.io/v1/exchangerate/${mainCoin}/EUR/history?period_id=${period}&time_start=${newDate}&time_end=${date}&apikey=${apiKey}`;
    let mainCoinHistData = [];
    fetch(mainCoinHistUrl)
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        setHistDataMainCoin(data);
      });

    setHistDataMainCoin(mainCoinHistData);
  }, [mainCoinSelected, mainGraphTimespan, mainGraphPeriod, apiKey]);

  useEffect(() => {
    setChartData({
      labels: histDataMainCoin.map((data) => humanTime(data.time_period_start)),
      datasets: [
        {
          label: "Euro Price",
          data: histDataMainCoin.map((data) => shortenRate(data.rate_close)),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 3,
        },
      ],
    });
  }, [histDataMainCoin]);

  return (
    <div className="App">
      <Navbar />
      <div className="Main">
        <MainGraph
          chartData={chartData}
          handleClick={handlePrimaryCoinSelection}
          handleTimespan={handleTimespan}
          timespan={mainGraphTimespan}
          coin={mainCoinSelected}
        />
        <div className="Third">
          <Stats data={primaryCoin} handleRefresh={refreshCoin} />
          <Stats data={secondaryCoin} handleRefresh={refreshCoin} />
          <Stats data={thirdCoin} handleRefresh={refreshCoin} />
        </div>
        <div className="Half">
          <SubGraph number={1} />
          <SubGraph number={2} />
        </div>
        <div className="Third">
          <Stats data={fourthCoin} handleRefresh={refreshCoin} />
          <Stats data={primaryCoin} />
          <Stats data={primaryCoin} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
