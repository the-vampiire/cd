const crypto = require('crypto');
const qs = require("query-string");

const buildTimestamp = (date = Date.now()) => date / 1000;

const buildSignature = (secret, signatureData) => {
  // https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication
  const { timestamp, method, requestPath, body } = signatureData;

  // NOTE (2 hours burned on invalid signature...): REQUEST PATH MUST INCLUDE QS and match request URL
  let rawData = timestamp + method + requestPath;
  if (body) rawData += JSON.stringify(body);

  const hmacKey = Buffer.from(secret, "base64");

  const signature = crypto.createHmac("sha256", hmacKey)
    .update(rawData)
    .digest("base64");

  return signature;
};

const buildHeaders = (accessKey, passphrase, secret, signatureData = {}) => {
  const timestamp = buildTimestamp();

  const signature = buildSignature(secret, { timestamp, ...signatureData });

  return {
    "CB-ACCESS-KEY": accessKey,
    "CB-ACCESS-SIGN": signature,
    "CB-ACCESS-TIMESTAMP": timestamp,
    "CB-ACCESS-PASSPHRASE": passphrase,
  };
}

const buildRequestPath = (path, query = null) => {
  if (!query) return path;

  return qs.stringifyUrl({ url: path, query });
};

module.exports = {
  buildHeaders,
  buildTimestamp,
  buildSignature,
  buildRequestPath,
}