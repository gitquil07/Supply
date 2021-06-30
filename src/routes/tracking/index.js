import React, { lazy, Suspense } from "react"; 
import CustomCircularProgress from "components/CustomCircularProgress";

// import TrackingList from "./tracking/TrackingList";
// import TrackingDetail from "./tracking/TrackingDetail";
// import TrackingCreate from "./tracking/TrackingCreate";

// import ArrivedList from "./arrived/ArrivedList";

// import TransportList from "./transport/TransportList";
// import TransportCreate from "./transport/TransportCreate";

// import ClientList from "./clients/ClientList";
// import ClientCreate from "./clients/ClientCreate";

// import DeptList from "./dept/DebtList";
// import DeptCreate from "./dept/DebtCreate";

import { ProtectedRoute } from "authorization/routes";

const TrackingList = lazy(() => import("./tracking/TrackingList"));
const TrackingDetail = lazy(() => import("./tracking/TrackingDetail"));
const TrackingCreate = lazy(() => import("./tracking/TrackingCreate"));
const ArrivedList = lazy(() => import("./arrived/ArrivedList"));
const TransportList = lazy(() => import("./transport/TransportList"));
const TransportCreate = lazy(() => import("./transport/TransportCreate"));
const ClientList = lazy(() => import("./clients/ClientList"));
const ClientCreate = lazy(() => import("./clients/ClientCreate"));
const DeptList = lazy(() => import("./dept/DebtList"));
const DeptCreate = lazy(() => import("./dept/DebtCreate"));


const Tracking = ({ match }) => {
    return (
        <>
            <Suspense fallback={<CustomCircularProgress/>}>
                <ProtectedRoute exact path={`${match.url}`} component={TrackingList} />

                <ProtectedRoute path={`${match.url}/detail/:id`} component={TrackingDetail} />
                <ProtectedRoute path={`${match.url}/edit/:id`} component={TrackingCreate} />

                <ProtectedRoute path={`${match.url}/arrived`} component={ArrivedList} exact/>
                <ProtectedRoute path={`${match.url}/arrived/edit/:id`} component={TransportCreate} />

                <ProtectedRoute exact path={`${match.url}/transport`} component={TransportList} />
                <ProtectedRoute path={`${match.url}/transport/edit/:id`} component={TransportCreate} />

                <ProtectedRoute path={`${match.url}/clients`} component={ClientList} />
                <ProtectedRoute path={`${match.url}/clients/create/:id`} component={ClientCreate} />

                <ProtectedRoute path={`${match.url}/dept`} component={DeptList} />
                <ProtectedRoute path={`${match.url}/dept/create/:id`} component={DeptCreate} />
            </Suspense>
        </>
    );
};

export default Tracking;