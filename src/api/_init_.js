const prod_AppCode = "CB8KVGZTXZ",
  test_AppCode = "7MXXDYVYYA";
// test_AppCode = "J68LCEZFEA";

const prod_BaseUrl = "https://controlpanel.dbchain.cloud/relay",
  test_BaseUrl = "http://192.168.0.18/relay";
// test_BaseUrl = "http://192.168.3.85:3001/relay";

const prod_ChainId = "testnet",
  test_ChainId = "testnet";

exports.APIURL = {
  AppCode: process.env.VUE_APP_FLAG === "pro" ? prod_AppCode : test_AppCode,
  BaseUrl: process.env.VUE_APP_FLAG === "pro" ? prod_BaseUrl : test_BaseUrl,
  ChainId: process.env.VUE_APP_FLAG === "pro" ? prod_ChainId : test_ChainId,
};
