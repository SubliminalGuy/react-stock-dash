function MainGraph({ data, handleClick }) {
  function realTime(date) {
    let humanTime = new Date(date);
    humanTime =
      humanTime.getDate().toString() +
      "." +
      humanTime.getMonth().toString() +
      "." +
      humanTime.getFullYear().toString();

    return humanTime;
  }

  function shortenRate(rate) {
    return rate.toFixed(2);
  }

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
        {data.asset_id_base} Course from {realTime(data.time)}
      </p>
      <p>EUR {shortenRate(data.rate)}</p>
    </div>
  );
}

export default MainGraph;
