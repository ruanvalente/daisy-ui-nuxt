<script setup lang="ts">
import { useUser } from "@clerk/nuxt/composables";
import LazyActiveRecents from "~/components/ui/ActiveRecents/ActiveRecents.vue";
import Card from "~/components/ui/Card/Card.vue";
import LazyBarChart from "~/components/ui/Chart/Bar/Bar.vue";
import LazyChartFallback from "~/components/ui/Chart/Fallback/Fallback.vue";
import LazyLineChart from "~/components/ui/Chart/Line/Line.vue";
import LazyTypography from "~/components/ui/Typography/Typography.vue";

const { user } = useUser();
</script>

<template>
  <div>
    <LazyTypography as="h2" class="mt-4 text-2xl lg:text-4xl dark:text-gray-950"
    >Welcome, {{ user?.fullName ?? "Guest" }} !</LazyTypography
    >
    <p class="mt-4 dark:text-gray-950">This is the dashboard page</p>
    <Card />
    <div>
      <LazyTypography as="h2" class="mt-10 text-2xl lg:text-4xl dark:text-gray-950"
      >Sales</LazyTypography>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <ClientOnly>
        <template #default>
          <LazyLineChart
              :series="[{
              name: 'Sales',
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
            }]"
              :options="{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              title: 'Product Trends by Month',
              colors: ['#0f172a'],
              strokeCurve: 'smooth',
            }"
          
          />
          <LazyBarChart
              :series="[{
              name: 'Sales',
              data: [30, 40, 35, 50, 49],
            }]"
              :options="{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              title: 'Product Trends by Month',
              colors: ['#0f172a'],
            }"
          />
        </template>
        <template #fallback>
          <LazyChartFallback />
        </template>
      </ClientOnly>
    </div>
    <div>
      <LazyTypography as="h2" class="mt-10 text-2xl lg:text-4xl dark:text-gray-950">
        Recent Activities
      </LazyTypography>
      <div class="mt-4">
        <LazyActiveRecents />
      </div>
    </div>
 
  </div>
</template>
