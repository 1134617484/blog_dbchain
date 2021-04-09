

/**
 *
 * @param {*} name 指定参数名
 * @return {string} 返回指定参数值(字符串)
 */
export const getQueryString = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    //return unescape(r[2];
    return decodeURI(r[2]);
  }
  return null;
};

