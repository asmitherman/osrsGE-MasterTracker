import React from "react";
import ReactDom from 'react-dom'
import Moment from 'moment'
// import TableData from '../components/ItemSearch/Search.jsx';

// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Chart from '../components/Charts/charts.jsx';
import Items from '../data/items';
import AllItems from '../data/allitems';
import * as JsSearch from 'js-search';

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
  Form,
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

//generating Search settings
var search = new JsSearch.Search('name');
search.addIndex('name');
search.addIndex('id');
//index search keys
let itemArray = [];
    Object.keys(AllItems[0]).forEach(function(key,index) {
  itemArray.push(AllItems[0][key]);
});

search.addDocuments(itemArray);
//End search config

const items = require('../data/items.js');
const { grandExchange } = require('osrs-api');

class ItemsView extends React.Component {
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

  componentDidMount() {
    this.mounted = true;
  }

//actively refresh search from search bar
  refineSearch() {
    let name = document.getElementById('item').value;
    this.setState({data:search.search(name)});
  }

//Week daily chart setup, not used currently, looking to port to item.jsx
  generateCharts(itemId,itemName,itemCurPrice){
    this.getDailyChartData(itemId, itemName, itemCurPrice)
  }
//the meat of daily chart setup
  getDailyChartData(itemId, itemName, itemCurPrice){
    let dailyValues = [];
    let days = [];
    grandExchange.getGraph(itemId).then((response) => {
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
      ReactDom.render(

        <Card className="card-chart">
            <CardHeader key = {itemId}>
            <h5 className="card-category">{itemName + " Weekly Prices"}</h5>
            <CardTitle tag="h3">
            <i className="tim-icons icon-money-coins text-success" /> {itemCurPrice}
            </CardTitle>
            </CardHeader>
        <CardBody>
        <div className="chart-area" id="dailyChart">
        <Line
        data={this.state.dailyChartData}
        options={chartExample4.options}
        />
        </div>
        </CardBody>
        </Card>

        , document.getElementById('chartArea'));
    this.setBgChartDataName('data1',itemName);

    });
    this.setState({bigChartDataName: "data1"});
  }
  //End weekly daily chart price setup

  //creates link to item detail page using itemid in props
  routeToItemPage(itemid) {
    this.props.history.push('/admin/item/' + itemid)
  }
  //end link to item detail Item Detail View


  //major logic for render page
  render() {
    let itemLen = 10;
    let itemList = this.state.data.map(function(item) {
        if(itemLen) {
          itemLen--;
          return (
            <tr className="text-success" key={item.id} onClick={() => this.routeToItemPage(item.id)}>
            <td>{item.name}</td>
            <td>{item.buy_average}</td>
            </tr>
          )
        }
      }, this);

    let itemChart = this.state.data.map(function(item) {

    return (
      <Col lg="6" md="12">
      <Card className="card-chart">
          <CardHeader key = {item.id}>
          <h5 className="card-category">{item.name + " Weekly Prices"}</h5>
          <CardTitle tag="h3">
          <i className="tim-icons icon-money-coins text-success" /> {item.buy_average}
          </CardTitle>
          </CardHeader>
      <CardBody>
      <div className="chart-area" id="dailyChart">

      </div>
      </CardBody>
      </Card>
      </Col>

    )
    });

    return (
      <div className="content">
      <Row>
      <Col lg="6" md="12">
      <Card>
      <CardHeader>
      <CardTitle tag="h4"> <h2>Item Search </h2></CardTitle>
      <Form className="form">
      <Col>
      <FormGroup>
      <Input
      type="text"
      name="item search"
      id="item"
      placeholder="Item Name"
      onChange={() => this.refineSearch()}
      />
      </FormGroup>
      </Col>
      </Form>
      </CardHeader>
      <CardBody>
      <Table className="tablesorter" responsive>
      <thead className="text-primary">
      <tr>
      <th>Name</th>
      <th>Current Buy Price</th>
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
      <div id="chartArea">
      </div>
      </Col>

      </Row>
      <Row>
      <Col xs="12">
      <div id="bigChartArea">
      </div>
      </Col>
      </Row>
      </div>
    );
  }

  componentWillUnmount() {
    this.mounted = false;
  }
}

export default ItemsView;
