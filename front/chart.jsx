import { useState } from "react";
import Chart from "react-apexcharts";



const Charts = (props) => {


    let chart = {
        options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "series-1",
          data: props.data
        }]
      }
      console.log()
    return <>
    
    <Chart
        options={chart.options}
        series={chart.series}
        type="line"
        width="500"
    />

    </>
}

export default Charts