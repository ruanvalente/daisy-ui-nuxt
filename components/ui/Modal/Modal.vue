<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "w-11/12 max-w-2xl",
  },
  variant: {
    type: String,
    default: "default",
    validator(value: string) {
      return ["default", "danger"].includes(value);
    },
  },
  titleSize: {
    type: String,
    default: "text-2xl",
  },
  centerActions: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const onClose = () => {
  emit("close");
};
</script>

<template>
  <dialog :id="id" class="modal" :class="{ 'modal-open': isOpen }">
    <div :class="['modal-box', width]">
      <h3
        :class="[
          'font-bold mb-4 text-center',
          { 'text-error': variant === 'text-red-500' },
          titleSize,
        ]"
      >
        {{ title }}
      </h3>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div :class="['modal-action', { 'justify-center gap-4': centerActions }]">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="modal-backdrop bg-black/50" @click="onClose">
      <button class="cursor-default">close</button>
    </div>
  </dialog>
</template>
