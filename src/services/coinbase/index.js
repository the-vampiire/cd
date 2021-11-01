const axios = require("axios").default;

const endpoints = require("./endpoints");
const productIds = require("./product-ids");
const { buildRequestPath, buildHeaders } = require("./utils");

const API_BASE = "https://api.exchange.coinbase.com";

const requestBase = axios.create({ baseURL: API_BASE }); // set defaults for all requests

const buildClient = (accessKey, passphrase, secret) =>
  (endpoint, data = {}) => {
    const { query = null, body = null } = data;
    const { method, path } = endpoint;

    const requestPath = buildRequestPath(path, query);
    const headers = buildHeaders(accessKey, passphrase, secret, { method, requestPath, body });

    return requestBase.request({ method, url: requestPath, headers, data: body });
  };

module.exports = {
  endpoints,
  productIds,
  buildClient,
}