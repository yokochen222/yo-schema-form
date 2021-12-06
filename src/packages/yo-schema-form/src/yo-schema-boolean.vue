<template>
  <el-radio-group v-model="valueFormat">
    <el-radio :label="trueValue">{{ trueLabel ? trueLabel : "真" }}</el-radio>
    <el-radio :label="falseValue">{{
      falseLabel ? falseLabel : "假"
    }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: "YoSchemaBoolean",
  props: {
    value: [Boolean, String, Number],
    trueLabel: {
      type: String,
      default: "真",
    },
    falseLabel: {
      type: String,
      default: "假",
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
  },
  computed: {
    valueFormat: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
