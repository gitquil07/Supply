import { Route, Switch } from "react-router-dom"

import OrderList from "./order/OrderList"
import OrderDetail from "./order/OrderDetail";
import OrderCreate from "./order/OrderCreate";

import ApplicationList from "./application/ApplicationsList";
import ApplicationCreate from "./application/ApplicationCreate";

import InfoRecordList from "./info-record/InfoRecordList";
import InfoRecordDetail from "./info-record/InfoRecordDetail";

import CustomsList from "./customs/CustomsList";
import ArrivedList from "./arrived/ArrivedList"
import ReportTable from "./report/ReportTable";

import TestTable from "./report/test";
import TestTable2 from "./report/test2";

import { ProtectedRoute } from "authorization/routes";

const Supply = ({ match }) => {

    // console.log("props sad", props);
    const url = (path) => `${match.url}${path}`;

    return (
        <Switch>
            <ProtectedRoute path={url("/order")} component={OrderList} exact />
            <ProtectedRoute path={url("/order/detail")} component={OrderDetail} />
            <ProtectedRoute path={url("/order/create")} component={OrderCreate} />
            <ProtectedRoute path={url("/order/edit/:id")} component={OrderCreate} />

            <ProtectedRoute path={url("/application")} component={ApplicationList} exact />
            <ProtectedRoute path={url("/application/create")} component={ApplicationCreate} />
            <ProtectedRoute path={url("/application/edit/:id")} component={ApplicationCreate} />

            <ProtectedRoute path={url("/info-record")} component={InfoRecordList} exact />
            <ProtectedRoute path={url("/info-record/detail/:id")} component={InfoRecordDetail} />

            <ProtectedRoute path={url("/arrived")} component={ArrivedList} exact />

            <ProtectedRoute path={url("/customs")} component={CustomsList} exact />

            <ProtectedRoute path={url("/report")} component={TestTable2} exact />
        </Switch>
    );
};

export default Supply;