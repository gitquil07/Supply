import { Route, Switch } from "react-router-dom"

import OrderList from "./order/OrderList"
import OrderDetail from "./order/OrderDetail";
import OrderCreate from "./order/OrderCreate";

import ApplicationList from "./application/ApplicationsList";
import ApplicationCreate from "./application/ApplicationCreate";

import InfoRecordList from "./info-record/InfoRecordList";
import InfoRecordDetail from "./info-record/InfoRecordDetail";

import ArrivedList from "./arrived/ArrivedList"
import CustomsList from "./customs/CustomsList";

const Supply = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}/order`} component={OrderList} exact />
            <Route path={`${match.url}/order/detail`} component={OrderDetail} />
            <Route path={`${match.url}/order/create`} component={OrderCreate} />

            <Route path={`${match.url}/application`} component={ApplicationList} exact />
            <Route path={`${match.url}/application/create`} component={ApplicationCreate} />

            <Route path={`${match.url}/info-record`} component={InfoRecordList} exact />
            <Route path={`${match.url}/info-record/detail/:id`} component={InfoRecordDetail} />

            <Route path={`${match.url}/arrived`} component={ArrivedList} exact />

            <Route path={`${match.url}/customs`} component={CustomsList} exact />
        </Switch>
    );
};

export default Supply;