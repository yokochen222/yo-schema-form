<template>
  <div class="yo-array">
    <template v-for="(wrapper, index) in value">
      <div class="yo-array-controll-btns" :key="index">
        <el-button
          @click="handleMove(-1, index)"
          size="mini"
          icon="el-icon-arrow-up"
          title="上移"
          v-if="index > 0"
        ></el-button>
        <el-button
          @click="handleMove(1, index)"
          size="mini"
          icon="el-icon-arrow-down"
          title="下移"
          v-if="index + 1 < value.length"
        ></el-button>
        <el-button
          @click="handleRemove(index)"
          size="mini"
          icon="el-icon-delete"
          type="danger"
          plain
          title="删除"
        ></el-button>
      </div>
      <!-- 对象数据项 需要遍历属性 -->
      <template v-if="schema && schema.items && schema.items.type === 'object'">
        <template v-for="(inner, key) in wrapper">
          <YoSchemaFormItem
            v-model="wrapper[key]"
            :vkey="`${vkey}.${index}.${key}`"
            :key="key + '-' + index"
            :schema="schema.items.properties[key]"
          ></YoSchemaFormItem>
        </template>
      </template>
      <!-- 基础数据项 -->
      <template v-else>
        <YoSchemaFormItem
          v-model="value[index]"
          :vkey="`${vkey}.${index}`"
          :key="`${schema.items.type}-${index}`"
          :schema="schema.items"
        ></YoSchemaFormItem>
      </template>
    </template>
    <div v-if="canAddItem" class="yo-array-plus-btn">
      <el-button @click="handleAdd" icon="el-icon-plus">追加</el-button>
    </div>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
export default {
  name: "YoSchemaArray",
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
    arrayMaxItems: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    formatValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    canAddItem() {
      let flag = true;
      if (this.arrayMaxItems == 0) {
        flag = true;
      } else if (this.value.length >= this.arrayMaxItems) {
        flag = false;
      }
      return flag;
    },
  },
  methods: {
    // 调整数组顺序
    handleMove(dir, index) {
      const copyArr = deepmerge.all([this.value]);
      if (dir > 0) {
        if (index + 1 < copyArr.length) {
          const tmp = copyArr[index + 1];
          copyArr[index + 1] = copyArr[index];
          copyArr[index] = tmp;
        }
      } else {
        if (index - 1 >= 0) {
          const tmp = copyArr[index - 1];
          copyArr[index - 1] = copyArr[index];
          copyArr[index] = tmp;
        }
      }
      this.formatValue = copyArr;
    },
    // 删除数组项
    handleRemove(idx) {
      this.value.splice(idx, 1);
    },
    // 新增数组项
    handleAdd() {
      // 判断是否
      if (!this.canAddItem) {
        return;
      }
      const defaultValue = BuildDefaultValue(this.schema.items);
      this.value.push(defaultValue);
      function BuildDefaultValue(schema) {
        if (schema.type === "string") {
          return "";
        }
        if (schema.type === "number") {
          return 0;
        }
        if (schema.type === "boolean") {
          return false;
        }
        if (schema.type === "object") {
          const obj = {};
          for (let key in schema.properties) {
            obj[key] = BuildDefaultValue(schema.properties[key]);
          }
          return obj;
        }
        if (schema.type === "array") {
          return [BuildDefaultValue(schema.items)];
        }
        console.error("Schema Invalid");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$color-border: #dcdfe6;
.yo-array {
  border-radius: 4px;
  padding: 6px;
  border: 1px solid $color-border;
  overflow: hidden;
  .yo-array-controll-btns {
    border-top: 1px dashed $color-border;
    border-bottom: 1px dashed $color-border;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-top: 3px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .yo-array-plus-btn {
    border-top: 1px solid $color-border;
    padding-top: 6px;
  }
}
</style>
