<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChartFallback",
});
</script>

<template>
  <div class="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" style="height: 400px">
    <div class="flex h-full items-center justify-center">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  </div>
  <div class="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" style="height: 400px">
    <div class="flex h-full items-center justify-center">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  </div>
</template>

<style scoped>

</style>