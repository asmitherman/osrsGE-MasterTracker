import ItemDetail from "views/Item.jsx";
// import Icons from "views/Icons.jsx";
// import Map from "views/Map.jsx";
// import Notifications from "views/Notifications.jsx";
// import Rtl from "views/Rtl.jsx";
// import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
// import UserProfile from "views/UserProfile.jsx";

var otherRoutes = [
  {
    path: "/item/:itemid",
    name: "Item Detail Page",
    icon: "tim-icons icon-tag",
    component: ItemDetail,
    layout: "/admin",
    hidden: "true"
  }

];
export default otherRoutes;
