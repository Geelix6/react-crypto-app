import AppLayout from "./components/Layout/AppLayout";
import CryptoContextProvider from "./context/crypto-context";

// тут у нас только базовая информация о приложении
// поэтому сделали AppLayout отдельным компонентом
// но вокруг лайаута есть контекст
// изначально тут были и AppHeader, AppSider...

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
