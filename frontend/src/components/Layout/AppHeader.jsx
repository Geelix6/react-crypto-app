import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: 60,
  padding: "1rem",
  textAlign: "center",
  backgroundColor: "#fff",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  // используем этот хук, чтобы много раз не создавать функцию
  // и не вешать слушатель при ререндерах
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);

    // return используем для того случая чтобы остановить прослушку,
    // если компонент будет убран (чистим память)
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value='press "/" to open'
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{ display: "flex", alignItems: "center" }}>
            <img style={{ display: "block", width: 25 }} src={option.data.icon} alt={option.data.label} />
            {option.data.label}
          </Space>
        )}
      />
      <Button
        type="primary"
        onClick={() => {
          setDrawer(true);
          setSelect(false);
        }}
      >
        Add Asset
      </Button>

      <Modal footer={null} open={modal} onCancel={() => setModal(false)}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer destroyOnClose={true} width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer}>
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
