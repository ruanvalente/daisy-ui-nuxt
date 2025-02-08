<script setup lang="ts">
import { defineProps, defineEmits, useAttrs } from "vue";

const props = defineProps<{
  modelValue: string;
  label?: string;
  type?: string;
  inputClass?: string;
  required?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const attrs = useAttrs();
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label w-full my-2">
      <span class="label-text dark:text-gray-950">{{ label }}</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="['input input-bordered w-full dark:bg-gray-100', inputClass]"
      :required="required"
      v-bind="attrs"
    />
  </div>
</template>

<style scoped></style>
