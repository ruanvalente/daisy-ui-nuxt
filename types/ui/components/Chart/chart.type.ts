export interface ChartData {
  name: string;
  data: number[];
}

interface BaseChartOptions {
  categories: (string | number)[];
  title?: string;
  colors?: string[];
  height?: number;
  width?: string | number;
  fontFamily?: string;
  toolbar?: {
    show?: boolean;
    tools?: {
      download?: boolean;
      selection?: boolean;
      zoom?: boolean;
      zoomin?: boolean;
      zoomout?: boolean;
      pan?: boolean;
      reset?: boolean;
    };
  };
}

export interface LineChartOptions extends BaseChartOptions {
  enableZoom?: boolean;
  strokeCurve?: "smooth" | "straight";
  gridOpacity?: number;
  stroke?: {
    width?: number;
    dashArray?: number;
  };
}

export interface BarChartOptions extends BaseChartOptions {
  horizontal?: boolean;
  columnWidth?: string;
  barHeight?: string;
  distributed?: boolean;
  dataLabels?: {
    position?: "top" | "center" | "bottom";
  };
}
