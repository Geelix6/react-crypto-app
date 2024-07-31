import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { formatPrice } from "../../utils";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  padding: "1rem",
  color: "#fff",
  backgroundColor: "#001529",
};

export default function AppContent() {
  const { assets } = useCrypto();

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio: {formatPrice(assets.reduce((acc, asset) => acc + asset.totalAmount, 0))}$
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
