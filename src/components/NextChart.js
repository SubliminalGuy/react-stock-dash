import { Pie } from "react-chartjs-2";

function NextChart({ data }) {
  return (
    <>
      <div className="sub-graph-two-container">
        <Pie
          className="sub-graph-two-bar-chart"
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Market Supply",
                font: {
                  family: "biryaniregular",
                  size: 14,
                },
              },
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default NextChart;
