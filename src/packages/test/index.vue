<template>
  <el-select v-model="valueComputed" class="yo-w100pc">
    <el-option label="测试" value="1"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "YoSelect",
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
