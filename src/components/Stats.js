import shortenRate from "../helperFunctions/shortenRate";
import humanTime from "../helperFunctions/humanTime";

function Stats({ data }) {
  function getIcon(id) {
    console.log(id);
    const iconChanger = {
      BTC: "/btc.svg",
      ETH: "/eth.svg",
      DOGE: "/doge.svg",
      MATIC: "/matic.png",
    };
    console.log(iconChanger[id]);
    return iconChanger[id];
  }

  return (
    <div className="stats">
      <div className="coin-date">
        <img
          src={getIcon(data.asset_id_base)}
          alt={data.asset_id_base}
          className="cur-icon-stats"
        />
        {humanTime(data.time)}
      </div>
      <p>EUR {shortenRate(data.rate)}</p>
    </div>
  );
}

export default Stats;
