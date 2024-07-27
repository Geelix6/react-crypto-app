import { cryptoAssets, cryptoData } from "./data";

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1);
  });
}

export function fakeFetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}

export async function fetchCrypto() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "TqkD+xrJENHXDOLtplkvqDFjyopIdtpSgL3HYxuweVw=",
    },
  };

  try {
    const response = await fetch("https://openapiv1.coinstats.app/coins", options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
