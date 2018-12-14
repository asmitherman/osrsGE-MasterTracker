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


    // console.log(sorted)
    let topTenTraded = [];
    Object.keys(AllItems[0]).forEach(function(key,index) {
      topTenTraded.push(AllItems[0][key]);
    });
    let sorted = topTenTraded.sort(function(a, b){return b.overall_quantity - a.overall_quantity})
    let itemLen = 10;
    let topTen = sorted.map(function(item) {
        if(itemLen) {
          itemLen--;
          return (
            <ListGroupItem> {item.name} <div className="float-right">{item.overall_quantity}</div></ListGroupItem>
          )
        }
      }, this);




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
      <Card className="border border-info">
      <CardBody>
      <div className="dashTitle">
        <i className="fas fa-exchange-alt"></i>
        &nbsp;
        &nbsp;
        &nbsp;
        <b>Top 10 Traded</b>

        </div>

      </CardBody>
      </Card>
      <Card className="border border-info">
      <CardBody>
      <ListGroup>
      {topTen}
      </ListGroup>
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
      <Card className="border border-info">
      <CardBody>
      <div className="dashTitle">
        <i className="fas fa-exchange-alt"></i>
        &nbsp;
        &nbsp;
        &nbsp;
        <b>News & Game Updates</b>

        </div>


      </CardBody>
      </Card>
      <Card className="border border-info">
      <CardBody>
      <blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">It&#39;s time for the global release of <a href="https://twitter.com/hashtag/OSRSMobile?src=hash&amp;ref_src=twsrc%5Etfw">#OSRSMobile</a>!<a href="https://t.co/FcvyNRoqMJ">https://t.co/FcvyNRoqMJ</a><br/><br/>(If on a mobile device you’ll go to the App Store or Google Play Store. If you’re on desktop you’ll go to our launch site)<br/><br/>...and yes, Winter 2017 has been the longest Winter yet 🥶 <a href="https://t.co/fgTZXxOvgw">pic.twitter.com/fgTZXxOvgw</a></p>&mdash; Old School RuneScape (@OldSchoolRS) <a href="https://twitter.com/OldSchoolRS/status/1057224510926143489?ref_src=twsrc%5Etfw">October 30, 2018</a></blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </CardBody>
      </Card>
      <Card className="border border-info">
      <CardBody>
      <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">It&#39;s time to get festive at the Old School Christmas Event of 2018 - now live with today&#39;s update! See all the details here: <a href="https://t.co/8Z86FuciCA">https://t.co/8Z86FuciCA</a></p>&mdash; Old School RuneScape (@OldSchoolRS) <a href="https://twitter.com/OldSchoolRS/status/1073179476232757250?ref_src=twsrc%5Etfw">December 13, 2018</a></blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

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
