import React from "react";
import ReactDom from 'react-dom'
import Moment from 'moment'
// import TableData from '../components/ItemSearch/Search.jsx';

// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Chart from '../components/Charts/charts.jsx';
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

import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";



class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isRecentLoaded: false,
      items:[],
      recentItems:[],
      bigChartDataName: "data1",
      bigChartData: {},

    }

  }

  componentDidMount() {
    this.mounted = true;

    //api call for past week data
    fetch("https://storage.googleapis.com/osbuddy-exchange/graphs/180/"+ this.props.match.params.itemid +".json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )

    //api call for past 2 days data
    fetch("https://storage.googleapis.com/osbuddy-exchange/graphs/30/"+ this.props.match.params.itemid +".json")
.then(res => res.json())
.then(
  (result) => {
    console.log(result)
    this.setState({
      isRecentLoaded: true,
      recentItems: result
    });
  },
  (error) => {
    this.setState({
      isRecentLoaded: true,
      error
    });
  }
)

  }

  //renders price chart depending on name which is the type
  setBgChartDataName(name,itemName) {
  console.log('this worked')
  let values = [];
  let days = [];
  let sellingValues = [];

  //checks name and renderes proper data for chart
  if(name === 'data1') {
    let graph = this.state.items;
    for(let i = 0; i < graph.length; i++)
    {
      let day = new Date(graph[i].ts*1000);
      let standardDate = Moment(day/1000)
      days.push(standardDate.format('l'))
      values.push(graph[i].buyingPrice)
    };
    for(let i = 0; i < graph.length; i++)
    {
      sellingValues.push(graph[i].sellingPrice)
    };

  } else if ( name === 'day') {
    let graph = this.state.recentItems
    for(let i = 0; i < graph.length; i++)
    {
      let day = new Date(graph[i].ts*1000);
      let standardDate = Moment(day/1000)
      days.push(standardDate.format('l'))
      values.push(graph[i].buyingPrice)
    };
    for(let i = 0; i < graph.length; i++)
    {
      sellingValues.push(graph[i].sellingPrice)
    };
  }


  let bigChartData = {
      labels: days,
      datasets:[
        {
          label:'Buying Value',
          data: values,
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

        },
        {
          label:'Selling Value',
                 data: sellingValues,
                 fill: true,
                 borderColor: "#ff8c77",
                 borderWidth: 2,
                 borderDash: [],
                 borderDashOffset: 0.0,
                 pointBackgroundColor: "#ff8c77",
                 pointBorderColor: "rgba(255,255,255,0)",
                 pointHoverBackgroundColor: "#ff8c77",
                 pointBorderWidth: 20,
                 pointHoverRadius: 4,
                 pointHoverBorderWidth: 15,
                 pointRadius: 3,

        }
      ]

    }

    //Render Chart
  ReactDom.render(
    <Card className="card-chart">
    <CardHeader>
    <Row>
    <Col className="text-left" sm="6">
    <h5 className="card-category"> {" Long Term Price"}</h5>
    <CardTitle tag="h2">Daily Average
    <div className="float-right">
     <span className="text-info">Buying Price </span>
     &nbsp;&nbsp;&nbsp;
     <span className="text-warning">Selling Price </span>


    </div>
    </CardTitle>
    </Col>
    <Col sm="6">


    <ButtonGroup
    className="btn-group-toggle float-right"
    data-toggle="buttons"
    >
    <Button
    tag="label"
    className={classNames("btn-simple", {
      active: this.state.bigChartData === "day"
    })}
    color="info"
    id="0"
    size="sm"
    onClick={() => this.setBgChartDataName("day")}
    >
    <input
    defaultChecked
    className="d-none"
    name="options"
    type="radio"
    />
    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
    Recent Days
    </span>
    <span className="d-block d-sm-none">
    <i className="tim-icons icon-single-02" />
    </span>
    </Button>

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
    Past Week
    </span>
    <span className="d-block d-sm-none">
    <i className="tim-icons icon-single-02" />
    </span>
    </Button>

    </ButtonGroup>
    </Col>
    </Row>
    </CardHeader>
    <CardBody>
    <div className="chart-area">
    <Line
    data={bigChartData}
    options={chartExample1.options}
    />
    </div>
    </CardBody>
    </Card>,
    document.getElementById('bigChartArea'))

};
//End price chart render




  //major logic for page rendering
  render() {
    let bigChart = []
    if(this.state.isLoaded) {
      let bigChart = this.setBgChartDataName("day",this.props.match.params.itemid)
    }

    let itemID = this.props.match.params.itemid;
    let thisItem;
    Object.keys(AllItems[0]).forEach(function(key,index) {
      if(key == itemID) {
        thisItem = AllItems[0][key];
      }
    });
      const {error, isLoaded, items } = this.state;
    let graphData = this.state.items.map(function(item) {

        return (
            <li>{item.overallPrice}</li>
        )
    });
    return (
      <div className="content" >
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
      <Row>
      <Col xs="12">
      <div id="bigChartArea">
      {bigChart}
      </div>
      </Col>
      </Row>
      </div>

    );  }

  componentWillUnmount() {
    this.mounted = false;
  }
}

export default ItemDetail;
