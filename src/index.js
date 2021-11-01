require("dotenv").config();

const { coinbase } = require('./services');

const {
  COINBASE_API_KEY: accessKey,
  COINBASE_API_SECRET: secret,
  COINBASE_API_PASSPHRASE: passphrase,
} = process.env;

const coinbaseRequest = coinbase.buildClient(accessKey, passphrase, secret);

// coinbaseRequest(coinbase.endpoints.orders.fills, { query: { product_id: coinbase.productIds.ETH_USD } }).then(console.log).catch(console.log);
const { endpoints, productIds } = coinbase;

const ethUsdCandles = endpoints.products(productIds.ETH_USD).candles;

coinbaseRequest(ethUsdCandles).then(console.log).catch(console.log);