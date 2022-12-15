// import shortenRate from "../helperFunctions/shortenRate";
// import humanTime from "../helperFunctions/humanTime";

import Chart from "chart.js/auto";

import { Bar } from "react-chartjs-2";

function MainGraph({ chartData, handleClick }) {
  return (
    <div className="main-graph">
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
      </div>

      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default MainGraph;
