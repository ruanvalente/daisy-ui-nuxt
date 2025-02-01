<script setup lang="ts">
import { CARD_OPTIONS } from "~/constants/Card/Card";

const getContentValue = (content: string) => {
  const splitContent = content.split(" ");
  const value = splitContent.shift();
  const rest = splitContent.join(" ");
  return { value, rest };
};
</script>

<template>
  <div class="flex gap-6">
    <div
      class="card card-ui bg-base-100 w-96 shadow-xl mt-8 p-4"
      v-for="card in CARD_OPTIONS"
      :key="card.title"
    >
      <div class="flex items-center justify-between">
        <span class="flex text-gray-300 text-2xl font-medium">{{
          card.title
        }}</span>
        <span class="flex justify-end"><i :class="card.icon"></i></span>
      </div>
      <div class="flex flex-col">
        <p class="py-2 font-bold">{{ card.value }}</p>
        <p>
          <strong class="text-green-400">{{
            getContentValue(card.content).value
          }}</strong
          >&nbsp;{{ getContentValue(card.content).rest }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-ui {
  width: 100%;
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
