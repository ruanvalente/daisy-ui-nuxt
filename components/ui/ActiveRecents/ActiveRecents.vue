<script lang="ts" setup>
import LazyTypography from "~/components/ui/Typography/Typography.vue";
import type { RecentActivityTypeProps } from "~/types/ui/components/RecentActivity/recent-activity.type";
import { getRelativeTime } from "~/utils/get-relativetime.util";

const recentActivities: RecentActivityTypeProps[] = [
  {
    icon: "pi pi-shopping-cart",
    title: "New order received",
    subtitle: "Order #123456",
    date: "2025-02-20",
  },
  {
    icon: "pi pi-user",
    title: "New user registered",
    subtitle: "User ID #789",
    date: "2025-02-18",
  },
  {
    icon: "pi pi-chart-line",
    title: "Sales report generated",
    subtitle: "Monthly overview",
    date: "2025-02-27",
  },
  {
    icon: "pi pi-credit-card",
    title: "Payment processed",
    subtitle: "Transaction #456789",
    date: "2025-02-13",
  },
  {
    icon: "pi pi-clock",
    title: "System update",
    subtitle: "Version 2.0.1",
    date: "2025-02-27",
  },
];
</script>

<template>
  <div class="w-full bg-white dark:bg-slate-900 rounded-lg shadow p-6">
    <div class="flex flex-col gap-2">
      <LazyTypography as="h2" class="text-xl font-semibold dark:text-white">
        Recent Activities
      </LazyTypography>
      <LazyTypography as="p" class="text-sm text-gray-500 dark:text-gray-400">
        Latest system operations
      </LazyTypography>
    </div>
    
    <div class="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
    
    <div class="space-y-4 ">
      <div
          v-for="(activity, index) in recentActivities"
          :key="index"
          class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg "
      >
        <div class="flex items-center gap-4 transition-all duration-300 hover:scale-110 hover:cursor-pointer">
          <div
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <div :class="[activity.icon, 'w-5 h-5 text-gray-600 dark:text-gray-300']"></div>
          </div>
          <div>
            <h3 class="text-sm font-medium dark:text-white">
              {{ activity.title }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ activity.subtitle }}
            </p>
          </div>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400"> {{ getRelativeTime(activity.date) }}</span>
      </div>
    </div>
    
    <div class="mt-6">
      <button
          class="w-full py-4 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
      >
        View all activities
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>