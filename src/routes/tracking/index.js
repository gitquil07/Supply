import { Route } from "react-router-dom";

import TrackingList from "./tracking/TrackingList";
import TrackingDetail from "./tracking/TrackingDetail";
import TrackingCreate from "./tracking/TrackingCreate";

import ArrivedList from "./arrived/ArrivedList";

import TransportList from "./transport/TransportList";
import TransportCreate from "./transport/TransportCreate";

import ClientList from "./clients/ClientList";
import ClientCreate from "./clients/ClientCreate";

import DeptList from "./dept/DebtList";
import DeptCreate from "./dept/DebtCreate";

import { ProtectedRoute } from "authorization/routes";


const Tracking = ({ match }) => {
    return (
        <>
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
        </>
    );
};

export default Tracking;