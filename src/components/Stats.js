import shortenRate from "../helperFunctions/shortenRate";
import humanTime from "../helperFunctions/humanTime";

function Stats({ data }) {
  return (
    <div className="stats">
      <p>
        {" "}
        {data.asset_id_base} Course from {humanTime(data.time)}{" "}
      </p>
      <p>EUR {shortenRate(data.rate)}</p>
    </div>
  );
}

export default Stats;
