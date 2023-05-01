import { h } from "vue";
import type { IconProps, IconSet } from "vuetify";
import Android from "./Android.vue";
import React from "./React.vue";
import Spring from "./Spring.vue";

const customSvgNameToComponent: any = {
  Android,
  React,
  Spring,
};

const customSVGs: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export { customSVGs /* aliases */ };
