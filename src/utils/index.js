/* eslint-disable import/prefer-default-export */
export function numberWithCommas(x) {
  const y = x < 100 ? x.toFixed(2) : Math.floor(x);
  return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
