<template>
  <div id="app">
    {{ values }}
    <yo-schema-form
      size="small"
      ref="form"
      label-width="150px"
      label-position="right"
      v-model="values"
      :schema="schemas"
    >
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </yo-schema-form>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      values: {
        ar: "23",
        name: "张三",
        stacks: [{ id: 12, name: "PHP", state: "1" }],
      },
      schemas: {
        name: {
          type: "string",
          label: "姓名",
          rules: [{ required: true, message: "姓名不能为空" }],
          attrs: {
            placeholder: "请输入姓名，例：张三",
          },
        },
        gender: {
          type: "boolean",
          label: "性别",
          attrs: {
            trueLabel: "男",
            falseLabel: "女",
            trueValue: 1,
            falseValue: 0,
          },
        },
        age: {
          type: "number",
          label: "年龄",
          rules: [
            { required: true, message: "请输入年龄", type: "number" },
            { max: 35, message: "码农年龄不能超过35岁", type: "number" },
            { min: 18, message: "禁止雇佣祖国的花朵🌺", type: "number" },
          ],
        },
        select: {
          label: "下拉选框",
          type: "number",
          component: "YoSchemaSelect",
          attrs: {
            placeholder: "",
            options: [
              { label: "下拉选项1", value: 0 },
              { label: "下拉选项2", value: 1 },
            ],
          },
        },
        stacks: {
          type: "array",
          label: "技术栈",
          attrs: {
            arrayMaxItems: 2,
          },
          items: {
            type: "object",
            label: "技术栈",
            properties: {
              id: {
                type: "number",
                label: "ID",
              },
              name: {
                type: "string",
                label: "名称",
                rules: [{ required: true, message: "名称不能为空" }],
              },
            },
          },
        },
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid);
        console.log(JSON.stringify(this.values, null, 4));
      });
    },
  },
};
</script>

<style lang="scss"></style>
