// import deepmerge from "deepmerge";
import { T } from "./index";

const NotMatchedTypeValue = "<yo-schema-empty />";

// 根据模板值类型修正数据
// 1、判断传入的值类型是否与模板类型一致
// 2、如一致则直接赋值，否则根据模板值类型赋默认值
const RecursionValueBinder = (value, schema) => {
  const Tvalue = T(value);

  if (schema.type === "boolean") {
    if (Tvalue === schema.type) {
      return value;
    }
    return false;
  }

  if (schema.type === "string") {
    if (Tvalue === schema.type) {
      return value;
    }
    return "";
  }

  if (schema.type === "number") {
    if (Tvalue === schema.type) {
      return value;
    }
    return 0;
  }

  if (schema.type === "array") {
    if (Tvalue === schema.type) {
      const data = [];
      for (let i = 0; i < value.length; i++) {
        const val = value[i];
        const res = RecursionValueBinder(val, schema.items);
        if (res !== NotMatchedTypeValue) {
          data.push(res);
        }
      }
      return data;
    }
    return [];
  }

  if (schema.type === "object") {
    const inner = {};
    for (let key in schema.properties) {
      // 判断values是否存在值
      if (value && value[key]) {
        // value [key]可能出现 undefined 现象，匹配不到 则会返回默认值
        inner[key] = RecursionValueBinder(value[key], schema.properties[key]);
      } else {
        inner[key] = RecursionValueBinder("", schema.properties[key]);
      }
    }
    if (Object.keys(inner).length) {
      return inner;
    }

    // 如返回结果没有 匹配到 number string boolean object array
    // 则直接返回 空(例如 Symbol、Null、Undefined, 这些数据类型的值 对于模板表单来讲并没有意义，用户也无法直接输入这些类型的值)
    // 同时 这里避免了 return {} 的情况
    return NotMatchedTypeValue;
  }

  return NotMatchedTypeValue;
};

/**
 * @brief 模板与值数据修正及校验
 * @param models {object}
 * @param schemas {object}
 */
export default function ValueTransformWithSchema(models, schemas) {
  // const models = deepmerge.all([values]);
  // const schemas = deepmerge.all([sches]);
  // const models = values
  const data = {};
  for (let key in schemas) {
    const model = models[key];
    const schema = schemas[key];
    const result = RecursionValueBinder(model, schema);
    if (result !== NotMatchedTypeValue) {
      data[key] = result;
    }
  }
  return data;
}
