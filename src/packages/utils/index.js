/**
 * js数据类型判断
 * @param value 需要判定类型的值
 * @return string 'object'、'string'、 'number'、 'boolean'、 'array'、 'symbol'、 'null'、 'undefind'
 * **/
export function T(value) {
  const t = Object.prototype.toString.call(value);
  return t.slice(8, t.length - 1).toLowerCase();
}
