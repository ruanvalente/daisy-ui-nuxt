<template>
  <div
    class="flex flex-col md:flex-row items-center gap-4 my-4 w-full"
    :class="{
      'justify-between': showExtras,
      'justify-center': !showExtras,
    }"
  >
    <div v-if="showExtras" class="flex items-center gap-4">
      <select
        class="select select-bordered w-full max-w-xs"
        :value="itemsPerPage"
        @change="
          $emit(
            'update:itemsPerPage',
            Number(($event.target as HTMLSelectElement).value)
          )
        "
      >
        <option
          v-for="option in itemsPerPageOptions"
          :key="option"
          :value="option"
        >
          {{ option }} items per page
        </option>
      </select>

      <span class="text-sm text-gray-600">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} items
      </span>
    </div>

    <div
      class="flex justify-center space-x-1"
      :class="{ 'w-full md:w-auto': !showExtras }"
    >
      <button
          aria-label="Previous"
          class="px-4 rounded btn-md text-white"
        :class="{
          'bg-gray-300 dark:btn-outline': currentPage === 1,
          'bg-gray-950': currentPage !== 1,
        }"
        :disabled="currentPage === 1"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        Previous
      </button>

      <button
        v-for="page in displayedPages"
        :key="page"
        class="btn btn-md"
        :class="{
          'btn-active': page === currentPage,
          'dark:bg-gray-100 dark:text-gray-950': page === currentPage,
        }"
        @click="$emit('update:currentPage', page)"
      >
        {{ page }}
      </button>

      <button
          aria-label="Next"
        :class="{
          'bg-gray-300 dark:btn-outline': currentPage === totalPages,
          'bg-gray-950': currentPage !== totalPages,
        }"
        class="px-4 rounded btn-md text-white"
        :disabled="currentPage === totalPages"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  showExtras?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5,
  showExtras: false,
});

defineEmits<{
  "update:currentPage": [page: number];
  "update:itemsPerPage": [items: number];
}>();

const itemsPerPageOptions = [5, 10, 15, 20, 25, 30];

const startItem = computed(() => {
  if (!props.itemsPerPage || !props.totalItems) return 0;
  return (props.currentPage - 1) * props.itemsPerPage + 1;
});

const endItem = computed(() => {
  if (!props.itemsPerPage || !props.totalItems) return 0;
  const end = props.currentPage * props.itemsPerPage;
  return end > props.totalItems ? props.totalItems : end;
});

const displayedPages = computed(() => {
  const pages: number[] = [];
  const halfVisible = Math.floor(props.maxVisiblePages / 2);
  let start = Math.max(1, props.currentPage - halfVisible);
  const end = Math.min(props.totalPages, start + props.maxVisiblePages - 1);

  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>
