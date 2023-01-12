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
      <div className="coin-date">
        <img
          src={getIcon(data.data.symbol)}
          alt={data.data.symbol}
          className="cur-icon-stats"
          onClick={(e) => handleRefresh(e)}
        />
        <p className="coin-date-time">{unixToHumanTime(data.timestamp)}</p>
      </div>
      <div className="coin-value">
        <p>USD {shortenRate(data.data.priceUsd)}</p>
      </div>
    </div>
  );
}

export default Stats;
