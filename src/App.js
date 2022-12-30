import { useState, useEffect } from "react";

// Helper Functions
import shortenRate from "./helperFunctions/shortenRate";

import { humanTime } from "./helperFunctions/timeConverters";

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
  const abstractApiKey = process.env.REACT_APP_ABSTRACT_API_KEY;
  const abstractBaseUrl = process.env.REACT_APP_ABSTRACT_BASE_URL;

  const [primaryAbstractCoin, setPrimaryAbstractCoin] = useState(
    fakeCoinData[4]
  );
  const [secondaryAbstractCoin, setSecondaryAbstractCoin] = useState(
    fakeCoinData[1]
  );
  const [thirdAbstractCoin, setThirdAbstractCoin] = useState(fakeCoinData[2]);

  const [mainCoinSelected, setMainCoinSelected] = useState("bitcoin");
  const [mainGraphTimespan, setMainGraphTimespan] = useState(14);

  const [histDataMainCoin, setHistDataMainCoin] = useState(fakeHistData);

  // Prepares Raw Data for Chart.js

  const [chartData, setChartData] = useState({
    labels: histDataMainCoin.map((data) => humanTime(data.date)),
    datasets: [
      {
        label: "USD Price",
        data: histDataMainCoin.map((data) => shortenRate(data.priceUsd)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 3,
      },
    ],
  });

  const primaryAbstractCoinUrl = `${abstractBaseUrl}/live/?api_key=${abstractApiKey}&base=BTC&target=EUR`;
  const secondaryAbstractCoinUrl = `${abstractBaseUrl}/live/?api_key=${abstractApiKey}&base=ETH&target=EUR`;
  const thirdAbstractCoinUrl = `${abstractBaseUrl}/live/?api_key=${abstractApiKey}&base=DOGE&target=EUR`;

  function handlePrimaryCoinSelection(e) {
    console.log(e.target.alt);
    setMainCoinSelected(e.target.alt);
  }

  function handleTimespan(e) {
    const newTimespan = Number(e.target.value);
    setMainGraphTimespan(newTimespan);
  }

  function fetchAbstractPrimaryCoin() {
    fetch(primaryAbstractCoinUrl)
      .then((res) => res.json())
      .then((data) => {
        setPrimaryAbstractCoin(data);
      });
  }

  function fetchAbstractSecondaryCoin() {
    fetch(secondaryAbstractCoinUrl)
      .then((res) => res.json())
      .then((data) => {
        setSecondaryAbstractCoin(data);
      });
  }

  function fetchAbstractThirdCoin() {
    fetch(thirdAbstractCoinUrl)
      .then((res) => res.json())
      .then((data) => {
        setThirdAbstractCoin(data);
      });
  }

  function refreshCoin(e) {
    const coin = e.target.alt;
    console.log(coin);
    if (coin === "BTC") {
      fetchAbstractPrimaryCoin();
    } else if (coin === "ETH") {
      fetchAbstractSecondaryCoin();
    } else if (coin === "MATIC") {
      fetchAbstractThirdCoin();
    }
  }

  useEffect(() => {
    const mainCoin = mainCoinSelected;
    //const { date, newDate } = urlTime(mainGraphTimespan);
    const timespan = mainGraphTimespan;
    const mainCoinHistUrl = `https://api.coincap.io/v2/assets/${mainCoin}/history?interval=d1`;
    let mainCoinHistData = [];
    fetch(mainCoinHistUrl)
      .then((res) => res.json())
      .then((data) => {
        console.table(data.data.slice(-timespan, data.data.length));
        setHistDataMainCoin(data.data.slice(-timespan, data.data.length));
      });

    setHistDataMainCoin(mainCoinHistData);
  }, [mainCoinSelected, mainGraphTimespan]);

  useEffect(() => {
    setChartData({
      labels: histDataMainCoin.map((data) => humanTime(data.date)),
      datasets: [
        {
          label: "USD Price",
          data: histDataMainCoin.map((data) => shortenRate(data.priceUsd)),
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
          <Stats data={primaryAbstractCoin} handleRefresh={refreshCoin} />
          <Stats data={secondaryAbstractCoin} handleRefresh={refreshCoin} />
          <Stats data={thirdAbstractCoin} handleRefresh={refreshCoin} />
        </div>
        <div className="Half">
          <SubGraph number={1} />
          <SubGraph number={2} />
        </div>
        <div className="Third">
          <Stats data={primaryAbstractCoin} />
          <Stats data={primaryAbstractCoin} />
          <Stats data={primaryAbstractCoin} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
