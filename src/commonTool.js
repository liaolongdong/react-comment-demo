// 开发中经常用到的通用函数方法

// 毫秒数转换成日期（格式：yyyy-mm-dd、yyyy-mm-dd hh:mm、yyyy-mm-dd hh:mm:ss）
// 参数说明：timeStamp为时间戳毫秒数，type：1 对应日期格式yyyy-mm-dd hh:mm  2 对应日期格式yyyy-mm-dd hh:mm:ss
export const formatDate = (timeStamp, type) => {
  let formatDateStr = '';
  let date = new Date(timeStamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  second = second < 10 ? '0' + second : second;
  if (type === 1) {
    formatDateStr = `${year}-${month}-${day} ${hour}:${minute}`;
  } else if (type === 2) {
    formatDateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  } else {
    formatDateStr = `${year}-${month}-${day}`;
  }
  return formatDateStr;
}
// 测试结果
console.log(formatDate(1506664038876)); // 2017-09-29
console.log(formatDate(1506664038876, 1)); // 2017-09-29 13:47
console.log(formatDate(1506664038876, 2)); // 2017-09-29 13:47:18

// 距离当前时间多久（几秒前、几分钟前、几小时前）
export const durationTime = (timeStamp) => {
  let durationTimeStr = '';
  let duration = (+Date.now() - timeStamp) / 1000;
  if (duration < 60) {
    durationTimeStr = `${Math.round(duration)}秒前`;
  } else if (duration >= 60 && duration < 60 * 60) {
    durationTimeStr = `${Math.round(duration / 60)}分钟前`;
  } else if (duration >= 60 * 60 && duration < 60 * 60 * 24) {
    durationTimeStr = `${Math.round(duration / 60 / 60)}小时前`;
  } else {
    // 使用上面的日期格式化formatDate方法
    durationTimeStr = formatDate(timeStamp, 2);
  }
  return durationTimeStr;
}
// 测试结果
console.log(durationTime(1506664038876)); // 10分钟前

// 倒计时（距离现在还有00天00小时00分钟00秒）
// 参数说明：remainTime: 剩余时间毫秒数，mountId:挂载dom节点
let futureDateTime = Date.parse('2018-10-25');
export const countDownNow = (remainTime, mountId) => {
  let intDay, intHour, intMin, intSecond, timeStr;
  let saveRemainTime = remainTime;
  remainTime = remainTime - Date.now(); // 剩余时间减去当前时间
  if(remainTime > 0) {
    intDay = Math.floor(remainTime / (24 * 60 * 60 * 1000)); // 剩余天数
    remainTime = remainTime - (intDay * 24 * 60 * 60 * 1000); // 减去剩余天数的毫秒数
    intHour = Math.floor(remainTime / (60 * 60 * 1000)); // 剩余小时数
    remainTime = remainTime - (intHour * 60 * 60 * 1000); // 减去剩余小时数的毫秒数
    intMin = Math.floor(remainTime / (60 * 1000)); // 剩余分钟数
    remainTime = remainTime - (intMin * 60 * 1000); // 减去剩余分钟数的毫秒数
    intSecond = Math.floor(remainTime / 1000); // 剩余秒数
    intDay < 10 && (intDay = '0' + intDay);
    intHour < 10 && (intHour = '0' + intHour);
    intMin < 10 && (intMin = '0' + intMin);
    intSecond < 10 && (intSecond = '0' + intSecond);
    timeStr = intDay + '天' + intHour + '时' + intMin + '分' + intSecond + '秒';
    // document.getElementById(mountId).innerText = timeStr;
    // 配合测试
    console.log('剩余时间', timeStr);
    setTimeout(function () {
      countDownNow(saveRemainTime, mountId);
    }, 1000);
  } else {
    console.log('666', timeStr);
    // document.getElementById(mountId).innerText = '该时间点已过';
  }
}

// 测试结果
countDownNow(futureDateTime, 'mountId');
// 剩余时间 284天15时34分26秒
// 剩余时间 284天15时34分22秒 .....

// 手机格式校验
export const checkPhoneNum = (phoneNum) => {
  let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
  return phoneReg.test(phoneNum);
}
// 测试结果
console.log(checkPhoneNum(13556891025)); // true

// 手机格式化（135 **** 1025、135-****-1025）
// 参数说明：phoneNum 需要格式化的手机号 connector 格式化的连接字符
export const formatPhoneNum = (phoneNum, connector) => {
    let arr = phoneNum.split('');
    connector = connector || ' ';
    arr.splice(3, 0, connector);
    arr.splice(8, 0, connector);
    return arr.join('');
}
// 测试结果
console.log(formatPhoneNum('135****1025')); // '135 **** 1025'
console.log(formatPhoneNum('135****1025', '-')); // '135-****-1025'

// 获取url参数
// 参数说明：name 要获取参数值的名称
// 如https://www.baidu.com/?id=123456&name=xiaoxin
export const getUrlQueryString = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  // let r = window.location.search.substr(1).match(reg);
  let r = 'id=123456&name=xiaoxin'.match(reg);
  if (r !== null) {
    return decodeURI(r[2]);
  } else {
    return null;
  }
}
// 测试结果
console.log(getUrlQueryString('id')); // '123456'
console.log(getUrlQueryString('name')); // 'xiaoxin'

