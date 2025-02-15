<script setup lang="ts">
import { computed } from "vue";
import { defineProps } from "vue";

export type TypographyTagType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

const props = withDefaults(
  defineProps<{
    as: TypographyTagType;
    class: string;
  }>(),
  {
    as: "p",
    class: "",
  },
);
const computedClass = computed(() => {
  return props.class;
});
</script>

<template>
  <component :is="as" :class="computedClass">
    <slot />
  </component>
</template>
