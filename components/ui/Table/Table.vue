<template>
  <div class="w-full shadow-md sm:rounded-lg">
    <!-- Versão Desktop -->
    <div class="hidden md:block overflow-x-auto dark:text-gray-950">
      <table class="table w-full text-sm text-left rtl:text-right dark:border">
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              class="px-6 py-3 bg-gray-50"
            >
              {{ header.label }}
            </th>
            <th v-if="$slots.actions" class="px-6 py-3 bg-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
            class="hover:cursor-pointer hover:bg-gray-100 transition-all"
            :class="{ 'bg-gray-100': index % 2 === 0 }"
          >
            <td
              v-for="header in headers"
              :key="header.key"
              class="px-6 py-4 whitespace-nowrap"
            >
              <slot :name="header.key" :item="item">
                <div v-if="header.key === 'avatar'" class="avatar">
                  <div class="w-12 rounded-full">
                    <img :src="item[header.key]" :alt="item.name" />
                  </div>
                </div>
                <div
                  v-else-if="header.key === 'role'"
                  class="badge bg-gray-950 text-white text-base px-4"
                >
                  {{ item[header.key] }}
                </div>
                <template v-else>
                  {{ item[header.key] }}
                </template>
              </slot>
            </td>
            <td v-if="$slots.actions">
              <slot name="actions" :item="item"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Versão Mobile/Tablet -->
    <div class="block md:hidden">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white border-b last:border-b-0 p-4 hover:bg-gray-50 transition-all"
      >
        <div
          v-for="header in headers"
          :key="header.key"
          class="flex justify-between py-2 items-center"
        >
          <span class="font-medium text-gray-600">{{ header.label }}:</span>
          <div class="text-gray-900">
            <slot :name="header.key" :item="item">
              <div v-if="header.key === 'avatar'" class="avatar">
                <div class="w-12 rounded-full">
                  <img :src="item[header.key]" :alt="item.name" />
                </div>
              </div>
              <div
                v-else-if="header.key === 'role'"
                class="badge bg-gray-950 text-white text-base px-4"
              >
                {{ item[header.key] }}
              </div>
              <template v-else>
                {{ item[header.key] }}
              </template>
            </slot>
          </div>
        </div>
        <div v-if="$slots.actions" class="mt-4 flex justify-end border-t pt-4">
          <slot name="actions" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TableHeader {
  key: string;
  label: string;
}

interface Props {
  headers: TableHeader[];
  items: any[];
}

defineProps<Props>();
</script>

<style lang="css" scoped>
.table-row-even {
  background-color: #f9fafb;
}
</style>
