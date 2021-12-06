### JSON Schema Form

> 基于` ElementUI` 以  `Schema ` 优先的`JSON`表单生成器

- 无层级限制，支持无限级`JSON`对象编辑，但不建议层级太深 不利于维护

- 多维数组嵌套支持，可生成多维数组

- 可自定义渲染组件，使用灵活（例：`type:'array', component: 'your-custom-array-component'`）

- 支持数据验证及数据输入规则设置（同`el-form` `rules`规则一致）

- 数据自动修正（如`v-model` 值与`schema`限定类型不一致，则自动根据`schema`声明类型进行修复）

[![oD2l38.md.png](https://s4.ax1x.com/2021/12/05/oD2l38.md.png)](https://imgtu.com/i/oD2l38)

### 一、安装（Install）

```bash
npm install yo-schema-form 
#or
yarn add yo-schema-form
```

### 二、使用（use）

- 全局引入 main.js

```javascript
import Vue from 'vue'
import YoSchemaForm from 'yo-schema-form'
import 'yo-schema-form/lib/yo-schema-form.css'
Vue.use(YoSchemaForm)
```

- 组件使用

  ```html
  <template>
    <yo-schema-form
        label-width="140px"
        v-model="model"
        :schema="schema" 
    ></yo-schema-form>
  </template>
  <script>
  export default {
    data() {
      return {
        model: {},
        schema: {
          name: {
            label: "姓名",
            type: "string",
            rules: [{ required: true, message: '请输入姓名。' }],
            attrs: {
              placeholder: "请输入姓名，如：张三"
            }
          },
          age: {
            label: "年龄",
  					type: "number",
            labelWidth: "180px",
            rules:[
              { required: true, message: '请填写年龄' }, 
              { min: 18, message: '禁止雇佣祖国的🌺～', type: 'number' },
              { max: 35, message: '码农年龄不能超过35岁', type: 'number' },
           	]
          },
          hobby: {
            label: "爱好",
            type: "array",
            items: {
              type: "object",
              properties: {
  							id: {
                  label: "ID",
                  type: "number"
                },
                name: {
                  label: "名称",
                  type: "string"
                }
              }
            }
          }
        }
      }
    }
  }
  </script>
  ```

  

### 三、Schema格式

#### 1、Schema属性组成

| 属性名称   | 必填 | 类型               | 描述                                                         |
| ---------- | ---- | ------------------ | ------------------------------------------------------------ |
| type      | 是 |`String`|五种数据类型 枚举值：`string`、`number`、`boolean`、`object`、`array`|
| component | 否  | `String`           | `Input` `InputNumber`等UI组件 或 自定义组件名称、内置组件 `array`  `object` `boolean` |
| label      | 否   | `String`           | `form-item` 表单`label`提示文字                              |
| attrs      | 否   | `Object`           | 组件属性 `props` 例： `attrs:{ placeholder: '请输入xxx' } ` |
| rules      | 否   | `Array` | 字段验证 例 `rules:[{ requird: true, message: '请上传' }]` |
| items      | 否   | `Object`           | 当 `type` 为 `array`时必须 |
| properties | 否   | `Object`           | 当 `type` 为 `object` 时必须 |
| ... | 否 | any | 额外的属性将与` el-form-item` v-bind="..."形式绑定 |



#### 2、基础`Schema`结构示例

```javascript
字段名: {
  type: 'string', // number boolean array object
  label: 'form表单提示',
  items: {},
  properties: {},
  attrs: { // '组件props/原生表单控件属性'
    placeholder: '请输入字段名',
    maxlength: 12,
    accept: '.png',
    max: 100,
    min: 10,
    type: 'textarea',
    valueType: String, // Array
    valueSeparator: ',' //// String下默认分隔符
    ... //可扩展
  },
  rules: [ // 数据格式限定规则
    { requird: true, message: '请上传' } // 限定规则1
  ],
  ... //可扩展
}

```

#### 3、`Schema`示例

##### 3-1、schema

```javascript
{
  teacher: {
    type: "string",
    component: 'el-input',
    label: "班主任",
    rules: [ {required: true, message: '班主任姓名不能为空'} ],
    attrs: {
      placeholder: "请输入班主任姓名"
    }
  },
  students:{
    type: "array",
    label: "班级学生",
    items: {
      type: "object",
      properties: {
        id: {
          type: "number",
          label: "学号"
        },
        name: {
          type: "string",
          label: "姓名"
        },
        avatar: {
          type: "string",
          label: "寸照",
          component: 'your-upload-component' // 注意实现这个上传组件，并注册 main.js 中注册
        }
      }
    }
  } 
}
```

##### 3-2、model 输出

```javascript
{
  teacher: "张三",
  students:[
    {
      id: 9001,
      name: "李四",
      avatar: "https://storage.tec.com/xxx/xxs/9001-a.jpg"
    }
  ]
}
```



### 四、YoSchemaForm 组件

##### 1、props 同 el-form

> https://element.eleme.cn/#/zh-CN/component/form

##### 2、slot

default slot 默认插槽将追加在表单最底部

##### 3、表单验证

```html
<template>
  <yo-schema-form ref="form" :schema="schema" v-model="model"></yo-schema-form>
</template>
<script>
  export default {
    ...
    methods:{
      submit() {
        this.$refs.form.validate((valid) => {
          console.log(valid)
        })
      }
    }
  }
</script>
```

##### 4、klschemaform provide

```js
yoschemaform -> yo-schema-form 组件实例
provide: {
 yoschemaform() {
   return this
 }
}

自定义组件注入
inject:['yoschemaform']
```

