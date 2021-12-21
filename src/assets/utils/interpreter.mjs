import {log} from './Logger.mjs';
export {
  interpret,
  getAngel,
  toAngel,
  printAngel,
  numAdd,
  numMinus,
  numDivide,
  numMultiply,
  check
}


/* -------------------base function----------------------- */

/**
 * @description: 返回小数中的秒
 * @param {Number} angel
 * @return {Number}
 */
function getSec(angel) {
  return Number(angel.split('.',2)[1].substr(2,2));
}

/**
 * @description: 返回小数中的分
 * @param {Number} angel
 * @return {Number}
 */
function getMinute(angel) {
  return Number(angel.split('.',2)[1].substr(0,2));
}
/**
 * @description: 将角度数转换为对象
 * @param {Number} angel
 * @return {Object}
 */
function getAngel(angel) {
  angel = Number(angel).toFixed(4);
  return {
    ang: angel < 0 ? -Math.floor(-angel) : Math.floor(angel),//角
    min: angel < 0 ? getMinute(-angel) : getMinute(angel),//分
    sec: angel < 0 ? getSec(-angel) : getSec(angel),//秒
  }
}
/**
 * @description:角度对象转数字
 * @param {Object} ang1
 * @return {Number}
 */
function toAngel(angel) {
  if (Object.keys(angel).length === 0) return 0;
  let absAng = Math.abs(angel.ang) + angel.min * 0.01 + angel.sec * 0.0001;
  return angel.ang < 0 || Object.is(angel.ang, -0) ? (-absAng).toFixed(4) : absAng.toFixed(4);
}
/**
 * @description: 角度转换为纯数字（全转换为秒）
 * @param {Number} angel
 * @return {Number}
 */
function convertToNum(angel) {
  angel = getAngel(angel);
  let isNegetive = angel.ang < 0 || Object.is(angel.ang, -0);
  let num = (angel.min * 60 + angel.sec);
  return angel.ang * 3600 + (isNegetive ? -num : num);
}
/**
 * @description: 纯数字转换为角度obj
 * @param {Number} num
 * @return {Object}
 */
function convertToAngel(num) {
  let isNegetive = (num - 0) < 0;
  num = Math.abs(num);
  let obj = {};
  obj.ang = isNegetive ? -Math.floor(num / 3600) : Math.floor(num / 3600);
  obj.min = Math.abs(Math.floor(num / 60) % 60);
  obj.sec = Math.abs(num % 60);
  return toAngel(obj);
}

function printAngel(angNum) {
  let ang = getAngel(check(angNum));
  return `${Object.is(ang.ang, -0) ? '-' : ''}${ang.ang}° ${ang.min < 10 ? '0' + ang.min : ang.min}′ ${ang.sec < 10 ? '0' + ang.sec : ang.sec}″`;
}

/* ------------------base fuuction----------------------- */

/**
 * @description: 角度加和函数
 * @param {Number} ang1
 * @param {Number} ang2
 * @return {Number}
 */
function add(ang1, ang2) {
  if (ang1 < 0) {
    if (ang2 > 0) return minus(ang2, -ang1);
  } else {
    if (ang2 < 0) return minus(ang1, -ang2);
  }
  var angel1 = getAngel(ang1);
  var angel2 = getAngel(ang2);
  var angel = {
    ang: 0,
    min: 0,
    sec: 0,
  }
  angel.sec = (angel1.sec + angel2.sec) % 60;
  angel.min = (angel1.min + angel2.min + Math.floor((angel1.sec + angel2.sec) / 60)) % 60;
  angel.ang = (angel1.ang + angel2.ang) + Math.floor((angel1.min + angel2.min) / 60);
  return toAngel(angel);
}

/**
 * @description: 角度相减函数
 * @param {Number} ang1
 * @param {Number} ang2
 * @return {Number}
 */
function minus(ang1, ang2) {
  if (ang1 < 0) {
    if (ang2 > 0) return add(ang1, -ang2);
  } else if (ang1 === 0) {
    return -ang2;
  } else {
    if (ang2 < 0) return add(ang1, -ang2);
  }
  if (ang1 < ang2) return -minus(ang2, ang1);
  var a1 = getAngel(ang1);
  var a2 = getAngel(ang2);
  var angel = {
    ang: 0,
    min: 0,
    sec: 0,
  }
  let minoffset = (a1.sec >= a2.sec ? 0 : 1);
  let angoffset = (a1.min - minoffset >= a2.min ? 0 : 1);
  angel.sec = a1.sec >= a2.sec ? a1.sec - a2.sec : (a1.sec + 60 - a2.sec);
  angel.min = ((a1.min - minoffset) >= a2.min ? a1.min - a2.min : a1.min + 60 - a2.min) - minoffset;
  angel.ang = a1.ang - a2.ang - angoffset;
  return toAngel(angel);
}

