import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";

function MainGraph({ chartData, handleClick, handleTimespan, coin }) {
  return (
    <div className="main-graph">
      <div className="main-graph-menu">
        <div className="crypto-icons">
          <img
            className="cur-icon"
            src="/btc.svg"
            alt="BTC"
            onClick={(e) => handleClick(e)}
          />
          <img
            className="cur-icon"
            src="/eth.svg"
            alt="ETH"
            onClick={(e) => handleClick(e)}
          />
          <img
            className="cur-icon"
            src="/doge.svg"
            alt="DOGE"
            onClick={(e) => handleClick(e)}
          />
          <img
            className="cur-icon"
            src="/matic.png"
            alt="MATIC"
            onClick={(e) => handleClick(e)}
          />
        </div>
        <div className="main-chart-dropdown">
          <label for="dog-names">Timespan:</label>
          <select name="timespan" id="timespan" onChange={handleTimespan}>
            <option value="14">Last 14 Days</option>

            <option value="30">Last Month</option>

            <option value="90">Last 3 Month</option>
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
                text: `${coin} Last 14 Days`,
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
