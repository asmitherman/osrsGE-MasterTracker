import React from "react";
import ReactDom from 'react-dom'

// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

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
    }
  }
  componentDidMount() {
    this.mounted = true;
    var item = [];
    var logs = [1511,1513,1515,1517,1519,1521];
      // grandExchange.getItem(1511).then((response) => {
      //   let data = [];
      //   for (item in response) {
      //     data.push(response[item]);
      //   }
      //   // var newData = this.state.data.push(data);
      //   // this.setState({ data: newData })
      //   this.setState({data});
      // });
      grandExchange.getItem(1513).then((response) => {
        let data = [];
        for (item in response) {
          data.push(response[item]);
        }
        // var newData = this.state.data.push(data);
        // this.setState({ data: newData })
        this.setState({data});
      });

  }

  // <li className="item" key={item.id}>{item.name}: {item.current.price}</li>;
  render() {
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
        <h5 className="card-category">{item.name}</h5>
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
      <div className="chart-area">
      <Line
      data={chartExample4.data}
      options={chartExample4.options}
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
