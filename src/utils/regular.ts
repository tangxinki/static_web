// 用户名
export const userName = /^[a-zA-Z0-9_-]{4,16}$/

// 手机号
export const phone = /^1[3,4,5,6,8,7,9]{1}[\d]{9}$/

// 数字
export const number = /^[0-9]*\.?[0-9]*$/

// 整数
export const int = /^-?\d+$/

// 邮箱
// eslint-disable-next-line
export const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

// 字符串
export const string = /^[a-zA-Z0-9]*$/

// url路径
// eslint-disable-next-line
export const url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;

// 中文名称
export const cnName = /^[\u4E00-\u9FA5]{2,10}$/

// 身份证号
// eslint-disable-next-line
export const userCode = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

// 车牌号
// eslint-disable-next-line
export const carCode = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;

// 日期 yyyy-mm-dd 格式
export const dateReg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

// 时间 HH:mm:ss
export const timeReg = /((0?[0-9])|(1[0-9]|2[0-3])):(([1-5][0-9])|(0?[0-9])):(([1-5][0-9])|(0?[0-9]))/

