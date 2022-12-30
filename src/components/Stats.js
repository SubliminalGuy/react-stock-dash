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
    };
    return iconChanger[id];
  }

  return (
    <div className="stats">
      <div className="coin-date">
        <img
          src={getIcon(data.base)}
          alt={data.base}
          className="cur-icon-stats"
          onClick={(e) => handleRefresh(e)}
        />
        {unixToHumanTime(data.last_updated)}
      </div>
      <p>EUR {shortenRate(data.exchange_rates.EUR)}</p>
    </div>
  );
}

export default Stats;
