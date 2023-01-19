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
    <div className="stats">
      <div className="refresh-button">
        <button
          className="refresh-coin"
          onClick={() => handleRefresh(data.data.symbol)}
        >
          Refresh
        </button>
      </div>

      <div className="coin-date">
        <img
          src={getIcon(data.data.symbol)}
          alt={data.data.symbol}
          className="cur-icon-stats"
        />
        <p className="coin-date-time">{unixToHumanTime(data.timestamp)}</p>
      </div>
      <div className="coin-value">
        <p>$ {shortenRate(data.data.priceUsd)}</p>
      </div>
    </div>
  );
}

export default Stats;
