export const formatter = new Intl.NumberFormat("us", {
  maximumFractionDigits: 0,
});

export const nFormat = (n: number) => {
  return formatter.format(n);
};
