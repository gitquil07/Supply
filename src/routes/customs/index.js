import { Route } from "react-router-dom";

// import NewList from "./new/NewList";
// import NewCreate from "./new/NewCreate";

import ReadyList from "./ready/ReadyList";
// import ReadyCreate from "./ready/ReadyCreate";

import NoMoneyList from "./no-money/NoMoneyList";
// import NoMoneyCreate from "./no-money/NoMoneyCreate";

import NoDocumentList from "./no-document/NoDocumentList";
// import NoDocumentCustomsCreate from "./no-document/NoDocumentCreate";

import CertificateList from "./certificate/CertificateList";
// import CertificateCreate from "./certificate/CertificateCreate";

import NoTypedList from "./no-typed/NoTypedList";
// import NoTypedCreate from "./no-typed/NoTypedCreate";

import ClosedList from "./closed/ClosedList";
// import ClosedDetail from "./closed/ClosedDetail";

import NewList from "./new/NewList";
import CustomCreate from "./new/NewCreate";

const Customs = ({ match }) => {
    return (
        <>
            {/* <Route path={`${match.url}/new`} component={NewList} />
            <Route path={`${match.url}/new/edit/:id`} component={NewCreate} /> */}

            <Route path={`${match.url}/ready`} component={ReadyList} exact />
            <Route path={`${match.url}/ready/edit/:id`} component={CustomCreate} />

            <Route path={`${match.url}/no-money`} component={NoMoneyList} exact />
            <Route path={`${match.url}/no-money/edit/:id`} component={CustomCreate} />

            <Route path={`${match.url}/no-document`} component={NoDocumentList} exact />
            <Route path={`${match.url}/no-document/edit/:id`} component={CustomCreate} />

            <Route path={`${match.url}/certificate`} component={CertificateList} exact />
            <Route path={`${match.url}/certificate/edit/:id`} component={CustomCreate} />

            <Route path={`${match.url}/no-typed`} component={NoTypedList} exact />
            <Route path={`${match.url}/no-typed/edit/:id`} component={CustomCreate} />

            <Route path={`${match.url}/closed`} component={ClosedList} exact />
            <Route path={`${match.url}/closed/edit/:id`} component={CustomCreate} />

            <Route path={`${match.url}/new`} component={NewList} exact />
            <Route path={`${match.url}/new/create`} component={CustomCreate} />
            <Route path={`${match.url}/new/edit/:id`} component={CustomCreate} />
        </>
    );
}

export default Customs;