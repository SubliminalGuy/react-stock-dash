import { timeSpanConverter } from "../helperFunctions/timeConverters";

import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";

function MainGraph({ chartData, handleClick, handleTimespan, timespan, coin }) {
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
      <div className="main-chart">
        <Line
          className="main-chart"
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: `${coin} ${timeSpanConverter(timespan)}`,
                color: "#BAE6FD",
                font: {
                  family: "biryaniregular",
                  size: 16,
                },
              },
              legend: {
                display: false,
              },
              responsive: true,
            },
          }}
        />
      </div>
    </div>
  );
}

export default MainGraph;
