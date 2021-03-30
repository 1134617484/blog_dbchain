
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return;
  var value = window.localStorage.getItem(name);
  if (value !== null) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      value = value;
    }
  }
  return value;
};

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 获取session storage
 */

export const setSessionStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getSessionStore = (name) => {
  if (!name) return;
  var value = window.sessionStorage.getItem(name);
  console.log(value);
  if (value !== null) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      value = value;
    }
  }

  return value;
};

/**
 * 删除localStorage
 */
export const removeSessionStore = (name) => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};


/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 *   type == 4 ---> "2020年03月03日"
 *
 */
export const formatDate = (date, type) => {
  console.log(date, type);
  var year = date.getFullYear(); //年
  var month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1; //月
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //日
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分
  var seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
  var milliseconds =
    date.getMilliseconds() < 10
      ? "0" + date.getMilliseconds()
      : date.getMilliseconds(); //毫秒
  if (type == 1) {
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds +
      "." +
      milliseconds
    );
  } else if (type == 2) {
    return (
      year + "" + month + "" + day + "" + hour + "" + minutes + "" + seconds
    );
  } else if (type == 3) {
    return year + "-" + month + "-" + day;
  } else if (type == 4) {
    return year + "年" + month + "月" + day + "日";
  } else {
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }
};
/**
 * 时间转换：20150101010101 --> '2015-01-01 01:01:01'
 */
export const parseToDate = (timeValue) => {
  var result = "";
  var year = timeValue.substr(0, 4);
  var month = timeValue.substr(4, 2);
  var date = timeValue.substr(6, 2);
  var hour = timeValue.substr(8, 2);
  var minute = timeValue.substr(10, 2);
  var second = timeValue.substr(12, 2);
  result =
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  return result;
};
/**
 * 判断空值
 */
export const isEmpty = (keys) => {
  if (typeof keys === "string") {
    keys = keys.replace(/\"|&nbsp;|\\/g, "").replace(/(^\s*)|(\s*$)/g, "");
    if (keys == "" || keys == null || keys == "null" || keys === "undefined") {
      return true;
    } else {
      return false;
    }
  } else if (typeof keys === "undefined") {
    // 未定义
    return true;
  } else if (typeof keys === "number") {
    return false;
  } else if (typeof keys === "boolean") {
    return false;
  } else if (typeof keys == "object") {
    if (JSON.stringify(keys) == "{}") {
      return true;
    } else if (keys == null) {
      // null
      return true;
    } else {
      return false;
    }
  }

  if (keys instanceof Array && keys.length == 0) {
    // 数组
    return true;
  }
};

/**
 * 返回两位的小数的字符串
 */
export const toFixedNum = (num) => {
  const tonum = Number(num).toFixed(2);
  return tonum;
};

/**
 * 读取base64
 */
export const readFile = (file) => {
  //console.log(file)
  //var file = this.files[0];
  //判断是否是图片类型
  if (!/image\/\w+/.test(file.raw.type)) {
    alert("只能选择图片");
    return false;
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    var filedata = {
      filename: file.name,
      filebase64: e.target.result,
    };
    alert(e.target.result);
  };
};

/**
 * 动态插入css
 */
export const loadStyle = (url) => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
};
/**
 * 设置浏览器头部标题
 */
export const setTitle = (title) => {
  title = title ? `${title}` : "搜游";
  window.document.title = title;
};

