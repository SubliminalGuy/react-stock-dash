import { useState, useEffect } from "react";

import MainGraph from "../components/MainGraph";
import Stats from "../components/Stats";
import BarChart from "../components/BarChart";
import NextChart from "../components/NextChart";

// Import Helpers
import { shortenRate, shortenBig } from "../helperFunctions/shortenRate";
import { humanTime } from "../helperFunctions/timeConverters";
import filterAllAssets from "../helperFunctions/filterAllAssets";

import { fakeAssetData } from "../utils/fakeAssetData";

export default function Main({ isDarkMode }) {
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
        <Stats
          data={primaryCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
        />
        <Stats
          data={secondaryCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
        />
        <Stats
          data={thirdCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
        />
      </div>
      <div className="Half">
        <BarChart data={marketCapChartData} />
        <NextChart data={marketSupplyData} />
      </div>
      <div className="Third">
        <Stats
          data={fourthCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
        />
        <Stats
          data={fifthCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
        />
        <Stats
          data={sixthCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
        />
      </div>
    </div>
  );
}
