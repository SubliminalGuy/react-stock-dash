import { useState, useEffect } from "react";

import MainGraph from "../components/MainGraph";
import Stats from "../components/Stats";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

// Import Helpers
import { shortenRate, shortenBig } from "../helperFunctions/shortenRate";
import { humanTime } from "../helperFunctions/timeConverters";
import filterAllAssets from "../helperFunctions/filterAllAssets";

import { fakeAssetData } from "../utils/fakeAssetData";
import { fakeEuroConvRate } from "../utils/fakeEuroConvRate";

export default function Main({ isDarkMode }) {
  const baseUrl = process.env.REACT_APP_COINCAP_BASE_URL;

  // STATES

  const [allCoinData, setAllCoinData] = useState(fakeAssetData);
  const [primaryCoin, setPrimaryCoin] = useState(allCoinData.data[0]);
  const [secondaryCoin, setSecondaryCoin] = useState(allCoinData.data[1]);
  const [thirdCoin, setThirdCoin] = useState(allCoinData.data[8]);
  const [fourthCoin, setFourthCoin] = useState(fakeAssetData.data[9]);
  const [fifthCoin, setFifthCoin] = useState(fakeAssetData.data[10]);
  const [sixthCoin, setSixthCoin] = useState(fakeAssetData.data[17]);
  const [coinDataTimestamp, setCoinDataTimestamp] = useState(
    allCoinData.timestamp
  );

  const [mainCoinSelected, setMainCoinSelected] = useState("bitcoin");
  const [mainGraphTimespan, setMainGraphTimespan] = useState(7);
  const [histDataMainCoin, setHistDataMainCoin] = useState([]);
  const [marketCapData, setMarketCapData] = useState(
    filterAllAssets(fakeAssetData.data)
  );

  console.log(mainCoinSelected);

  const [euroConvRate, setEuroConvRate] = useState(
    fakeEuroConvRate.data.rateUsd
  );

  // Prepares Raw Data for Chart.js Main Graph
  const [chartData, setChartData] = useState(null);

  // Prepares Data for Chart.js Market Cap Histogram

  const marketCapChartData = {
    labels: marketCapData.map((item) => item.symbol),
    datasets: [
      {
        label: "Market Cap billion EUR",
        data: marketCapData.map((item) =>
          shortenBig(convertUsdToEur(item.marketCapUsd))
        ),
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

  // HELPER FUNCTIONS

  function convertUsdToEur(value) {
    return value / euroConvRate;
  }

  // FUNCTIONS

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
        setPrimaryCoin(...data.data.filter((el) => el.id === "bitcoin"));
        setSecondaryCoin(...data.data.filter((el) => el.id === "ethereum"));
        setThirdCoin(...data.data.filter((el) => el.id === "polygon"));
        setFourthCoin(...data.data.filter((el) => el.id === "dogecoin"));
        setFifthCoin(...data.data.filter((el) => el.id === "solana"));
        setSixthCoin(
          ...data.data.filter((el) => el.id === "multi-collateral-dai")
        );
      });
  }

  function refreshCoin() {
    fetchAllCoins();
  }

  function refreshEuroConvRate() {
    fetch(`${baseUrl}/rates/euro`)
      .then((res) => res.json())
      .then((data) => {
        setEuroConvRate(data.data.rateUsd);
      });
  }

  useEffect(() => {
    const mainCoin = mainCoinSelected;
    //const { date, newDate } = urlTime(mainGraphTimespan);
    refreshCoin();
    refreshEuroConvRate();
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
            label: "EUR Price",
            data: histDataMainCoin.map((data) =>
              shortenRate(convertUsdToEur(data.priceUsd))
            ),
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
          euroConverter={convertUsdToEur}
        />
        <Stats
          data={secondaryCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
          euroConverter={convertUsdToEur}
        />
        <Stats
          data={thirdCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
          euroConverter={convertUsdToEur}
        />
      </div>
      <div className="Half">
        <BarChart data={marketCapChartData} />
        <PieChart data={marketSupplyData} />
      </div>
      <div className="Third">
        <Stats
          data={fourthCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
          euroConverter={convertUsdToEur}
        />
        <Stats
          data={fifthCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
          euroConverter={convertUsdToEur}
        />
        <Stats
          data={sixthCoin}
          timestamp={coinDataTimestamp}
          handleRefresh={setAsMainCoin}
          euroConverter={convertUsdToEur}
        />
      </div>
    </div>
  );
}
