<script setup lang="ts">
import type {
  ChartData,
  LineChartOptions,
} from "~/types/ui/components/Chart/chart.type";

interface Props {
  series: ChartData[];
  options: LineChartOptions;
}

const props = withDefaults(defineProps<Props>(), {
  series: () => [],
  options: () => ({
    categories: [],
    enableZoom: false,
    strokeCurve: "straight",
    gridOpacity: 0.5,
  }),
});

const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: props.options.enableZoom,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: props.options.strokeCurve,
  },
  title: {
    text: props.options.title,
    align: "left",
  },
  colors: props.options.colors,
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: props.options.gridOpacity,
    },
  },
  xaxis: {
    categories: props.options.categories,
  },
}));
</script>

<template>
  <apexchart
      type="line"
      :options="chartOptions"
      :series="series"
  ></apexchart>
</template>