//import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function BarChart({ data }) {
  return (
    <>
      <div className="sub-graph-one-container">
        <Bar
          className="sub-graph-one-bar-chart"
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                display: true,
                type: "logarithmic",
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Market Cap in billion EUR",
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

export default BarChart;
