<script setup lang="ts">
import type {
  BarChartOptions,
  ChartData,
} from "~/types/ui/components/Chart/chart.type";
interface Props {
  series: ChartData[];
  options: BarChartOptions;
}

const props = withDefaults(defineProps<Props>(), {
  series: () => [],
  options: () => ({
    categories: [],
  }),
});

const chartOptions = computed(() => ({
  chart: {
    id: "bar-chart",
    type: props.options.horizontal ? "bar" : "column",
  },
  title: {
    text: props.options.title,
    align: "center",
  },
  colors: props.options.colors,
  xaxis: {
    categories: props.options.categories,
  },
}));
</script>

<template>
  <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<style lang="css" scoped></style>