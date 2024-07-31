import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";
import { formatPrice } from "../utils";
import { Typography } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useCrypto();
  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: assets.map((asset) => formatPrice(asset.totalAmount)),
        backgroundColor: [
          "#5629df",
          "#39ec1b",
          "#e4442e",
          "#ffff5a",
          "#72ffff",
          "#ff63ff",
          "#c7a16b",
          "#bab9b2",
          "#871759",
          "#2e2a31",
          "#e4d6dd",
          "#d65e5e",
          "#77e764",
          "#392c73",
          "#bdbf51",
          "#fdb0ff",
          "#ba0b0b",
          "#52516e",
          "#fffcb1",
          "#807c60",
        ],
      },
    ],
  };

  if (data.datasets[0].data.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 365,
          marginBottom: "1rem",
        }}
      >
        <Typography.Title level={3} style={{ color: "#fff" }}>
          There will be a Pie Chart here
        </Typography.Title>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", height: 365, marginBottom: "1rem" }}>
      <Pie data={data}></Pie>
    </div>
  );
}
