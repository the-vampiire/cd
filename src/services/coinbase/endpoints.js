const productsEndpoint = (productId = null) => {
  const basePath = "/products";

  if (!productId) return { method: "GET", path: basePath };;

  const productPath = `${basePath}/${productId}`;
  const dataTypes = ["product", "book", "candles", "stats", "ticker", "trades"];

  return dataTypes.reduce((productEndpoints, dataType) => {
    const path = `${productPath}/${dataType}`;
    const endpoint = {
      path,
      method: "GET",
    };

    return { ...productEndpoints, [dataType]: endpoint };
  }, {});

}

module.exports = {
  fills: {
    method: "GET",
    path: "/fills",
  },
  orders: {
    method: "GET",
    path: "/orders",
  },
  products: productsEndpoint,
};