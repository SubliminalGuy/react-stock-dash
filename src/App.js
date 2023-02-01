import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Helper Functions
import { shortenRate, shortenBig } from "./helperFunctions/shortenRate";
import { humanTime } from "./helperFunctions/timeConverters";
import filterAllAssets from "./helperFunctions/filterAllAssets";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./routes/Main";
import About from "./routes/About";

//import { chartRawData } from "./utils/Data";
//import { fakeHistData } from "./utils/fakeHistData";
//import { fakeCoinData } from "./utils/fakeCoinData";
import { fakeAssetData } from "./utils/fakeAssetData";

function App() {
  const baseUrl = process.env.REACT_APP_COINCAP_BASE_URL;

  const [allCoinData, setAllCoinData] = useState(fakeAssetData);
  const [primaryCoin, setPrimaryCoin] = useState(allCoinData.data[0]);
  const [secondaryCoin, setSecondaryCoin] = useState(allCoinData.data[1]);
  const [thirdCoin, setThirdCoin] = useState(allCoinData.data[8]);
  const [fourthCoin, setFourthCoin] = useState(fakeAssetData.data[9]);
  const [fifthCoin, setFifthCoin] = useState(fakeAssetData.data[10]);
  const [sixthCoin, setSixthCoin] = useState(fakeAssetData.data[16]);
  const [coinDataTimestamp, setCoinDataTimestamp] = useState(
    allCoinData.timestamp
  );

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("myScheme") === "true"
  );

  const [mainCoinSelected, setMainCoinSelected] = useState("bitcoin");
  const [mainGraphTimespan, setMainGraphTimespan] = useState(7);

  const [histDataMainCoin, setHistDataMainCoin] = useState([]);

  const [marketCapData, setMarketCapData] = useState(
    filterAllAssets(fakeAssetData.data)
  );

  // Prepares Raw Data for Chart.js Main Graph

  const [chartData, setChartData] = useState(null);

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

  const marketSupplyData = {
    labels: marketCapData.map((item) => item.symbol),
    datasets: [
      {
        label: "Coin Market Supply",
        data: marketCapData.map((item) => shortenRate(item.supply)),
      },
    ],
  };

  // Set the initial Dark Mode preference that comes from local Storage
  setColorMode();

  function handlePrimaryCoinSelection(e) {
    setMainCoinSelected(e.target.alt);
  }

  function setAsMainCoin(name) {
    name = name.toLowerCase().split(" ").join("-");
    setMainCoinSelected(name);
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

  function fetchAllCoins() {
    fetch(`${baseUrl}/assets`)
      .then((res) => res.json())
      .then((data) => {
        setMarketCapData(filterAllAssets(data.data));
        setAllCoinData(data);
        setCoinDataTimestamp(data.timestamp);
        setPrimaryCoin(data.data[0]);
        setSecondaryCoin(data.data[1]);
        setThirdCoin(data.data[8]);
        setFourthCoin(data.data[9]);
        setFifthCoin(data.data[10]);
        setSixthCoin(data.data[16]);
      });
  }

  function refreshCoin() {
    fetchAllCoins();
  }

  useEffect(() => {
    const mainCoin = mainCoinSelected;
    //const { date, newDate } = urlTime(mainGraphTimespan);
    refreshCoin();
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
    if (histDataMainCoin.length > 0) {
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
    }
  }, [histDataMainCoin]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar toggleColorMode={toggleColorMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isDarkMode={isDarkMode}
                chartData={chartData}
                handleClick={handlePrimaryCoinSelection}
                handleTimespan={handleTimespan}
                timespan={mainGraphTimespan}
                coin={mainCoinSelected}
                primaryCoin={primaryCoin}
                secondaryCoin={secondaryCoin}
                thirdCoin={thirdCoin}
                fourthCoin={fourthCoin}
                fifthCoin={fifthCoin}
                sixthCoin={sixthCoin}
                coinDataTimestamp={coinDataTimestamp}
                setAsMainCoin={setAsMainCoin}
                marketCapChartData={marketCapChartData}
                marketSupplyData={marketSupplyData}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
