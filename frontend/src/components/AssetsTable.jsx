import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";
import { formatPrice } from "../utils";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Average purchase price, $",
    dataIndex: "avgPurchasePrice",
    sorter: (a, b) => {
      return a.avgPurchasePrice - b.avgPurchasePrice;
    },
  },
  {
    title: "Current price, $",
    dataIndex: "currentPrice",
    sorter: (a, b) => a.currentPrice - b.currentPrice,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();
  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    avgPurchasePrice: formatPrice(asset.avgPrice),
    currentPrice: formatPrice(asset.currentPrice),
    amount: asset.amount,
  }));

  return <Table pagination={false} columns={columns} dataSource={data} />;
}
