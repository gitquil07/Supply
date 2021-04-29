import { useMemo } from "react";
import { GET_TRACKING_TRANSPORTS } from "./gql";
import { Helmet } from "react-helmet";

import { useDateRange, useTitle } from "../../../hooks";
import { setTitleWithDateRange } from "../../../utils/functions";

import { generateColumns } from "./TableData";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";

const TrackingTransportList = ({ match }) => {

    const {
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        handleClick,
        data,
        error
    } = useDateRange(GET_TRACKING_TRANSPORTS);

    const title = useTitle("Слежение");

    const list = [];

    const { url } = match;
    const columns = useMemo(() => generateColumns(url, list), [data]);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <DatePickers
                fromDate={fromDate}
                toDate={toDate}
                changeFrom={setFromDate}
                changeTo={setToDate}
                buttonClicked={handleClick}
            />
            <CustomMUIDataTable
                title={setTitleWithDateRange("слежение", fromDate, toDate)}
                columns={columns}
                data={list}
            />
        </>
    );
}

export default TrackingTransportList;