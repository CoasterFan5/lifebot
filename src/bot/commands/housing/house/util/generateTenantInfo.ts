export const generateTenantInfo = (options: { houseValue: number }) => {
  const rentPayment = Math.floor(
    options.houseValue / (Math.floor(Math.random() * 10) + 10),
  );

  const tenantScore = Math.floor(Math.random() * 6);

  const tenantWealth = rentPayment * Math.floor(Math.random() * 25 + 5);

  return {
    rentPayment: rentPayment,
    score: tenantScore,
    wealth: tenantWealth,
  };
};
