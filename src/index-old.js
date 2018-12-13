import React from "react";
import ReactDOM from "react-dom";


import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import App from './components/App';

//
ReactDOM.render(<App />, document.getElementById('root'));
// const hist = createBrowserHistory();
//
// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/admin" render={props => <AdminLayout {...props} />} />
//       <Route path="/rtl" render={props => <RTLLayout {...props} />} />
//       <Redirect from="/" to="/admin/dashboard" />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );
