<script setup lang="ts">
import { defineProps, defineEmits, useAttrs } from "vue";

const props = defineProps<{
  modelValue: string;
  label?: string;
  options: { value: string; text: string }[];
  placeholder?: string;
  selectClass?: string;
  required?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const attrs = useAttrs();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label w-full my-2">
      <span class="label-text dark:text-gray-950">{{ label }}</span>
    </label>
    <select
      :value="modelValue"
      @change="onChange"
      :class="['select select-bordered w-full dark:bg-gray-100', selectClass]"
      :required="required"
      v-bind="attrs"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
