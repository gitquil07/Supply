import { Route } from "react-router-dom";

import NewList from "./new/NewList";
import NewCreate from "./new/NewCreate";

import ReadyList from "./ready/ReadyList";
import ReadyCreate from "./ready/ReadyCreate";

import NoMoneyList from "./no-money/NoMoneyList";
import NoMoneyCreate from "./no-money/NoMoneyCreate";

import NoDocumentList from "./no-document/NoDocumentList";
import NoDocumentCustomsCreate from "./no-document/NoDocumentCreate";

import CertificateList from "./certificate/CertificateList";
import CertificateCreate from "./certificate/CertificateCreate";

import NoTypedList from "./no-typed/NoTypedList";
import NoTypedCreate from "./no-typed/NoTypedCreate";

import ClosedList from "./closed/ClosedList";
import ClosedDetail from "./closed/ClosedDetail";

const Customs = ({ match }) => {
    return (
        <>
            <Route path={`${match.url}/new`} component={NewList} />
            <Route path={`${match.url}/new/create/:id`} component={NewCreate} />

            <Route path={`${match.url}/ready`} component={ReadyList} />
            <Route path={`${match.url}/ready/create/:id`} component={ReadyCreate} />

            <Route path={`${match.url}/no-money`} component={NoMoneyList} />
            <Route path={`${match.url}/no-money/create/:id`} component={NoMoneyCreate} />

            <Route path={`${match.url}/no-document`} component={NoDocumentList} />
            <Route path={`${match.url}/no-document/create/:id`} component={NoDocumentCustomsCreate} />

            <Route path={`${match.url}/certificate`} component={CertificateList} />
            <Route path={`${match.url}/certificate/create/:id`} component={CertificateCreate} />

            <Route path={`${match.url}/no-typed`} component={NoTypedList} />
            <Route path={`${match.url}/no-typed/create/:id`} component={NoTypedCreate} />

            <Route path={`${match.url}/closed`} component={ClosedList} />
            <Route path={`${match.url}/closed/detail/:id`} component={ClosedDetail} />

        </>
    );
}

export default Customs;