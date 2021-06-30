import React, { lazy, Suspense } from "react";
import CustomCircularProgress from "components/CustomCircularProgress";

// import OrderList from "./order/OrderList"
// import OrderDetail from "./order/OrderDetail";
// import OrderCreate from "./order/OrderCreate";

// import ApplicationList from "./application/ApplicationsList";
// // import ApplicationCreate from "./application/ApplicationCreate";
// import ApplicationCreateTwo from "./application/ApplicationCreateTwo";

// import InfoRecordList from "./info-record/InfoRecordList";
// import InfoRecordDetail from "./info-record/InfoRecordDetail";

// import CustomsList from "./customs/CustomsList";
// import ArrivedList from "./arrived/ArrivedList"
// import ReportTable from "./report/ReportTable";

// import TestTable2 from "./report/test2";

// import StockBalance from "./stockBalance";
// import Plan from "./plan";

import { ProtectedRoute } from "authorization/routes";


// Try dynamic imports using React.lazy

const OrderList = lazy(() => import("./order/OrderList"));
const OrderDetail = lazy(() => import("./order/OrderDetail"));
const OrderCreate = lazy(() => import("./order/OrderCreate"));
const ApplicationList = lazy(() => import("./application/ApplicationsList"));
const ApplicationCreateTwo = lazy(() => import("./application/ApplicationCreateTwo"));
const InfoRecordList = lazy(() => import("./info-record/InfoRecordList"));
const InfoRecordDetail = lazy(() => import("./info-record/InfoRecordDetail"));
const CustomsList = lazy(() => import("./customs/CustomsList"));
const ArrivedList = lazy(() => import("./arrived/ArrivedList"));
const TestTable2 = lazy(() => import("./report/test2"));
const StockBalance = lazy(() => import("./stockBalance"));
const Plan = lazy(() => import("./plan"));


const Supply = ({ match }) => {

    const url = (path) => `${match.url}${path}`;

    return (
        <Suspense fallback={<CustomCircularProgress/>}>
            <ProtectedRoute path={url("/order")} component={OrderList} exact />
            <ProtectedRoute path={url("/order/detail")} component={OrderDetail} />
            <ProtectedRoute path={url("/order/create")} component={OrderCreate} />
            <ProtectedRoute path={url("/order/edit/:id")} component={OrderCreate} />

            <ProtectedRoute path={url("/application")} component={ApplicationList} exact />
            <ProtectedRoute path={url("/application/create")} component={ApplicationCreateTwo} />
            <ProtectedRoute path={url("/application/edit/:id")} component={ApplicationCreateTwo} />

            <ProtectedRoute path={url("/info-record")} component={InfoRecordList} exact />
            <ProtectedRoute path={url("/info-record/detail/:id")} component={InfoRecordDetail} />

            <ProtectedRoute path={url("/arrived")} component={ArrivedList} exact />

            <ProtectedRoute path={url("/customs")} component={CustomsList} exact />

            <ProtectedRoute path={url("/report")} component={TestTable2} exact />

            <ProtectedRoute path={url("/stock-balance")} component={StockBalance} />
            <ProtectedRoute path={url("/plan-product")} component={Plan} />
        </Suspense>
    );
};




export default Supply;