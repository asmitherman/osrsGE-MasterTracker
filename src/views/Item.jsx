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


    return (
      <div className="content">
      <Row>
      <Col lg="5" md="12">
      <Card>
      <CardTitle>
      {thisItem.name}
      &nbsp;
      &nbsp;
      &nbsp;

      {thisItem.overall_average}
      </CardTitle>
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
