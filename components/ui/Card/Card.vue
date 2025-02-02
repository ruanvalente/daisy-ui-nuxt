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
  <div class="flex flex-wrap lg:flex-nowrap gap-6 group">
    <div
      class="card bg-base-100 w-full shadow-xl mt-8 p-4 transition-all duration-300 cursor-pointer group-hover:opacity-50 hover:opacity-100 hover:scale-110"
      v-for="card in CARD_OPTIONS"
      :key="card.title"
    >
      <div class="flex items-center justify-between">
        <span class="text-gray-300 text-base lg:text-2xl font-medium">
          {{ card.title }}
        </span>
        <span><i :class="card.icon"></i></span>
      </div>
      <div class="flex flex-col">
        <p class="py-2 font-bold text-base">{{ card.value }}</p>
        <p class="text-base">
          <strong class="text-green-400">
            {{ getContentValue(card.content).value }}
          </strong>
          &nbsp;{{ getContentValue(card.content).rest }}
        </p>
      </div>
    </div>
  </div>
</template>