export const param2Obj = (url) => {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

//是否为正整数
export const isInteger = (s) => {
  var re = /^[0-9]+$/;
  return re.test(s);
};

export const setContentHeight = (that, ele, height) => {
  //console.log('1')
  that.$nextTick(() => {
    //console.log(ele)
    ele.style.height = document.body.clientHeight - height + "px";
  });
};

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
 * @return {string} 返回所有地址栏参数，键值对(字符串)
 */
export const GetRequest = (myUrl = location.search) => {
  var url = decodeURI(myUrl); //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};

/**
 * es6如何创建一个包含当前URL参数的对象？
 * @param {*} url
 * Example:
 * getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
 * getURLParameters('google.com'); // {}
 */
export const getURLParameters = (url = window.location.href) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
);

/**
 * @param {*} date 具体日期变量
 * @param {string} dateType 需要返回类型
 * @return {string} dateText 返回为指定格式的日期字符串
 */
export const getFormatDate = (date, dateType = "yyyy-mm-dd MM:mm:ss") => {
  // console.log(date)
  // if(!isNaN(date))return getTime(Number)
  let dateObj = new Date(!isNaN(date)?Number(date):date);
  let month = dateObj.getMonth() + 1;
  let strDate = dateObj.getDate();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }

  let dateText =
    dateObj.getFullYear() +
    "年" +
    (dateObj.getMonth() + 1) +
    "月" +
    dateObj.getDate() +
    "日";
  if (dateType == "yyyy-mm-dd") {
    dateText =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-" +
      dateObj.getDate();
  }
  if (dateType == "yyyy.mm.dd") {
    dateText =
      dateObj.getFullYear() +
      "." +
      (dateObj.getMonth() + 1) +
      "." +
      dateObj.getDate();
  }
  if (dateType == "yyyy-mm-dd MM:mm:ss") {
    dateText =
      dateObj.getFullYear() +
      "-" +
      month +
      "-" +
      strDate +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
  }
  if (dateType == "mm-dd MM:mm:ss") {
    dateText =
      month + "-" + strDate + " " + hours + ":" + minutes + ":" + seconds;
  }
  if (dateType == "yyyy年mm月dd日 MM:mm:ss") {
    dateText =
      dateObj.getFullYear() +
      "年" +
      month +
      "月" +
      strDate +
      "日" +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
  }
  return dateText;
};

/**
 *
 * @param {*} pathImg 图片地址是否存在
 */
export const validateImage = (pathImg) => {
  var ImgObj = new Image();
  ImgObj.src = pathImg;
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return true;
  } else {
    return false;
  }
};
/**
 *
 * @param {*} time 要转换的时间戳 默认当前时间
 * @return {string} dateText 返回日期字符串 2020.03.09 23:59:59
 */
function getTime(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, ".");
}

