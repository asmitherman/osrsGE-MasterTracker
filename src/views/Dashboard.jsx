import React from "react";
import ReactDom from 'react-dom'
import Moment from 'moment'

// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Chart from '../components/Charts/charts.jsx';


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";


const items = require('../data/items.js');
const { grandExchange } = require('osrs-api');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dailyChartData: {},
      bigChartDataName: "data1",
      bigChartData: {},
      priceChartData: {},
      trendChartData: {},
    }

  }
  setBgChartDataName = name => {
    let values = [];
    let days = [];
    let newDays = [];
    let newValues = [];
    let graph = this.state.priceChartData;
    Object.keys(graph).forEach(function(key,index) {
      let day = new Date(key*1000);
      let standardDate = Moment(day/1000)
      days.push(standardDate.format('l'))
      values.push(graph[key])
    });
    if(name === 'data1') {
      for( let i = 30; i > 0 ; i--)
      {
        newDays.push(days[days.length - i])
      }
      for( let i = 30; i > 0 ; i--)
      {
        newValues.push(values[values.length - i])
      }
    } else if (name === 'data2') {
      for( let i = 90; i > 0 ; i--)
      {
        newDays.push(days[days.length - i])
      }
      for( let i = 90; i > 0 ; i--)
      {
        newValues.push(values[values.length - i])
      }
    } else if ( name === 'data3') {
      for( let i = 180; i > 0 ; i--)
      {
        newDays.push(days[days.length - i])
      }
      for( let i = 180; i > 0 ; i--)
      {
        newValues.push(values[values.length - i])
      }
    }

      this.setState({
        bigChartData:{
          labels: newDays,
          datasets:[
            {
              label:'Long Term Prices',
              data: newValues,
              fill: true,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 3,

            }
          ]

          }
      });
    };

  componentDidMount() {
    this.mounted = true;
    var item = [];
    var logs = [1511,1513,1515,1517,1519,1521];
    grandExchange.getItem(1515).then((response) => {
      let data = [];
      for (item in response) {
        data.push(response[item]);
      }
      this.setState({ data });
    });


    this.getDailyChartData();
  }

  getDailyChartData(){
    let dailyValues = [];
    let days = [];
    grandExchange.getGraph(1515).then((response) => {
      let item = [];

      let graph = [];
      for (item in response) {
        graph.push(response[item]);
      }
      this.setState({ priceChartData: graph[0]});
      Object.keys(graph[0]).forEach(function(key,index) {
        let day = new Date(key*1000);
        let standardDate = Moment(day/1000)
        days.push(standardDate.format('l'))
        dailyValues.push(graph[0][key])
      });
      let pastWeek = [];
      for( let i = 7; i > 0 ; i--)
      {
        pastWeek.push(days[days.length - i])
      }
      console.log(pastWeek)
      let pastWeekValues = [];
      for( let i = 7; i > 0 ; i--)
      {
        pastWeekValues.push(dailyValues[dailyValues.length - i])
      }

      this.setState({
        dailyChartData:{
          labels: pastWeek,
          datasets:[
            {
              label:'Daily Price',
              data: pastWeekValues,
              fill: true,
              borderColor: "#00d6b4",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#00d6b4",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#00d6b4",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
            }
          ]

          }
      });

   // console.log(Object.keys(graph[0]))
    });
    // Ajax calls here

      }


  // <li className="item" key={item.id}>{item.name}: {item.current.price}</li>;
  render() {

let itemBigChart = this.state.data.map(function(item) {
  return (
  <Col className="text-left" sm="6">
    <h5 className="card-category"> {item.name + " Long Term Price"}</h5>
    <CardTitle tag="h2">Daily Average</CardTitle>
  </Col>

  )

})
    let itemList = this.state.data.map(function(item) {
      return (
        <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.current.price}</td>
        <td>{item.current.trend}</td>
        <td className="text-center">{item['day30'].change}</td>
        </tr>
      )
    });

    let itemChart = this.state.data.map(function(item) {

      return (
        <CardHeader key = {item.id}>
        <h5 className="card-category">{item.name + " Weekly Prices"}</h5>
        <CardTitle tag="h3">
        <i className="tim-icons icon-money-coins text-success" /> {item.current.price}
        </CardTitle>
        </CardHeader>
      )
    });


    return (
      <div className="content">
      <Row>
      <Col lg="6" md="12">
      <Card>
      <CardHeader>
      <CardTitle tag="h4">Item List</CardTitle>
      </CardHeader>
      <CardBody>
      <Table className="tablesorter" responsive>
      <thead className="text-primary">
      <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Current Trend</th>
      <th className="text-center">30 Day Change</th>
      </tr>
      {itemList}
      </thead>
      <tbody>
      </tbody>
      </Table>
      </CardBody>
      </Card>
      </Col>
      <Col lg="6" md="12">
      <Card className="card-chart">
      {itemChart}
      <CardBody>
      <div className="chart-area" id="dailyChart">
      <Line
                    data={this.state.dailyChartData}
                    options={chartExample4.options}
                  />
      </div>
      </CardBody>
      </Card>
      </Col>
      </Row>
      <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                  {itemBigChart}
                      <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartDataName("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            1 Month
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartDataName("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            3 Months
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartDataName("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            6 Months
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={this.state.bigChartData}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

      </div>

    );
  }

  componentWillUnmount() {
    this.mounted = false;
  }




}

export default Dashboard;
