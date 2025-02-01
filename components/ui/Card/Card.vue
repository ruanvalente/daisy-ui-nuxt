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
  <div class="flex flex-wrap lg:flex-nowrap gap-6">
    <div
      class="card bg-base-100 w-full shadow-xl mt-8 p-4 hover:animate-pulse hover:cursor-pointer hover:outline-2 hover:outline-offset-2 hover:outline-solid transition-all duration-1000"
      v-for="card in CARD_OPTIONS"
      :key="card.title"
    >
      <div class="flex items-center justify-between">
        <span class="text-gray-300 text-base lg:text-2xl font-medium">{{
          card.title
        }}</span>
        <span><i :class="card.icon"></i></span>
      </div>
      <div class="flex flex-col">
        <p class="py-2 font-bold text-base">{{ card.value }}</p>
        <p class="text-base">
          <strong class="text-green-400">{{
            getContentValue(card.content).value
          }}</strong
          >&nbsp;{{ getContentValue(card.content).rest }}
        </p>
      </div>
    </div>
  </div>
</template>
