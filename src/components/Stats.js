import shortenRate from "../helperFunctions/shortenRate";
import { humanTime } from "../helperFunctions/timeConverters";

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
          src={getIcon(data.asset_id_base)}
          alt={data.asset_id_base}
          className="cur-icon-stats"
          onClick={(e) => handleRefresh(e)}
        />
        {humanTime(data.time)}
      </div>
      <p>EUR {shortenRate(data.rate)}</p>
    </div>
  );
}

export default Stats;
