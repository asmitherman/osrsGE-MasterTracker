import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.dailyChartData
    }
  }

  // static defaultProps = {
    // displayTitle:true,
    // displayLegend: true,
    // legendPosition:'right',
    // location:'City'
  // }

  render(){
    return (


        <Line
          data={this.state.ChartData}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false
            },

            tooltips: {
              backgroundColor: "#f5f5f5",
              titleFontColor: "#333",
              bodyFontColor: "#666",
              bodySpacing: 4,
              xPadding: 12,
              mode: "nearest",
              intersect: 0,
              position: "nearest"
            },
            responsive: true,
            scales: {
              yAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    suggestedMin: 50,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9e9e9e"
                  }
                }
              ],

              xAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(0,242,195,0.1)",
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e"
                  }
                }
              ]
            }



          }}
        />


    )
  }
}

export default Chart;
