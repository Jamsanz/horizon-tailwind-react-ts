import React from "react";
import Chart from "react-apexcharts";

type ChartProps = {
  // using `interface` is also ok
  [x: string]: any;
};
type ChartState = {
  chartData: any[];
  chartOptions: any;
};

function ColumnChart(props: ChartProps) {

  return (
    <Chart
      options={props.chartOptions}
      series={props.chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  );

}


export default ColumnChart;
