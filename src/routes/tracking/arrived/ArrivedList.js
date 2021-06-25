import { useMemo } from "react";
import { GET_TRACKING_ARRIVINGS } from "./gql";
import { Helmet } from "react-helmet";

import { usePagination, useTitle, useToggleDialog, useGetOne } from "../../../hooks";
import { Pagination } from "../../../components/Pagination";

import { generateColumns } from "./TableData";
import { FlexForHeader } from "../../../components/Flex";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { CustomRowGenerator, CustomRowGeneratorForModal, getList } from "../../../utils/functions";
import { ButtonWithIcon } from "../../../components/Buttons";
import SmallDialog from "components/SmallDialog";
import { DetailedInfo } from "components/DetailedInfo";
import { formatPrice, cutTextLength } from "utils/functions";
import { trackingStatuses } from "utils/static";

const ArrivedList = ({ match }) => {
    const title = useTitle("Прибывшие");
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
        qraphQlQuery: GET_TRACKING_ARRIVINGS,
        singular: "tracking",
        plural: "trackings"
    });


    const [
        open,
        handleClose,
        handleOpen
    ] = useToggleDialog();

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
    const { one, setUniqueVal } = useGetOne(trackings, "id");
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

    const openDialog = (id) => {
        setUniqueVal(id);
        handleOpen();
    }

    const columns = useMemo(() => generateColumns(openDialog), []);

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
            {/* <ButtonWithIcon name="создать слежение" url={`${match.url}/create`}/> */}
            <CustomMUIDataTable
                title={"Список слежений"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGeneratorForModal(openDialog)}
                {
                    ...{ searchableFields }
                }
            />
            <SmallDialog title={`Заявка ${one?.node?.publicId}`} close={handleClose} isOpen={open}>
                {
                    one && <DetailedInfo>
                        <fieldset>
                            <legend>Поставщик: </legend>
                            <span>{one.node.vendor.name}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Номер транспорта: </legend>
                            <span>{one.node.transportNumber}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Валюта: </legend>
                            <span>{one.node.currency}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Создан : </legend>
                            <span>{one.node.createdAt}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Создан : </legend>
                            <span>{one.node.currency}</span>
                        </fieldset>
                    </DetailedInfo>
                }
            </SmallDialog>
            <Pagination {...paginationParams} />
        </>
    );
};

export default ArrivedList;