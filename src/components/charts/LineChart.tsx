import React from "react";
import ReactApexChart from "react-apexcharts";

type ChartProps = {
  // using `interface` is also ok
  [x: string]: any;
};

function LineChart(props: ChartProps) {
  return (
    <ReactApexChart
      options={props.chartOptions}
      series={props.chartData}
      type="line"
      width="100%"
      height="100%"
    />
  );
}

export default LineChart;