function numAdd(ang1, ang2) {
  let result = convertToNum(ang1) + convertToNum(ang2);
  return convertToAngel(result);
}
function numMinus(ang1, ang2) {
  let result = convertToNum(ang1) - convertToNum(ang2);
  return convertToAngel(result);
}
/**
 * @description: 角度除法,
 * @param {Number} ang 除数
 * @param {Number} dividend 被除数,自动向下取整
 * @return {Number}
 */
function numDivide(ang, dividend) {
  if (dividend * 1 === 0) {
    throw new TypeError('can`t divide zero!');
  }
  dividend = Math.floor(dividend);
  let angNum = convertToNum(ang);
  return convertToAngel(Math.floor(angNum / dividend));
}
/**
 * @description  角度乘法
 * @param {Number} ang1
 * @param {Number} multiplier 乘数 自动向下取整
 * @return {Number}
 */
function numMultiply(ang, multiplier) {
  multiplier = Math.floor(multiplier);
  let angNum = convertToNum(ang);
  return convertToAngel(Math.floor(angNum * multiplier));
}

/**
 * @description: 计算算术表达式
 * @param {String} input
 * @return {Number}
 */
function interpret(input) {
  let states = [];
  let results = [];
  while (/\([^(]+?\)/.test(input)) {
    let state = /\([^(]+?\)/.exec(input);
    states.push(state[0]);
    input = input.replace(state[0], `$${states.length}`);
  }

  let pattern = /[^+-]+(?:[*/][^+-]+)+/g;
  //移除所有的空格
  input = input.replace(pattern, '($&)').replace(/\s+/g, '');
  while (/\([^(]+?\)/.test(input)) {
    let state = /\([^(]+?\)/.exec(input);
    states.push(state[0]);
    input = input.replace(state[0], `$${states.length}`);
  }
  states.push(input);
  for (let i in states) {
    results[i] = calculate(states[i].replace(/\$(\d+)/g, (_, num) => results[num * 1 - 1])/* 替换掉占位符 */
      .replace(/^\(/, '').replace(/\)$/, '')/* 去除前后括号 */);
  }

  return { states, results };
}

function calculate(input) {
  input = input.replace(/\+/g, ' + ').replace(/-/g, ' - ').replace(/\*/g, ' * ').replace(/\//g, ' / ').replace(/\s+/g, ' ');
  let items = input.trim().split(' ').map((v) => /[+\-*/]/.test(v) ? v : check(v));
  let flag = 0;//flag===1 加，flag===2 减 flag===0 无
  let result = 0;
  for (let item of items) {
    switch (item) {
      case '+':
        flag = flag === 2 ? 2 : 1;
        continue;
      case '-':
        flag = flag === 2 ? 1 : 2;
        continue;
      case '*':
        flag = 3;
        continue;
      case '/':
        flag = 4;
        continue;
      default:
        break;
    }
    switch (flag) {
      case 1:
        log(`add:${result}+${item}=${numAdd(result, item)}`);
        result = add(result, item);
        break;
      case 2:
        log(`minus:${result}-${item}=${numMinus(result, item)}`);
        result = minus(result, item);
        break;
      case 3:
        log(`multiply:${result}*${item}=${numMultiply(result, item)}`);
        result = numMultiply(result, item);
        break;
      case 4:
        log(`divide:${result}/${item}=${numDivide(result, item)}`);
        result = numDivide(result, item);
        break;
      default:
        result = item;
        break;
    }
    //操作完成后清除flag
    flag = 0;

  }
  return result;
}
/**
 * @description: 检查角度合法性
 * @param {*} angNum
 * @return {Number} 角度数字值
 */
function check(angNum) {
  log('angel checking', angNum, getAngel(angNum));
  let ang = getAngel(angNum);
  if (Number.isNaN(ang.ang) || Number.isNaN(ang.min) || Number.isNaN(ang.sec) || ang.min >= 60 || ang.sec >= 60) {
    throw new Error(angNum + '不是合法的角度值');
  }
  return Number(angNum);
}