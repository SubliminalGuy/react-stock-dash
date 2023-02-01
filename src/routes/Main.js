import MainGraph from "../components/MainGraph";
import Stats from "../components/Stats";
import BarChart from "../components/BarChart";
import NextChart from "../components/NextChart";

export default function Main({
  isDarkMode,
  chartData,
  handlePrimaryCoinSelection,
  handleTimespan,
  mainGraphTimespan,
  mainCoinSelected,
  primaryCoin,
  secondaryCoin,
  thirdCoin,
  fourthCoin,
  fifthCoin,
  sixthCoin,
  coinDataTimestamp,
  setAsMainCoin,
  marketCapChartData,
  marketSupplyData,
}) {
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
