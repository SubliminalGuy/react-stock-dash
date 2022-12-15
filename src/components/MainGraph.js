import shortenRate from "../helperFunctions/shortenRate";
import humanTime from "../helperFunctions/humanTime";

function MainGraph({ data, handleClick }) {
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

      <p>
        {data.asset_id_base} Course from {humanTime(data.time)}
      </p>
      <p>EUR {shortenRate(data.rate)}</p>
    </div>
  );
}

export default MainGraph;
