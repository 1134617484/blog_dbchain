const prod_AppCode = "4HQJA8CUUF",
  test_AppCode = "4HQJA8CUUF";

const prod_BaseUrl = "https://controlpanel.dbchain.cloud/relay",
  test_BaseUrl = "https://controlpanel.dbchain.cloud/relay";

const prod_ChainId = "testnet",
  test_ChainId = "testnet";

exports.APIURL = {
  AppCode: process.env.VUE_APP_FLAG === "production" ? prod_AppCode : test_AppCode,
  BaseUrl: process.env.VUE_APP_FLAG === "production" ? prod_BaseUrl : test_BaseUrl,
  ChainId: process.env.VUE_APP_FLAG === "production" ? prod_ChainId : test_ChainId,
};
