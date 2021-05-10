const prod_AppCode = "HUKFM2MHBE",
  test_AppCode = "HUKFM2MHBE";

const prod_BaseUrl = "https://controlpanel.dbchain.cloud/relay",
  test_BaseUrl = "https://controlpanel.dbchain.cloud/relay";

const prod_ChainId = "testnet",
  test_ChainId = "testnet";

exports.APIURL = {
  AppCode: process.env.VUE_APP_FLAG === "pro" ? prod_AppCode : test_AppCode,
  BaseUrl: process.env.VUE_APP_FLAG === "pro" ? prod_BaseUrl : test_BaseUrl,
  ChainId: process.env.VUE_APP_FLAG === "pro" ? prod_ChainId : test_ChainId,
};
