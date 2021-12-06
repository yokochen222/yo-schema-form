<template>
  <el-form-item
    v-bind="schema"
    :prop="vkey"
    :label="schema.label"
    :rules="schema.rules"
  >
    <component
      v-bind="mergeAttrs"
      v-model="formatValue"
      :is="componentFormat"
      :vkey="vkey"
      :schema="schema"
    ></component>
  </el-form-item>
</template>

<script>
import { T } from "../../utils/index";
export default {
  name: "YoSchemaFormItem",
  props: {
    value: {
      required: true,
    },
    vkey: {
      type: String,
      required: true,
    },
    schema: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // 值转换，强制子组件修改父级组件值
    // 即 可以使用 this.formatValue = xxx
    formatValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    // 合并 Attrs 便于自定义组件attrs设置
    mergeAttrs() {
      if (this.schema.attrs && T(this.schema.attrs) === "object") {
        return {
          ...this.$attrs,
          ...this.schema.attrs,
        };
      }
      return this.$attrs;
    },
    // 格式化组件名称
    // 1、判断schema中是否指定的组件，指定了则直接返回组件名称
    // 2、schema未指定组件名称，则根据schema中指定的type 匹配内置组件
    // 3、schema未指定type 则判断 当前value值类型 指定 匹配组件
    // 4、如未匹配到组件 则 渲染 input 默认组件
    componentFormat() {
      if (this.schema && this.schema.component) {
        return this.schema.component;
      }
      let MODELTYPE = "";
      if (this.schema && this.schema.type) {
        MODELTYPE = this.schema.type;
      } else {
        MODELTYPE = T(this.formatValue);
      }
      switch (MODELTYPE) {
        case "number":
          return "el-input-number";
        case "array":
          return "yo-schema-array";
        case "boolean":
          return "yo-schema-boolean";
        case "object":
          return "yo-schema-object";
      }
      return "el-input";
    },
  },
};
</script>
