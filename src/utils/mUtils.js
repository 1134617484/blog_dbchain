

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

/**
 * json按照unicode编码排序
 * @param {*} json
 * @param {*} key
 * @param {*} type = true || false
 * @returns
 */
 export const jsonToSort = (json, key, type = true) => {
  function handler(key) {
    return function (a, b) {
      var c = a[key]; //arr[key] 可以直接写入变量，而用点操作符不行
      var d = b[key];
      if (c > d) {
        return type?1:-1;
      } else {
        return type?-1:1;
      }
    };
  }
  return json.sort(handler(key)); //传入什么参数就对什么参数进行排序
};