import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function SubGraph({ number, data }) {
  console.log("SubgrapData", data);
  return (
    <>
      <div className="sub-graph-one-container">
        <Bar
          className="sub-graph-bar-chart"
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Market Cap in bn $",
                font: {
                  family: "biryaniregular",
                  size: 14,
                },
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default SubGraph;
