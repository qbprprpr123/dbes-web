/**
 * @intro: 工具类.
 */
import EncUtf8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
import ModeEcb from 'crypto-js/mode-ecb';
import PadPkcs7 from 'crypto-js/pad-pkcs7';
import lodashDebounce from 'lodash/debounce';

/**
 * 空函数
 */
export const empty = () => {};

/**
 * 查询参数对象字符串花
 * @param object  参数对象
 * @return {string} 格式化的字符串
 */
export const queryStringify = (object) => {
  if (!object) return '';

  return Object.keys(object)
    .map((key) => {
      const value = object[key];
      if (value === undefined) return '';
      if (value === null) return key;

      return `${key}=${encodeURIComponent(value)}`;
    })
    .filter((v) => !!v)
    .join('&');
};

/**
 * 函数防抖
 * @param fn  方法
 * @param delay 延迟毫秒
 * @returns {(function(...[*]): void)|*}
 */
export const debounce = lodashDebounce;

/**
 * aes 加密
 * @params {String}     word    待加密字符串
 * @params {String}     keyStr  加密盐
 * @return {String}     加密后的结果字符串
 */
export const aesEncrypt = (word, keyStr) => {
  if (!word) return '';
  const key = EncUtf8.parse(keyStr);
  const srcs = EncUtf8.parse(word);
  const encrypted = AES.encrypt(srcs, key, {
    mode: ModeEcb,
    padding: PadPkcs7,
  });
  return encrypted.toString();
};

/**
 * aes 解密
 * @param  {String}     word        加密字符串
 * @param  {String}     keyStr      加密盐
 * @return {String}     解密之后的结果，明文
 */
export const aesDecrypt = (word, keyStr) => {
  if (!word) return '';
  const key = EncUtf8.parse(keyStr);
  const decrypt = AES.decrypt(word, key, {
    mode: ModeEcb,
    padding: PadPkcs7,
  });
  return EncUtf8.stringify(decrypt).toString();
};

// UUID
export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise,no-mixed-operators
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

/**
 * 将字节大小转换为KB,MB,GB....
 * @param bytes 字节数字
 * @param units 单位转换数组  如：['字节','多少k']====>xxxxx 字节
 * @param decimal 小数位
 * @returns {string}
 */
export const formatBytes = (bytes, units, decimal = 0) => {
  const k = 1024;
  const unitArr = units || [];
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const formatArr = unitArr.concat(sizes.slice(unitArr.length, sizes.length));

  if (!bytes) return `0${formatArr[0]}`;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line no-restricted-properties
  return `${parseFloat((bytes / k ** i).toFixed(decimal))}${formatArr[i]}`;
};

/**
 * 判断是否是node
 * @param node
 * @returns {boolean}
 */
export const isVNode = (node) =>
  node !== null && typeof node === 'object' && global.hasOwnProperty.call(node, 'componentOptions');

/**
 * 对象转formData对象
 * @param obj 对象
 * @returns {FormData}
 */
export const object2FormData = (obj = {}) => {
  const fd = new FormData();
  Object.keys(obj).forEach((key) => {
    fd.append(key, obj[key]);
  });

  return fd;
};

/**
 * 去掉字符串前后空白
 * @param str
 * @returns {*}
 */
export const trim = (str) => str?.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');

/**
 * 是否是空元素
 * @param c vue组件对象
 * @returns {boolean}
 */
export const isEmptyElement = (c) => !(c.tag || (c.text && c.text.trim() !== ''));
/**
 * 空数组过滤
 * @param children
 * @returns {*[]}
 */
export const filterEmpty = (children = []) => children.filter((c) => !isEmptyElement(c));

/**
 * 是否是无数据
 * @param str 字符串
 * @returns {boolean}
 */
export const isEmptyStr = (str) => str == null || str === '';

/**
 * rgb to hex
 * @param r
 * @param g
 * @param b
 * @returns {string}
 */
export const rgbToHex = (r, g, b) => {
  // eslint-disable-next-line no-bitwise
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`;
};

/**
 * hex to rgb
 * @param hexStr
 * @returns {*[]}
 */
export const hexToRgb = (hexStr) => {
  const substrHandle = (arg1, arg2) => hexStr.substr(arg1, arg2);
  const parseIntHandle = (v) => Number.parseInt(v, 16);
  if (hexStr.length === 4) {
    // #000
    return substrHandle(1)
      .split('')
      .map((s) => 0x11 * parseIntHandle(s, 16));
  }
  // #000000
  return [substrHandle(1, 2), substrHandle(3, 2), substrHandle(5, 2)].map((s) => parseIntHandle(s, 16));
};

/**
 * 计算渐变过渡色
 * @param startColor
 * @param endColor
 * @param step
 * @returns {String[]}
 */
export const gradientTransitionColor = (startColor, endColor, step) => {
  // 将hex转换为rgb
  const sColor = hexToRgb(startColor);
  const eColor = hexToRgb(endColor);

  // 计算R\G\B每一步的差值
  const rStep = (eColor[0] - sColor[0]) / step;
  const gStep = (eColor[1] - sColor[1]) / step;
  const bStep = (eColor[2] - sColor[2]) / step;

  const gradientColorArr = [];
  for (let i = 0; i < step; i += 1) {
    // 计算每一步的hex值
    gradientColorArr.push(
      rgbToHex(
        Number.parseInt(rStep * i + sColor[0], 10),
        Number.parseInt(gStep * i + sColor[1], 10),
        Number.parseInt(bStep * i + sColor[2], 10),
      ),
    );
  }
  return gradientColorArr;
};

/**
 * 获取element-ui组件DatePicker时间选择的起止时间
 * @param limitTime 限制时间
 * @returns {{disabledDate: ((function(*): (*))|*), onPick: ((function(*): (*))|*)}}
 */
export const getPickerOptionsByTimeSpace = (limitTime) => {
  let currentTime = null;

  return {
    onPick: ({ maxDate, minDate }) => {
      if (minDate instanceof Date) {
        currentTime = minDate.setHours(0, 0, 0, 0);
      }
      if (maxDate) {
        currentTime = null;
      }
    },
    disabledDate: (time) => {
      const nowTimestamp = new Date().setHours(23, 59, 59, 0);
      const timeTimestamp = time.getTime();
      const defDisabled = timeTimestamp > nowTimestamp;

      if (currentTime && limitTime) {
        const minTime = currentTime - limitTime;
        const maxTime = currentTime + limitTime;

        return defDisabled || timeTimestamp < minTime || timeTimestamp > maxTime;
      }

      return defDisabled;
    },
  };
};

/**
 * 本地存储加密
 * @param str 待加密字符串
 * @returns {string}  加密后的字符串
 */
export const storageEncrypt = (str) => btoa(encodeURIComponent(str));

/**
 * 本地存储解密
 * @param str 带解密字符串
 * @returns {string}  解密后的字符串
 */
export const storageDecrypt = (str) => decodeURIComponent(atob(str));

/**
 * 默认图表的轴文本样式
 */
export const defaultChartAxisLabelStyle = {
  color: '#666',
};

/**
 * 默认图表的轴线样式
 */
export const defaultChartAxisLineStyle = {
  color: '#d0d9df',
};
