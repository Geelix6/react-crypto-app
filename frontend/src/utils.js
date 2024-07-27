export function percentDifference(a, b) {
  return +((100 * (b - a)) / a).toFixed(2);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPrice(price) {
  if (price == 0) return 0;

  const numberOfDecimalPlaces = Math.max(2, Math.ceil(-Math.log10(Math.abs(price)) + 3));
  return parseFloat(price.toFixed(numberOfDecimalPlaces));
}

export function formatMarketCap(price) {
  const decimalPlaces = Math.log10(price);
  if (decimalPlaces >= 12) {
    return (price / 10 ** 12).toFixed(2) + "T$";
  }
  if (decimalPlaces >= 9) {
    return (price / 10 ** 9).toFixed(2) + "B$";
  }
  if (decimalPlaces >= 6) {
    return (price / 10 ** 6).toFixed(2) + "M$";
  }
  return price.toFixed(2) + "$";
}
