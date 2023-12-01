export const applyPriceFilter = (query, minPrice, maxPrice) => {
  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    query.price = { $gte: minPrice };
  } else if (maxPrice) {
    query.price = { $lte: maxPrice };
  }
};

export const getSortDirection = (sortParam) => {
  if (sortParam === "asc") return 1;
  if (sortParam === "desc") return -1;
  return null;
};
