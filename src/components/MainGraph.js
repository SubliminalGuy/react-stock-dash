import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";

function MainGraph({ chartData, handleClick, coin }) {
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

      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `${coin} Last 14 Days`,
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
