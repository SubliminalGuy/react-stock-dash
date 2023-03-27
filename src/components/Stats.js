import { shortenRate } from "../helperFunctions/shortenRate";
import { unixToHumanTime } from "../helperFunctions/timeConverters";

export function changeToEuro(value) {
  return "€";
}

function Stats({ data, timestamp, handleRefresh, euroConverter }) {
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
          onClick={() => handleRefresh(data.name)}
        >
          Main Coin
        </button>
      </div>

      <div className="stats-icon-date-container">
        <img
          data-testid="coin-image"
          src={getIcon(data.symbol)}
          alt={data.symbol}
          className="stats-cur-icon"
        />
        <p data-testid="time" className="stats-coin-date-time">
          {unixToHumanTime(timestamp)}
        </p>
      </div>
      <div data-testid="euro-value" className="stats-coin-value">
        <p>
          {changeToEuro("€")} {shortenRate(euroConverter(data.priceUsd))}
        </p>
      </div>
    </div>
  );
}

export default Stats;
