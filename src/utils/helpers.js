export const formatPrice = (number) => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((product) => product[type]);

  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
