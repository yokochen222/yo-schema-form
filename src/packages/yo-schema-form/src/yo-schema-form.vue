<template>
  <el-form v-loading="!valueOk" ref="form" :model="value" v-bind="$attrs">
    <template v-if="valueOk">
      <template v-for="(obj, key) in value">
        <YoSchemaFormItem
          v-model="value[key]"
          :model="value[key]"
          :key="key"
          :vkey="key"
          :prop="key"
          :schema="schema[key]"
        />
      </template>
    </template>
    <slot></slot>
  </el-form>
</template>

<script>
import ValueTransformWithSchema from "../../utils/ValueTransformWithSchema";
import { T } from "../../utils/index";
export default {
  name: "YoSchemaForm",
  props: {
    value: {
      required: true,
    },
    schema: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  provide: {
    yoschemaform() {
      return this;
    },
  },
  watch: {
    schema: {
      deep: true,
      immediate: true,
      handler() {
        // 监听schema变化，重新校验值
        this._valueTransformWithSchema();
      },
    },
  },
  data() {
    return {
      // 避免值还未修正 就开始渲染，导致获取schema不存在的属性报错问题
      valueOk: false,
    };
  },
  methods: {
    // 将传入的值根据schema进行转换与值校验
    _valueTransformWithSchema() {
      this.valueOk = false;
      if (T(this.value) !== "object") {
        console.error("value or v-model prop should be an object");
        return;
      }
      if (T(this.schema) !== "object") {
        console.error("schema prop should be an object");
        return;
      }
      const datas = ValueTransformWithSchema(this.value, this.schema);
      this.$emit("input", datas);
      // 避免值还未修正 就开始渲染，导致获取schema不存在的属性报错问题
      this.$nextTick(() => {
        this.valueOk = true;
      });
    },
    // 表单验证
    validate(cb) {
      if (!cb && cb.constructor !== Function) {
        console.log("Invalid Callback Function");
        return;
      }
      this.$refs.form.validate((valid) => {
        cb(valid);
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
