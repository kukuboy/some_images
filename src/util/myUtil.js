/*
 * @Description: 便捷函数
 * @Author: 水印红枫
 * @Date: 2019-11-10 16:46:07
 * @LastEditors: 水印红枫
 */

export {
  sortObject,
  getTime,
  formatTime,
  insertTo,
  deepClone,
  versionCmd,
  cmd,
  checkPlatform,
  CheckUrlStatus,
  getQueryVariable,
  getNumberType,
  getUrlParams,
  timeCmd,
  arrayCmd,
  numMulti,
};
// TODO:以对象对应键值快速排序
const sortObject = function (arr, key, from = false) {
  if (!arr || arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  if (from) {
    for (let i of arr) {
      let a = Number(i[key]);
      let b = Number(pivot[key]);
      if (!a && a !== 0) {
        // TODO:转化失败不能比较大小，抛出异常
        console.log("该字段不能比较大小", i, key);
        return;
      }
      if (!b && b !== 0) {
        // TODO:转化失败不能比较大小，抛出异常
        console.log("该字段不能比较大小", pivot, key);
        return;
      }
      if (a >= b) {
        left.push(i);
      } else {
        right.push(i);
      }
    }
  } else {
    for (let i of arr) {
      let a = Number(i[key]);
      let b = Number(pivot[key]);
      if (!a && a !== 0) {
        // TODO:转化失败不能比较大小，抛出异常
        console.log("该字段不能比较大小", i, key);
        return;
      }
      if (!b && b !== 0) {
        // TODO:转化失败不能比较大小，抛出异常
        console.log("该字段不能比较大小", pivot, key);
        return;
      }
      if (a <= b) {
        left.push(i);
      } else {
        right.push(i);
      }
    }
  }
  // TODO:splice操作会更改原数组，故在此将原数组变回，否则当前数组指向一个地址的数组都会改变
  arr.splice(pivotIndex, 0, pivot);
  // console.log(left.concat([pivot], right))
  return this.sortObject(left, key, from).concat(
    [pivot],
    this.sortObject(right, key, from)
  );
};
// TODO:根据对应格式获取对应的日期
const getTime = function (format, time = new Date()) {
  // let time = new Date()
  // eslint-disable-next-line no-unused-vars
  let NowTime = "";
  let y = time.getFullYear();
  let M =
    time.getMonth() + 1 > 9 ? time.getMonth() + 1 : "0" + (time.getMonth() + 1);
  let d = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
  let h = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
  let m = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
  let s = time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
  for (let i = 0; i < format.length; i += 3) {
    let re;
    if (format.indexOf("YYYY") === i) {
      re = format.substring(i, i + 4);
      i += 2;
    } else {
      re = format.substring(i, i + 2);
    }
    switch (re) {
      case "YYYY":
        NowTime += y;
        break;
      case "MM":
        NowTime += M;
        break;
      case "DD":
        NowTime += d;
        break;
      case "HH":
        NowTime += h;
        break;
      case "mm":
        NowTime += m;
        break;
      case "SS":
        NowTime += s;
        break;
      default:
        NowTime += "";
    }
    if (i < format.length - 2) {
      NowTime += format.substring(i + 2, i + 3);
    }
  }
  return NowTime;
};
// TODO:获取以当前时间对比时间
const formatTime = function (time, countdown = false) {
  let nowTime = new Date().getTime();
  let inTime = new Date(time).getTime();
  // console.log(time, nowTime)
  if (inTime === "NaN") {
    return time;
  }
  if (countdown) {
    let allTime = inTime - nowTime;
    let D = Math.floor(allTime / 86400000);
    allTime %= 86400000;
    let H = Math.floor(allTime / 3600000);
    allTime %= 3600000;
    let S = Math.floor(allTime / 60000);
    allTime %= 60000;
    let m = Math.floor(allTime / 1000);
    return D + "天" + H + "时" + S + "分" + m + "秒";
  } else {
    let T = nowTime - inTime;
    if (T < 60000) {
      return "刚刚";
    } else if (T < 3600000) {
      return parseInt(T / 60000) + "分钟前";
    } else if (T < 86400000) {
      return parseInt(T / 3600000) + "小时前";
    } else if (T < 172800000) {
      return "一天前";
    } else {
      console.log(time);
      return this.getTime("YYYY-MM-DD HH:mm", new Date(inTime)).substr(5);
    }
  }
};
// TODO:数组比较大小
const arrayCmd = function (arr1, arr2) {
  if (arr1.length >= arr2.length) {
    for (let i in arr1) {
      let o = isNaN(parseInt(arr1[i])) ? 0 : parseInt(arr1[i]);
      let t = isNaN(parseInt(arr2[i])) ? 0 : parseInt(arr2[i]);
      if (o > t) {
        return 1;
      } else if (o < t) {
        return -1;
      } else {
        if (parseInt(i) === arr1.length - 1) {
          return 0;
        }
      }
    }
  } else {
    for (let i in arr2) {
      let o = isNaN(parseInt(arr1[i])) ? 0 : parseInt(arr1[i]);
      let t = isNaN(parseInt(arr2[i])) ? 0 : parseInt(arr2[i]);
      if (o > t) {
        return 1;
      } else if (o < t) {
        return -1;
      } else {
        if (i === arr2.length - 1) {
          return 0;
        }
      }
    }
  }
};
// TODO:时间对比
const timeCmd = function (time1, time2, sp = ":") {
  let one = time1.split(sp);
  let two = time2.split(sp);
  return arrayCmd(one, two);
};
// TODO:光标插入
const insertTo = function (ele, val) {
  if (document.selection) {
    let cursor = document.selection.createRange();
    cursor.text = val;
  } else if (ele.selectionStart || ele.selectionStart === 0) {
    let start = parseInt(ele.selectionStart);
    let end = parseInt(ele.selectionEnd);
    if (localStorage.getItem("SAVE_CURSOR_INDEX")) {
      start = parseInt(localStorage.getItem("CURSOR_SELECT_START"));
      end = parseInt(localStorage.getItem("CURSOR_SELECT_END"));
    } else {
      if (ele.value.length !== start) {
        // 说明是从中间开始插的
        localStorage.setItem("SAVE_CURSOR_INDEX", true);
      } else {
        localStorage.setItem("SAVE_CURSOR_INDEX", "");
      }
      if (
        !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ||
        /HUAWEI GRA-CL00/gi.test(window.navigator.userAgent)
      ) {
        // IOS中有bug正常插入的第二个会有问题
        if (
          localStorage.getItem("CURSOR_IOS_BUG_FIRST_START") ||
          localStorage.getItem("CURSOR_IOS_BUG_FIRST_START") === "0"
        ) {
          // 如果是第二次点击表情，就有这个值了。如果获取到的两个值相等
          // if (String(start) === String(localStorage.getItem('CURSOR_IOS_BUG_FIRST'))) {
          start = parseInt(
            localStorage.getItem("CURSOR_SELECT_START")
              ? localStorage.getItem("CURSOR_SELECT_START")
              : 0
          );
          end = parseInt(
            localStorage.getItem("CURSOR_SELECT_END")
              ? localStorage.getItem("CURSOR_SELECT_END")
              : 0
          );
          // }
        } else {
          // 如果是第一次点击，会没有这个值，ios获取到的值是正确的，start还是用 ele.selectionStart，把这个值存下来
          localStorage.setItem("CURSOR_IOS_BUG_FIRST_START", start);
          localStorage.setItem("CURSOR_IOS_BUG_FIRST_END", end);
        }
        // iosBugFlag = true
      }
    }
    let value = ele.value;
    ele.value = value.substring(0, start);
    ele.value += val;
    ele.value += value.substring(end, value.length);
  } else {
    ele.innerHTML += val;
  }
};

// TODO:对象或数组深度克隆
const deepClone = function (obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        newObj[i] =
          obj[i] && typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
  }
  return newObj;
};
// TODO:对象或数组啊判断是否相等
const cmd = function (obj1, obj2, type = 0) {
  if (type === 0) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, i)) {
        if (typeof obj1[i] === "object") {
          if (!this.cmd(obj1[i], obj2[i])) {
            return false;
          }
        } else {
          if (obj1[i] !== obj2[i]) {
            return false;
          }
        }
      }
    }
    return true;
  } else if (type === 1) {
    for (let i in obj1) {
      if (!obj2.includes(obj1[i])) {
        return false;
      }
    }
    return true;
  }
};
// TODO:手机端判断各个平台浏览器及操作系统平台
const checkPlatform = function (type = "app") {
  // eslint-disable-next-line no-debugger
  if (type === "app") {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
      // 这是微信平台下浏览器
      return "wx";
    }
    if (/hexin/i.test(navigator.userAgent)) {
      // 这是ths平台下浏览器
      return "hexin";
    }
  }
  if (/android/i.test(navigator.userAgent)) {
    // 这是Android平台下浏览器
    return "Android";
  }

  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    // 这是iOS平台下浏览器
    return "ios";
  }

  if (/Linux/i.test(navigator.userAgent)) {
    // 这是Linux平台下浏览器
    return "Linux";
  }

  if (/Linux/i.test(navigator.platform)) {
    // 这是Linux操作系统平台
    return "Linux";
  }
  return "none";
};
// TODO:版本判断 格式为以V开头以.分割，且为阿拉伯数字
const versionCmd = function (ver, currentVer) {
  let rep = /^V(\d|0\d)(\.\d|\.0\d|\.)+$/;
  // console.log(ver,currentVer,rep.test(ver),rep.test(currentVer))
  if (rep.test(ver) && rep.test(currentVer)) {
    let temp = ver.substring(1);
    temp = temp.split(".");
    let tempC = currentVer.substring(1);
    tempC = tempC.split(".");
    for (let i in temp) {
      tempC[i] = isNaN(parseInt(tempC[i])) ? 0 : parseInt(tempC[i]);
      temp[i] = isNaN(parseInt(temp[i])) ? 0 : parseInt(temp[i]);
      // console.log(tempC[i],temp[i])
      if (tempC[i] > temp[i]) {
        return 1;
      } else if (tempC[i] < temp[i]) {
        return -1;
      } else {
        if (i === temp.length - 1) {
          return 0;
        }
      }
    }
  }
};
// TODO:检查xmlhttp是否支持
const CheckUrlStatus = function (url) {
  let xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // IE6, IE5 浏览器执行代码
    // eslint-disable-next-line no-undef
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log("xmlhttp");
    }
  };
  xmlhttp.open("HEAD", url, true);
  xmlhttp.send();
  return xmlhttp.status === 200;
};
// TODO:获取url参数
const getQueryVariable = function (variable) {
  var query = window.location.search.substring(1);
  // debugger
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};
// TODO:获取url所有参数并返回对象
const getUrlParams = function () {
  let url = window.location.href.split("?");
  let end = {};
  try {
    if (url.length > 0) {
      let parmas = url[1].split("&");
      for (let i of parmas) {
        let param = i.split("=");
        if (param.length > 0) {
          end[param[0]] = param[1];
        }
      }
    }
    return end;
  } catch {
    return end;
  }
};
// TODO:阿拉伯相互装换
const getNumberType = function (num, to = "hz", from = "alb") {
  if (to === "hz" && from === "alb") {
    let hz;
    switch (num) {
      case 0:
        hz = "零";
        break;
      case 1:
        hz = "一";
        break;
      case 2:
        hz = "二";
        break;
      case 3:
        hz = "三";
        break;
      case 4:
        hz = "四";
        break;
      case 5:
        hz = "五";
        break;
      case 6:
        hz = "六";
        break;
      case 7:
        hz = "七";
        break;
      case 8:
        hz = "八";
        break;
      case 9:
        hz = "九";
        break;
    }
    return hz;
  }
};

// 小数乘法计算
function numMulti(num1, num2) {
  if (num1 === null) {
    return num1;
  }
  var baseNum = 0;
  try {
    baseNum +=
      num1.toString().indexOf(".") != -1
        ? num1.toString().split(".")[1].length
        : 0;
  } catch (e) {
    console.log(e);
  }
  try {
    baseNum +=
      num2.toString().indexOf(".") != -1
        ? num2.toString().split(".")[1].length
        : 0;
  } catch (e) {
    console.log(e);
  }
  return (
    (Number(num1.toString().replace(".", "")) *
      Number(num2.toString().replace(".", ""))) /
    Math.pow(10, baseNum)
  );
}
