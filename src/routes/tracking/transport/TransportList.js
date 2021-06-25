import { useMemo } from "react";
import { GET_TRACKING_TRANSPORTS } from "./gql";
import { Helmet } from "react-helmet";

import { usePagination, useTitle } from "hooks";
import { Pagination } from "components/Pagination";

import { generateColumns } from "./TableData";
import DatePickers from "components/Inputs/DatePickers";
import { CustomMUIDataTable } from "components/CustomMUIDataTable";
import { CustomRowGenerator, getList } from "utils/functions";
import { formatPrice, cutTextLength } from "utils/functions";
import { trackingStatuses } from "utils/static";

const TransportList = ({ match }) => {
    const title = useTitle("Слежение");
    const {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        dataPaginationRes,


        // For pages which has date filter
        toDate,
        fromDate,
        fromDateChange,
        setFromDateChange,
        toDateChange,
        setToDateChange,
        handleDateApply
    } = usePagination({
        type: "dateFilter",
        qraphQlQuery: GET_TRACKING_TRANSPORTS,
        singular: "tracking",
        plural: "trackings"
    });


    const paginationParams = {
        toDate,
        fromDate,
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        type: "dateFilter"
    }

    const trackings = getList(dataPaginationRes?.data) || [];
    const list = trackings.map(({ node }) => {

        const locations = node.locations?.edges?.map(({node}) => node?.name);

        const fCols = {
            publicId: node?.publicId,
            trackingUser: node?.application?.trackingUser?.username,
            firms: node?.application?.orders?.edges.map(({node}) => node?.vendorFactory?.factory?.firm?.name),
            factories: node.application?.orders?.edges?.filter(({node}) => node?.vendorFactory?.factory?.name !== null)?.map(({node}) => node?.vendorFactory?.factory?.name),
            shippingDate: node?.application?.shippingDate,
            trDate: node?.trDate,
            companyName: node?.vendor?.companyName,
            transportNumber: node?.transportNumber,
            location: locations[locations.length - 1],
            trackingStatus: trackingStatuses.find(status => status.value === node.status)?.label,
            inWayDayCount: node?.application?.inWayDayCount,
            amount: node?.amount,
            brutto: node?.brutto,
            netto: node?.netto
        }

        return {
            id: node?.id,
            publicIdAndLogist: {publicId: fCols.publicId, trackingUser: fCols.trackingUser},
            firmAndFactory: {firms: fCols.firms.map(firm => cutTextLength(firm)), factories: fCols.factories},
            shippingDateAndArrivingDate: {shippingDate: fCols.shippingDate, trDate: fCols.trDate},
            companyNameAndtransportNumber: {companyName: cutTextLength(fCols.companyName), transportNumber: fCols.transportNumber},
            locationAndStatusAndDaysInWay: {location: fCols.location, trackingStatus: fCols.trackingStatus, inWayDayCount: fCols.inWayDayCount},
            amountAndNettoAndBrutto: {amount: formatPrice(fCols.amount), netto: fCols.netto, brutto: fCols.brutto},
            ...fCols
        }
    });

    const { url } = match;
    const columns = useMemo(() => generateColumns(url), []);

    const searchableFields = [
        "publicId",
        "trackingUser",
        "firms",
        "factories",
        "shippingDate",
        "trDate",
        "companyName",
        "transportNumber",
        "location",
        "trackingStatus",
        "inWayDayCount",
        "amount",
        "brutto",
        "netto"
    ];

    return (
        <>
            <Helmet title={title} />
                <DatePickers mR="15px"
                    fromDate={fromDateChange}
                    toDate={toDateChange}
                    changeFrom={setFromDateChange}
                    changeTo={setToDateChange}
                    buttonClicked={handleDateApply}
                />
            <CustomMUIDataTable
                title={"Список слежений"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGenerator(url)}
                {
                    ...{ searchableFields }
                }
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default TransportList;