import { Statistic, Card, Layout, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize, formatPrice } from "../../utils";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {/* чтобы не делать map => {return...} */}
      {/* можно написать map => (...) как бы перевод на новую строку получается */}
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={<Typography.Title level={5}>{capitalize(asset.id)}</Typography.Title>}
            value={formatPrice(asset.totalAmount)}
            valueStyle={{
              color: asset.grow ? "#3f8600" : "#cf1322",
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            dataSource={[
              { title: "Total Profit", value: asset.totalProfit, withTag: true },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
            ]}
            size="small"
            renderItem={(item) => (
              <List.Item style={{ display: "flex", justifyContent: "space-beetwen" }}>
                <span>{item.title}</span>
                <span>
                  {item.withTag && <Tag color={item.value >= 0 ? "green" : "red"}>{asset.growPercent}%</Tag>}
                  {!item.isPlain && (
                    <Typography.Text type={item.value >= 0 ? "success" : "danger"}>
                      {formatPrice(item.value)}$
                    </Typography.Text>
                  )}
                  {item.isPlain && item.value}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
