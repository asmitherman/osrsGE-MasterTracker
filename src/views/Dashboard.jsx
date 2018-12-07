import React from "react";
// import ReactDom from 'react-dom'
// import Moment from 'moment'
// import TableData from '../components/ItemSearch/Search.jsx';

// nodejs library that concatenates classes
// import classNames from "classnames";
// react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// import Chart from '../components/Charts/charts.jsx';
// import Items from '../data/items';

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
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip
} from "reactstrap";

// core components
// import {
//   chartExample1,
//   chartExample2,
//   chartExample3,
//   chartExample4
// } from "variables/charts.jsx";


// const items = require('../data/items.js');
// const { grandExchange } = require('osrs-api');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  componentDidMount() {
    this.mounted = true;
  }


  render() {




    return (
      <div className="content">
      <Row>
      <Col lg="3" md="12">
      <Card className="border border-info">
      <CardBody >
      <div className="dashTitle">
        <i className="fas fa-exchange-alt"></i>
        &nbsp;
        &nbsp;
        &nbsp;
        <b>Top 10 Trending</b>

        </div>
      </CardBody>
      </Card>
      <Card className="border border-info">
      <CardBody >
        <ListGroup background-color="transparent">
       <ListGroupItem background-color="transparent">Noose wand</ListGroupItem>
       <ListGroupItem>Serum 207 (3)</ListGroupItem>
       <ListGroupItem>Unlit torch</ListGroupItem>
       <ListGroupItem>Butterfly net</ListGroupItem>
       <ListGroupItem>Oak chair</ListGroupItem>
     </ListGroup>
      </CardBody>
      </Card>
      </Col>
      <Col lg="3" md="12">
      <Card >
      <CardBody>
        Top 10 Traded
      </CardBody>
      </Card>
      </Col>
      <Col lg="3" md="12">
      <Card>
      <CardBody>
      Category Index Tracker
      </CardBody>
      </Card>
      </Col>
      <Col lg="3" md="12">
      <Card>
      <CardBody>
      News & Game Updates
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
