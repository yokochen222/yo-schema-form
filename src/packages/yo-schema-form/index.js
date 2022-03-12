import YoSchemaForm from "./src/yo-schema-form.vue";
import YoSchemaFormItem from "./src/yo-schema-form-item.vue";
import YoSchemaObject from "./src/yo-schema-object.vue";
import YoSchemaArray from "./src/yo-schema-array.vue";
import YoSchemaBoolean from "./src/yo-schema-boolean.vue";
import YoSchemaSelect from "./src/yo-schema-select.vue";

YoSchemaForm.install = (Vue) => {
  Vue.component(YoSchemaForm.name, YoSchemaForm);
  Vue.component(YoSchemaFormItem.name, YoSchemaFormItem);
  Vue.component(YoSchemaBoolean.name, YoSchemaBoolean);
  Vue.component(YoSchemaArray.name, YoSchemaArray);
  Vue.component(YoSchemaObject.name, YoSchemaObject);
  Vue.component(YoSchemaSelect.name, YoSchemaSelect);
  const keys = Object.keys(Vue.options.components);
  Vue.prototype.$YoCanUseComponents = keys;
};

export default YoSchemaForm;