// 移动端判断微信浏览器、android、ios
export const whatDevice = () => {
  let device = '';
  let ua = window.navigator.userAgent.toLowerCase();
  if (/MicroMessenger/i.test(ua)) {
    device = 'wx';
  } else if (/(Android)/i.test(ua)) {
    device = 'android';
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
    device = 'ios';
  }
  return device;
}
// 测试结果
console.log(whatDevice()); // 'ios'

// cookie的获取、添加、删除
export const addCookie = (name, value, expiresHours) => {
  let cookieStr = '';
  // 如果value为对象，进行序列化操作
  if (Object.prototype.toString.call(value) === '[object Object]') {
    value = JSON.stringify(value);
  }
  cookieStr = name + '=' + value;
  if (expiresHours) {
    let date = new Date();
    date.setTime(date.getTime() + expiresHours * 3600 * 1000);
    cookieStr = cookieStr + ';expires=' + date.toGMTString();
  }
  document.cookie = cookieStr + ';path=/';
}

export const getCookie = (name) => {
  let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
  if (arr != null) {
    if ((/^\{.*\}$/g).test(arr[2])) {
      return JSON.parse(arr[2]);
    }
    return arr[2];
  }
  return null;
};

// 测试结果
let userInfo = {
  naem: 'xiaoxin',
  age: 18
};
addCookie('userInfo', userInfo);
console.log(getCookie('userInfo')); // {naem: "xiaoxin", age: 18}
let userName = 'liaoxiaoxin';
addCookie('userName', userName);
console.log(getCookie('userName')); // 'liaoxiaoxin'

// 生成由数字和字母组合的随机字符串
export const getNonceStr = (num) => {
  let res = '';
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (let i = 0; i < num; i++) {
    let index = Math.ceil(Math.random() * 35);
    res += chars[index];
  }
  return res;
};

// 测试结果
console.log(getNonceStr(28)); // 'KYN4UDPK1KXOSZ9W4UARD6RT79LE'

// 按自然顺序排序参数对象字符串，如连接方式userName=liaoxiaoxin&age=18
export const getParamsStr = (paramsObj) => {
  let paramsStr = '';
  const keys = Object.keys(paramsObj).sort();
  keys.map((key) => {
    paramsStr += `&${key}=${paramsObj[key]}`;
  });
  paramsStr = paramsStr.substr(1);
  return paramsStr;
};

// 测试结果
let params = {
  userName: 'xiaoxin',
  age: 18,
  position: 'front-end engineer'
}
console.log(getParamsStr(params)); // age=18&position=front-end engineer&userName=xiaoxin

// 禁止输入框输入表情校验
export const maskEmoji = (text) => {
  let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  if (regRule.test(text)) {
    text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '');
    alert('不能输入表情');
  }
  return text;
};

// 快速排序算法ES6实现方式
export const quickSort = (arr) => {
  if (!arr.length) {
    return [];
  }
  const [prev, ...rest] = arr;
  return [
    ...quickSort(rest.filter(value => value < prev)),
    prev,
    ...quickSort(rest.filter(value => value >= prev))
  ];
}

// 测试结果
let arr = [6, 2, 9, 4, 7, 1, 8, 3, 5, 6, 9, 3];
console.log(quickSort(arr)); // [1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9]