// object转url参数
export const Obj_url = (parmes,isnull=true) => {
  let urlArr = GetRequest();
  console.log(urlArr)
  for (let i = 0; i < Object.keys(parmes).length; i++) {
    if (
      parmes[Object.keys(parmes)[i]] !== "" &&
      parmes[Object.keys(parmes)[i]] !== null &&
      parmes[Object.keys(parmes)[i]] !== undefined
    ) {
      urlArr[Object.keys(parmes)[i]] = parmes[Object.keys(parmes)[i]];
      // if(isnull){
      //   urlArr[Object.keys(parmes)[i]] = parmes[Object.keys(parmes)[i]];
      // }else{
      //   delete urlArr[Object.keys(parmes)[i]]
      // }
    }
  }
  console.log(urlArr)
  let url = JSON.stringify(urlArr)
    .replace(/({|}|")/g, "")
    .replace(/(:)/g, "=")
    .replace(/(,)/g, "&");
  return url;
};

// 页面重定向  用于将对象传入地址栏但不刷新页面
// isnull 是否认可null? 传false则过滤所有为假的值
export const redirect = (parmes,isnull=true) => {
  console.log(parmes,isnull)
  let url = Obj_url(parmes,isnull);
  console.log(url)
  return window.history.replaceState(null, null, `?${url}`);
};

/**
 * 图片下载函数
 * @param {string} url 下载图片链接地址
 * @param {string} name 保存的图片名
 */
function download(href, name) {
  let eleLink = document.createElement("a");
  eleLink.download = name;
  eleLink.href = href;
  eleLink.click();
  eleLink.remove();
}

/**
 * 图片下载辅助函数
 * @param {string} url 下载图片链接地址
 * @param {string} name 保存的图片名
 */
export const downloadByBlob = function (url, name) {
  let image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = url;
  image.onload = () => {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);
    canvas.toBlob((blob) => {
      let url = URL.createObjectURL(blob);
      download(url, name);
      // 用完释放URL对象
      URL.revokeObjectURL(url);
    });
  };
};

/**
 * 将 array 分成多个数组，每个数组包含length 或更少的项。
 * @param {Array} array 原数组
 * @param {Number} count 拆解条数
 * var partners = _.chunk(_.shuffle(kindergarten), 2);
 *  => [["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]
 */
export const _chunk = function (array, count) {
  var ArrayProto = Array.prototype;
  var slice = ArrayProto.slice;
  console.log(array, count);
  if (count == null || count < 1) return [];
  var result = [];
  var i = 0,
    length = array.length;
  while (i < length) {
    result.push(slice.call(array, i, (i += count)));
  }
  console.log(result);
  return result;
};

// 根据字段筛选更加重复数据
// json ：JSON对象
// field：字段名
//isnull true 包括空的，false 不包括空的
// 返回重复的field数据
export const CountJson = function (json, field, isnull = false) {
  var count = 0;
  if ("" == json) {
    return false;
  }
  var obj = json,
    len = obj.length,
    result = new Array(),
    resultList = new Array();
  for (var i = 0, x = 0; i < len; i++) {
    var id = obj[i][field];
    try {
      id = id.trim();
    } catch (error) {}
    if (!id) continue;
    if (result[id]) {
      obj[i].index = i;
      // resultList[x] = obj[i];
      resultList[x] = i + 1;
      (count = 1), x++;
    } else {
      result[id] = 1;
    }
  }
  if (count == 1) {
    return resultList;
  }
  return null;
};

// base64转blob
export const base64ToBlob = function (base64Data) {
  let arr = base64Data.split(","),
    fileType = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    l = bstr.length,
    u8Arr = new Uint8Array(l);

  while (l--) {
    u8Arr[l] = bstr.charCodeAt(l);
  }
  return new Blob([u8Arr], {
    type: fileType,
  });
};
// blob转file
export const blobToFile = function (newBlob, fileName) {
  newBlob.lastModifiedDate = new Date();
  newBlob.name = fileName;
  return newBlob;
};

/**
 * 对象数组根据指定属性去重，return回 去重后的数组
 * @param {*} arr 原始数组
 * @param {*} key 去重的key值
 */
export const ArrdeWeight = (arr, key) => {
  // 缓存用于记录
  const cache = [];
  for (const t of arr) {
    // 检查缓存中是否已经存在
    if (cache.find((c) => c[key] === t[key])) {
      // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
      continue;
    }
    // 不存在就说明以前没遇到过，把它记录下来
    cache.push(t);
  }

  // 记录结果就是过滤后的结果
  return cache;
};

/**
 * 数组随机乱序算法
 * @param {*} array 
 */
export const shuffle = (array) => {
  var m = array.length,
      t, i;
  while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
  }
  return array;
}

/**
 * vw vh转px
 * @param {Srring} value
 */
export const viewportToPixels = function (value) {
  var parts = value.match(/([0-9\.]+)(vh|vw)/);
  var q = Number(parts[1]);
  var side =
    window[["innerHeight", "innerWidth"][["vh", "vw"].indexOf(parts[2])]];
  return side * (q / 100);
};


/**
 * 根据指定字段返回新json
 * @param {*} val 指定的字段名key
 * @param {Array} data 要提取的json数组
 * @param {Boolean} isArray 一个数组或多个数组 默认返回多个数组
 * @returns {Array} 返回提取出的新数组
 */

export const jsonKeyToVal=(val, data, isArray=false)=>{
  console.log(data)
  if(isArray)return data.map(n =>n[val]).join(',');
  return data.map(n => n[val]);
}

/**
 * 将指点节点缩放
 * @param {String} name 要缩放的dom  可传class id 标签等等  等同于document.querySelectorAll(name)
 */
