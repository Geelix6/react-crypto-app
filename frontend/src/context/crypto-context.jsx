import { createContext, useState, useEffect, useContext } from "react";
import { percentDifference } from "../utils";
import { cryptoAssets } from "../data";
import { Result, Button } from "antd";

// конекст как хранилище данных, которые могут использовать все компоненты,
// которые будут внутри компонента CryptoContextProvider см. App.jsx
const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export default function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  const [fetchFailed, setFetchFailed] = useState(false);

  function fetchAssets() {
    // имитируем получение данных по сети
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cryptoAssets);
      }, 30);
    });
  }

  async function fetchCrypto(isInitialLoading = false) {
    const options = {
      method: "GET",
      cache: "no-store",
      headers: {
        accept: "application/json",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        "X-API-KEY": "TqkD+xrJENHXDOLtplkvqDFjyopIdtpSgL3HYxuweVw=",
      },
    };

    try {
      const response = await fetch("https://openapiv1.coinstats.app/coins?limit=20", options);
      const server_json = await response.json();

      if (server_json.statusCode >= 400) {
        throw new Error(server_json.message);
      }
      return server_json;
    } catch (err) {
      if (isInitialLoading) {
        console.log(err);
        setFetchFailed(true);
      } else {
        throw err;
      }
    }
  }

  function mapAssets(assets, result) {
    return assets
      .map((asset) => {
        const coin = result.find((c) => c.id === asset.id);
        return {
          ...asset,
          grow: asset.avgPrice <= coin.price,
          growPercent: percentDifference(asset.avgPrice, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * (coin.price - asset.avgPrice),
          name: coin.name,
          currentPrice: coin.price,
        };
      })
      .sort((a, b) => b.totalAmount - a.totalAmount);
  }

  function addAsset(newAsset) {
    const duplicate = assets.find((asset) => asset.id === newAsset.id);

    setAssets((prev) => {
      let newState;

      if (duplicate) {
        const newAmount = duplicate.amount + newAsset.amount;
        duplicate.avgPrice = (duplicate.amount * duplicate.avgPrice + newAsset.amount * newAsset.avgPrice) / newAmount;
        duplicate.amount = newAmount;

        const withoutDuplicate = prev.filter((asset) => asset.id !== duplicate.id);
        newState = mapAssets([...withoutDuplicate, duplicate], crypto);
      } else {
        newState = mapAssets([...prev, newAsset], crypto);
      }

      localStorage.setItem("crypto_assets", JSON.stringify(newState));
      return newState;
    });
  }

  function removeAsset(removingAsset) {
    setAssets((prev) => {
      const newState = prev.filter((asset) => asset.id !== removingAsset.id);
      localStorage.setItem("crypto_assets", JSON.stringify(newState));
      return newState;
    });
  }

  // обычно подгружаем данные с помощью useEffect
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fetchCrypto(true);
      const assets = await fetchAssets();
      localStorage.setItem("crypto_assets", JSON.stringify(assets));

      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setLoading(false);
    }

    preload();

    // обновлять данные о ценах каждые 30 секунд
    const interval = setInterval(async () => {
      try {
        const { result } = await fetchCrypto();
        setCrypto(result);
        setAssets((prev) => mapAssets(prev, result));
      } catch (err) {
        console.log(err);
      }
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  if (fetchFailed) {
    return (
      <Result
        status="warning"
        title="Crypto data couldn't be retrieved from the server (https://openapiv1.coinstats.app). Please, try again later"
        extra={
          <Button onClick={() => window.location.reload()} type="primary">
            Refresh the Page
          </Button>
        }
      />
    );
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, removeAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

// наш собственный хук
// можно использовать его, чтобы писать только один импорт - useCrypto
// вместо двух - useContext и CryptoContext
export function useCrypto() {
  return useContext(CryptoContext);
}
