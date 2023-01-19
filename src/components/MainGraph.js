import { timeSpanConverter } from "../helperFunctions/timeConverters";

import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";

function MainGraph({
  chartData,
  handleClick,
  handleTimespan,
  timespan,
  coin,
  isDarkMode,
}) {
  return (
    <div className="main-graph">
      <div className="main-graph-menu">
        <div className="crypto-icons">
          <img
            className="cur-icon"
            src="/btc.svg"
            alt="bitcoin"
            onClick={(e) => handleClick(e)}
          />
          <img
            className="cur-icon"
            src="/eth.svg"
            alt="ethereum"
            onClick={(e) => handleClick(e)}
          />
          <img
            className="cur-icon"
            src="/doge.svg"
            alt="dogecoin"
            onClick={(e) => handleClick(e)}
          />
          <img
            className="cur-icon"
            src="/matic.png"
            alt="polygon"
            onClick={(e) => handleClick(e)}
          />
          <img
            className="cur-icon"
            src="/sol.png"
            alt="solana"
            onClick={(e) => handleClick(e)}
          />
          <img
            className="cur-icon"
            src="/dai.png"
            alt="multi-collateral-dai"
            onClick={(e) => handleClick(e)}
          />
        </div>
        <div className="main-chart-dropdown">
          <label for="dog-names" id="timespan-label">
            Timespan:
          </label>
          <select name="timespan" id="timespan" onChange={handleTimespan}>
            <option value="7">7 Days</option>

            <option value="14">14 Days</option>

            <option value="30">Month</option>

            <option value="90">3 Month</option>
          </select>
        </div>
      </div>

      <Line
        className="main-chart"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `${coin} ${timeSpanConverter(timespan)}`,
              ...(isDarkMode && { color: "#e2e8f0" }),
              ...(!isDarkMode && { color: "#1F2937" }),
              font: {
                family: "biryaniregular",
                size: 14,
              },
            },
            legend: {
              display: false,
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        }}
      />
    </div>
  );
}

export default MainGraph;
