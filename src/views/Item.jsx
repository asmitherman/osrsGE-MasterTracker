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
import AllItems from '../data/allitems';

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


class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  componentDidMount() {
    this.mounted = true;
  }




  render() {
    // console.log(this.props);
    // console.log(this.props.match.params.itemid)
    let itemID = this.props.match.params.itemid;
    let thisItem;
    Object.keys(AllItems[0]).forEach(function(key,index) {
      if(key == itemID) {
        thisItem = AllItems[0][key];
      }
    });

//           <img className="float-left img-fluid" src="https://www.ge-tracker.com/assets/images/icons/1511.gif"/>

    return (
      <div className="content">
      <Row>
      <Col lg="5" md="12">
      <Card>
        <CardHeader>

          <CardTitle tag="h4">
          <h2> {thisItem.name} </h2>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <tbody>
              <tr>
                <td>Current Price</td>
                <td>{thisItem.overall_average}</td>
                <td>Buying Quantity</td>
                <td>{thisItem.buy_quantity}</td>
              </tr>
              <tr>
                <td>Approx. Offer Price</td>
                <td>{thisItem.sell_average}</td>
                <td>Selling Quantity</td>
                <td>{thisItem.sell_quantity}</td>
              </tr>
              <tr>
                <td>Approx. Sell Price</td>
                <td>{thisItem.buy_average}</td>
                <td>Buy/Sell Ratio</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>Approx. Profit</td>
                <td>N/A</td>
                <td>GE Limit</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>High Alc Value</td>
                <td>N/A</td>
                <td>High Alc Profit</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      </Col>
      </Row>
      </div>

    );  }

  componentWillUnmount() {
    this.mounted = false;
  }




}

export default ItemDetail;
