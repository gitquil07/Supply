import { Route, Switch } from "react-router-dom"

import OrderList from "./order/OrderList"
import OrderDetail from "./order/OrderDetail";
import OrderCreate from "./order/OrderCreate";

import ApplicationList from "./application/ApplicationsList";
import ApplicationCreate from "./application/ApplicationCreate";

const Supply = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}/order`} component={OrderList} exact />
            <Route path={`${match.url}/order/detail`} component={OrderDetail} />
            <Route path={`${match.url}/order/create`} component={OrderCreate} />

            <Route path={`${match.url}/application`} component={ApplicationList} exact />
            <Route path={`${match.url}/application/create`} component={ApplicationCreate} />
        </Switch>
    );
};

export default Supply;