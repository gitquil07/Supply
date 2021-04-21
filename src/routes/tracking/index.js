import {Route} from "react-router-dom";

import TrackingList from "./tracking/TrackingList";
import TrackingDetail from "./tracking/TrackingDetail";
import TrackingEdit from "./tracking/TrackingEdit";

const Tracking = ({match}) => {
    return (
        <>
            <Route exact path={`${match.url}`} component={TrackingList} />
            <Route path={`${match.url}/detail/:id`} component={TrackingDetail} />
            <Route path={`${match.url}/edit/:id`} component={TrackingEdit} />
            {/* <Route path={`${match.url}/tracking-transport`} component={} />
            <Route path={`${match.url}/tracking-arrived`} component={} />
            <Route path={`${match.url}/tracking-clients`} component={} />
            <Route path={`${match.url}/tracking-debt`} component={} /> */}
        </>
    );
};

export default Tracking;