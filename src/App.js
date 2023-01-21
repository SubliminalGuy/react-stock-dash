import { useState, useEffect } from "react";

// Helper Functions
import { shortenRate, shortenBig } from "./helperFunctions/shortenRate";
import { humanTime } from "./helperFunctions/timeConverters";
import filterAllAssets from "./helperFunctions/filterAllAssets";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainGraph from "./components/MainGraph";
import Stats from "./components/Stats";
import SubGraph from "./components/SubGraph";

//import { chartRawData } from "./utils/Data";
import { fakeHistData } from "./utils/fakeHistData";
import { fakeCoinData } from "./utils/fakeCoinData";
import { fakeAssetData } from "./utils/fakeAssetData";

function App() {
  const baseUrl = process.env.REACT_APP_COINCAP_BASE_URL;

  const [primaryCoin, setPrimaryCoin] = useState(fakeCoinData[0]);
  const [secondaryCoin, setSecondaryCoin] = useState(fakeCoinData[1]);
  const [thirdCoin, setThirdCoin] = useState(fakeCoinData[2]);
  const [fourthCoin, setFourthCoin] = useState(fakeCoinData[3]);
  const [fifthCoin, setFifthCoin] = useState(fakeCoinData[4]);
  const [sixthCoin, setSixthCoin] = useState(fakeCoinData[5]);

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("myScheme") === "true"
  );

  const [mainCoinSelected, setMainCoinSelected] = useState("bitcoin");
  const [mainGraphTimespan, setMainGraphTimespan] = useState(7);

  const [histDataMainCoin, setHistDataMainCoin] = useState(fakeHistData);

  const [marketCapData, setMarketCapData] = useState(
    filterAllAssets(fakeAssetData)
  );

  // Prepares Raw Data for Chart.js Main Graph

  const [chartData, setChartData] = useState({
    labels: histDataMainCoin.map((data) => humanTime(data.date)),
    datasets: [
      {
        label: "$ Price",
        data: histDataMainCoin.map((data) => shortenRate(data.priceUsd)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
      },
    ],
  });

  // Prepares Data for Chart.js Market Cap Histogram

  const marketCapChartData = {
    labels: marketCapData.map((item) => item.symbol),
    datasets: [
      {
        label: "Market Cap USD",
        data: marketCapData.map((item) => shortenBig(item.marketCapUsd)),
      },
    ],
  };

  // Set the initial Dark Mode preference that comes from local Storage
  setColorMode();

  function handlePrimaryCoinSelection(e) {
    //console.log(e.target.alt);
    setMainCoinSelected(e.target.alt);
  }

  function handleTimespan(e) {
    const newTimespan = Number(e.target.value);
    setMainGraphTimespan(newTimespan);
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

  // Fetches the individual coin by user selection

  function fetchPrimaryCoin(coinshort) {
    fetch(`${baseUrl}/assets/${coinshort}`)
      .then((res) => res.json())
      .then((data) => {
        setPrimaryCoin(data);
      });
  }

  function fetchSecondaryCoin(coinshort) {
    fetch(`${baseUrl}/assets/${coinshort}`)
      .then((res) => res.json())
      .then((data) => {
        setSecondaryCoin(data);
      });
  }

  function fetchThirdCoin(coinshort) {
    fetch(`${baseUrl}/assets/${coinshort}`)
      .then((res) => res.json())
      .then((data) => {
        setThirdCoin(data);
      });
  }

  function fetchFourthCoin(coinshort) {
    fetch(`${baseUrl}/assets/${coinshort}`)
      .then((res) => res.json())
      .then((data) => {
        setFourthCoin(data);
      });
  }

  function fetchFifthCoin(coinshort) {
    fetch(`${baseUrl}/assets/${coinshort}`)
      .then((res) => res.json())
      .then((data) => {
        setFifthCoin(data);
      });
  }

  function fetchSixthCoin(coinshort) {
    fetch(`${baseUrl}/assets/${coinshort}`)
      .then((res) => res.json())
      .then((data) => {
        setSixthCoin(data);
      });
  }

  function refreshCoin(symbol) {
    const coin = symbol;
    console.log(coin);
    if (coin === "BTC") {
      fetchPrimaryCoin("bitcoin");
    } else if (coin === "ETH") {
      fetchSecondaryCoin("ethereum");
    } else if (coin === "DOGE") {
      fetchThirdCoin("dogecoin");
    } else if (coin === "MATIC") {
      fetchFourthCoin("polygon");
    } else if (coin === "SOL") {
      fetchFifthCoin("solana");
    } else if (coin === "DAI") {
      fetchSixthCoin("multi-collateral-dai");
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
        setHistDataMainCoin(data.data.slice(-timespan, data.data.length));
      });

    setHistDataMainCoin(mainCoinHistData);
  }, [mainCoinSelected, mainGraphTimespan]);

  useEffect(() => {
    setChartData({
      labels: histDataMainCoin.map((data) => humanTime(data.date)),
      datasets: [
        {
          label: "$ Price",
          data: histDataMainCoin.map((data) => shortenRate(data.priceUsd)),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 2,
        },
      ],
    });
  }, [histDataMainCoin]);

  return (
    <div className="App">
      <Navbar toggleColorMode={toggleColorMode} isDarkMode={isDarkMode} />
      <div className="Main">
        <MainGraph
          isDarkMode={isDarkMode}
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
          <SubGraph number={1} data={marketCapChartData} />
          <SubGraph number={2} data={marketCapChartData} />
        </div>
        <div className="Third">
          <Stats data={fourthCoin} handleRefresh={refreshCoin} />
          <Stats data={fifthCoin} handleRefresh={refreshCoin} />
          <Stats data={sixthCoin} handleRefresh={refreshCoin} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
