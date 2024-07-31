import { Statistic, Card, Layout, List, Typography, Tag, Button } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { formatPrice } from "../../utils";
import { useCrypto } from "../../context/crypto-context";

export default function AppSider() {
  const { assets, removeAsset } = useCrypto();

  return (
    <Layout.Sider width="25%" style={{ padding: "1rem" }}>
      {assets.length === 0 && (
        <Typography.Title level={3} style={{ textAlign: "center", color: "#fff" }}>
          Add your first asset by clicking on Add Asset button
        </Typography.Title>
      )}

      {/* чтобы не делать map => {return...} */}
      {/* можно написать map => (...) как бы перевод на новую строку получается */}
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Button onClick={() => removeAsset(asset)} style={{ position: "absolute", right: 24 }} shape="circle">
            X
          </Button>
          <Statistic
            title={<Typography.Title level={5}>{asset.name}</Typography.Title>}
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
