<template>
  <div>
    <template v-for="(obj, key) in value">
      <YoSchemaFormItem
        v-model="valueFormat[key]"
        :key="key"
        :vkey="`${vkey}.${key}`"
        :schema="schema.properties[key]"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "YoSchemaObject",
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
