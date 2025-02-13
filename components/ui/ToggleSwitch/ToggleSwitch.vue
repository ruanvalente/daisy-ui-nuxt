<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

defineProps<{
	modelValue: boolean;
}>();

const emit = defineEmits<(e: "update:modelValue", value: boolean) => void>();

const onChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit("update:modelValue", target.checked);
};
</script>

<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="modelValue"
      @change="onChange"
    />
    <div
      class="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-gray-950 peer-focus:ring-2 peer-focus:ring-gray-200 transition-all"
    ></div>
    <div
      class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-all"
    ></div>
  </label>
</template>

<style scoped></style>
