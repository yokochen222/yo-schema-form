<template>
  <el-select v-model="valueComputed" class="yo-w100pc">
    <el-option
      v-for="(option, index) in options"
      :key="index"
      :label="option[labelKey]"
      :value="option[valueKey]"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "YoSchemaSelect",
  props: {
    value: {
      default: "",
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    labelKey: {
      type: String,
      default: "label",
    },
    valueKey: {
      type: String,
      default: "value",
    },
  },
  computed: {
    valueComputed: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.yo-w100pc {
  width: 100%;
}
</style>
