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
  const baseUrl = process.env.REACT_APP_COINCAP_BASE_URL;

  const [primaryCoin, setPrimaryCoin] = useState(fakeCoinData[0]);
  const [secondaryCoin, setSecondaryCoin] = useState(fakeCoinData[1]);
  const [thirdCoin, setThirdCoin] = useState(fakeCoinData[2]);
  const [fourthCoin, setFourthCoin] = useState(fakeCoinData[3]);
  const [fifthCoin, setFifthCoin] = useState(fakeCoinData[4]);
  const [sixthCoin, setSixthCoin] = useState(fakeCoinData[5]);

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

  function handlePrimaryCoinSelection(e) {
    console.log(e.target.alt);
    setMainCoinSelected(e.target.alt);
  }

  function handleTimespan(e) {
    const newTimespan = Number(e.target.value);
    setMainGraphTimespan(newTimespan);
  }

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

  function refreshCoin(e) {
    const coin = e.target.alt;
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
        //console.table(data.data.slice(-timespan, data.data.length));
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
          <Stats data={fifthCoin} handleRefresh={refreshCoin} />
          <Stats data={sixthCoin} handleRefresh={refreshCoin} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