export const bodyScale=(name='body',scale_check=null)=> {
  var devicewidth = document.documentElement.clientWidth;
  var scale = scale_check?scale_check:devicewidth / 1920; // 分母——设计稿的尺寸
  console.log(scale);
  let documents = document.querySelectorAll(name)
    for(let i=0;i<documents.length;i++){
    let element=documents[i];
    element.style.zoom = scale;
  }
}


export const bodyResize= ()=> {
  
function resize () {
  // 系统整体缩放
  let cliWidth = document.documentElement.clientWidth || document.body.clientWidth
  let cliHeight = document.documentElement.clientHeight || document.body.clientHeight
  let contW = 1920
  let contH = 1080
  let w = cliWidth / contW
  let h = cliHeight / contH
  // this.$store.dispatch('view/setResize', [w, h])
  let appDom = document.querySelector('#app')
  appDom.style.transform = 'scale(' + w + ',' + h + ')'
  appDom.style.transformOrigin = 'top left'
  appDom.style.width = contW + 'px'
  appDom.style.height = contH + 'px'
}
  // 系统整体缩放
  // resize()
  // let cliWidth = document.documentElement.clientWidth || document.body.clientWidth
  // let cliHeight = document.documentElement.clientHeight || document.body.clientHeight
  // let contW = 1920
  // let contH = 1080
  // let w = cliWidth / contW
  // let h = cliHeight / contH
  // let appDom = document.querySelector('#app')
  // let size = cliWidth / cliHeight
  // if (cliWidth === screen.width) {
  //   // that.$store.dispatch('view/setResize', [w, h])
  //   appDom.style.transform = 'scale(' + w + ',' + h + ')'
  // } else if (size > contW / contH) {
  //   // that.$store.dispatch('view/setResize', [w, h])
  //   appDom.style.transform = 'scale(' + h + ',' + h + ')'
  // } else {
  //   // that.$store.dispatch('view/setResize', [w, w])
  //   appDom.style.transform = 'scale(' + w + ',' + w + ')'
  // }
  // appDom.style.transformOrigin = 'top left'
  // appDom.style.width = contW + 'px'
  // appDom.style.height = contH + 'px'
}


/**
 * 传入json和名字，将json保存为文件下载到本地
 * @param {Json} data 
 * @param {String} filename 
 */
export const saveJSON=(data, filename)=> {
  if (!data) {
    alert('data is null');
    return;
  }
  if (!filename) {
    filename = 'json.json'
  }
  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4)
  }
  var blob = new Blob([data], { type: 'text/json' });
  var e = document.createEvent('MouseEvents');
  var a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
}

export const getFileJson=(file)=>{
  return new Promise(function(resolve, reject) {
  var reader = new FileReader();//新建一个FileReader
  reader.readAsText(file, "UTF-8");//读取文件
  reader.onload = function (evt) { //读取完文件之后会回来这里
     let fileString = evt.target.result; // 读取文件内容
      // console.log(fileString);
      resolve(JSON.parse(fileString))
  }
  reader.onerror = function() {
    reject(new Error('不能正确解析文件，请重新导出后再试'));
  };

});

}

/**
 * 过滤出json对象中指定具有指定键值的数据
 * @param {JSON Array} data 
 * @param {String} key 
 * @param {String} val 
 * @returns {JSON Array} 返回所有符合条件的数据
 */
export const filterKeyAndValToJson=(data,key,val='')=>{
  let arr=[];
  for(let i=0;i<data.length;i++){
      let el=data[i];
      console.log(el[key])
      let keys=el[key]?el[key]:'';
      if(keys.indexOf(val)!==-1){
        arr[arr.length]=el;
      }
  }
  return arr;
  
  }


export const fillArrayToLen=(arr,len)=>{
  let array=[...arr];
  while (true) {
    array=[...array,...arr]
    if(array.length>len)break
  }
  return array.slice(0,len)
}