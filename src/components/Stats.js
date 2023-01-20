import shortenRate from "../helperFunctions/shortenRate";
import { unixToHumanTime } from "../helperFunctions/timeConverters";

function Stats({ data, handleRefresh }) {
  function getIcon(id) {
    const iconChanger = {
      BTC: "/btc.svg",
      ETH: "/eth.svg",
      DOGE: "/doge.svg",
      MATIC: "/matic.png",
      SOL: "/sol.png",
      DAI: "/dai.png",
    };
    return iconChanger[id];
  }

  return (
    <div className="stats-container">
      <div className="stats-refresh-button">
        <button
          className="stats-refresh-coin"
          onClick={() => handleRefresh(data.data.symbol)}
        >
          Refresh
        </button>
      </div>

      <div className="stats-icon-date-container">
        <img
          src={getIcon(data.data.symbol)}
          alt={data.data.symbol}
          className="stats-cur-icon"
        />
        <p className="stats-coin-date-time">
          {unixToHumanTime(data.timestamp)}
        </p>
      </div>
      <div className="stats-coin-value">
        <p>$ {shortenRate(data.data.priceUsd)}</p>
      </div>
    </div>
  );
}

export default Stats;
