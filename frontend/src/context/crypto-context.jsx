import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchAssets, fakeFetchCrypto, fetchCrypto } from "../api";
import { percentDifference } from "../utils";

// конекст как хранилище данных, которые могут использовать все компоненты,
// которые будут внутри компонента CryptoContextProvider см. App.jsx
const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

function mapAssets(assets, result) {
  return assets.map((asset) => {
    const coin = result.find((c) => c.id === asset.id);
    return {
      grow: asset.price <= coin.price,
      growPercent: percentDifference(asset.price, coin.price),
      totalAmount: asset.amount * coin.price,
      totalProfit: asset.amount * (coin.price - asset.price),
      name: coin.name,
      ...asset,
    };
  });
}

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  // обычно базово подгружаем данные через useEffect
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fakeFetchAssets();

      setAssets(mapAssets(assets, result));

      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>{children}</CryptoContext.Provider>;
}

export default CryptoContext;

// наш собственный хук
// можно использовать его, чтобы писать только один импорт - useCrypto
// вместо двух - useContext и CryptoContext
// с другой стороны тогда дефолтный экспорт CryptoContext становится бесполезным же?..
export function useCrypto() {
  return useContext(CryptoContext);
}
