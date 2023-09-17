import { cuspBracketsRegExp, ipv4RegExp, ipv6RegExp, passwordRegExpByLevel, phoneRegExp, urlRegExp, userNameRegExp, ipv4SegmentRegExp, portStrByCrossRegExp } from './regexp';

/**
 * 判断是否是 FormData
 * @param formData
 * @returns {boolean}
 */
export const isFormData = (formData) => !!formData && Object.prototype.toString.call(formData) === '[object FormData]';

/**
 * 判断是否是 Blob
 * @param blob
 * @returns {boolean}
 */
export const isBlobData = (blob) => !!blob && Object.prototype.toString.call(blob) === '[object Blob]';

/**
 * 判断是否是 File
 * @param file
 * @returns {boolean}
 */
export const isFileData = (file) => !!file && Object.prototype.toString.call(file) === '[object File]';

/**
 * 是否是表单数据格式化
 * @param d
 * @returns {boolean}
 */
export const isFormScheme = (d) => typeof d === 'string' && /([^&?]*)=([^&?]*)/i.test(d);

/**
 * 判断接口返回的code是否正确
 * @param code  接口返回的code
 * @returns {boolean}
 */
export const judgeCode = (code) => /^0$/.test(code);
/**
 * 判断接口返回的code是否未登录
 * @param code  接口返回的code
 * @returns {boolean}
 */
export const judgeUnLoginCode = (code) => /^(401|10103|10104|10105|10106|10107|10108|10109)$/.test(code);
/**
 * 验证用户名
 * @param userName  用户名
 * @returns {boolean}
 */
export const verifyUserName = (userName) => userNameRegExp.test(userName);
/**
 * 验证手机号码
 * @param phone 手机号码
 * @returns {boolean}
 */
export const verifyPhone = (phone) => phoneRegExp.test(phone);
/**
 * 验证是否是ipv6
 * @param value ip地址
 * @returns {boolean}
 */
export const verifyIpv6 = (value) => ipv6RegExp.test(value);
/**
 * 验证是否是域名或者ip地址
 * @param value 域名或者ip地址
 * @returns {boolean}
 */
export const verifyDomainOrIp = (value) => {
  const inputArr = value && value.indexOf('.') !== -1 && value.split('.');
  const isIp = inputArr && inputArr.every((item) => !Number.isNaN(Number(item)) && typeof Number(item) === 'number');
  return isIp
    ? /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)
    : /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/.test(value);
};

/**
 * 根据密码等级验证密码
 * @param {Number} level 密码等级
 * @returns {function(*): *}
 */
export const verifyPasswordByLevel = (level) => (value) => passwordRegExpByLevel(level).test(value);

/**
 * 验证是否是ipv4
 * @param value ip地址
 * @returns {boolean}
 */
export const verifyIpv4 = (value) => ipv4RegExp.test(value);
/**
 *
 * 验证是否是ipv4或者是ipv6
 * @param value ip地址
 * @returns {boolean}
 */
export const verifyIpv4OrIpv6 = (value) => verifyIpv4(value) || verifyIpv6(value);

/**
 *
 * 验证是否是ipv4地址段
 * @param value ip地址段
 * @returns {boolean}
 */
export const verifyIpv4Segment = (value) => ipv4SegmentRegExp.test(value);

/**
 *
 * 验证端口号，内容只能有两个区间范围，例：2|2000-3000
 * @param value ip地址段
 * @returns {boolean}
 */
export const verifyPortStrByCross = (value) => portStrByCrossRegExp.test(value);

/**
 * 验证输入的内容只能是字母，数字，下划线
 * @param value 输入的内容
 * @returns {boolean}
 */
export const verifyAlphaNumLine = (value) => /^\w*$/g.test(value);
/**
 * 根据最大值验证正整数，不能以0开头，最小值为1
 * @param maxValue  最大值
 * @returns {function(*)}
 */
export const verifyPositiveIntegerByMax = (maxValue) => (value) => {
  const isMax = maxValue ? Number(value) <= maxValue : true;
  return /^[1-9][0-9]*$/.test(value) && isMax;
};

/**
 * 验证不能包含空格
 * @param value 字符串
 * @returns {boolean}
 */
export const verifyNotSpace = (value) => !/[\s]/i.test(value);
/**
 * 验证不能输入点和空格
 * @param value
 * @returns {boolean}
 */
export const verifyNotPointOrSpace = (value) => !/[.\s]/im.test(value);

/**
 * 验证是否是url地址
 * @param value url地址
 * @returns {boolean}
 */
export const verifyUrl = (value) => urlRegExp.test(value);

/**
 * 验证是否包含<>^和空格
 * @param value
 * @returns {boolean}
 */
export const verifyCuspBrackets = (value) => cuspBracketsRegExp.test(value);

/**
 * 判断两个ip地址是否在同一网段
 * @param addr1 地址一
 * @param addr2 地址二
 * @param mask  子网掩码
 */
export const ipv4IsEqualSegment = (addr1, addr2, mask) => {
  if (!addr1 || !addr2 || !mask) return false;

  const parseIntFn = (v) => Number.parseInt(v, 10);

  const res1 = [];
  const res2 = [];

  const addr1List = addr1.split('.');
  const addr2List = addr2.split('.');
  const maskList = mask.split('.');

  for (let i = 0, { length } = addr1List; i < length; i += 1) {
    const maskVal = parseIntFn(maskList[i]);
    // eslint-disable-next-line no-bitwise
    res1.push(parseIntFn(addr1List[i]) & maskVal);
    // eslint-disable-next-line no-bitwise
    res2.push(parseIntFn(addr2List[i]) & maskVal);
  }

  return res1.join('.') === res2.join('.');
};

/**
 * 判断ip地址是否是从小到大
 * @param from  开始
 * @param to    结束
 */
export const ipv4IsEqualFromSmallToLarge = (from, to) => {
  if (!from || !to) return false;

  let fromRes = 0;
  let toRes = 0;

  const fromList = from.split('.');
  const toList = to.split('.');

  for (let i = 0, { length } = fromList; i < length; i += 1) {
    fromRes += Number.parseInt(fromList[i], 10);
    toRes += Number.parseInt(toList[i], 10);
  }

  return toRes > fromRes;
};
