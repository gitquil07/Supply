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
import ReportTable from "./report/ReportTable";

const Supply = ({ match }) => {

    const url = (path) => `${match.url}${path}`;

    return (
        <Switch>
            <Route path={url("/order")} component={OrderList} exact />
            <Route path={url("/order/detail")} component={OrderDetail} />
            <Route path={url("/order/create")} component={OrderCreate} />
            <Route path={url("/order/edit/:id")} component={OrderCreate} />

            <Route path={url("/application")} component={ApplicationList} exact />
            <Route path={url("/application/create")} component={ApplicationCreate} />

            <Route path={url("/info-record")} component={InfoRecordList} exact />
            <Route path={url("/info-record/detail/:id")} component={InfoRecordDetail} />

            <Route path={url("/arrived")} component={ArrivedList} exact />

            <Route path={url("/customs")} component={CustomsList} exact />

            <Route path={url("/report")} component={ReportTable} exact />
        </Switch>
    );
};

export default Supply;