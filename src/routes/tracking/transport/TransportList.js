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
import { convertDataIntoExcelSpreadSheet } from "utils/functions";

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
            netto: node?.netto,
            transportType: node?.application?.transportType?.name
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

    const trackingInfoList = trackings.map(({ node }) => {

        const locations = node.locations?.edges?.map(({node}) => node?.name);

        const allProducts = [];
        node?.application?.orders?.edges?.forEach(({node}) => {
            console.log("xlsx node", node);
            const products = node?.orderItems?.edges?.map(({node}) => node?.vendorProduct?.product?.name);
            allProducts.push(...products);
        });


        return {
            publicId: node?.publicId,
            trackingUser: node?.application?.trackingUser?.username,
            cityAndCountry: node?.application?.orders?.edges?.map(({node}) => `${node?.vendorFactory?.vendor?.sapCountry?.name} / ${node?.vendorFactory?.vendor?.sapCity}`),
            firms: node?.application?.orders?.edges.map(({node}) => node?.vendorFactory?.factory?.firm?.name),
            factories: node.application?.orders?.edges?.filter(({node}) => node?.vendorFactory?.factory?.name !== null)?.map(({node}) => node?.vendorFactory?.factory?.name),
            products: allProducts,
            invoices: node?.application?.invoices?.edges?.map(({node}) => node?.number),
            shippingDate: node?.application?.shippingDate,
            inWayDayCount: node?.application?.inWayDayCount,
            location: locations[locations.length - 1],
            transportNumber: node?.transportNumber,
            companyName: node?.vendor?.companyName,
            transportType: node?.application?.transportType?.name,
            brutto: node?.brutto,
            amount: node?.amount,
            deliveryConditions: node?.application?.invoices?.edges?.map(({node}) => node?.deliveryCondition),
            note: node?.application?.invoices?.edges?.map(({node}) => node?.destination),
            relativeWeight: node?.application?.invoices?.edges?.map(({node}) => node?.relativeWeight),
          
            // trDate: node?.trDate,
            // trackingStatus: trackingStatuses.find(status => status.value === node.status)?.label,
            // amount: node?.amount,

            // // New
            // station: node?.station,
        }
    });

    const columnNames = [
        "№ слежения",
        "Логист",
        "Город/Страна отправления",
        "Получатель",
        "Завод получателя",
        "Наименование товара",
        "Грузовой инвойс №",
        "Дата отгрузки",
        "Дни в пути",
        "Транспортная компания",
        "Местонахождение",
        "Номер транспорта",
        "Тип транспорта",
        "Брутто(кг)",
        "Транспортный расход",
        "Условия поставки",
        "Примечание",
        "Кол-во Транспорта 1/колл.Инвойса",
    ];

    const { url } = match;
    const columns = useMemo(() => generateColumns(url), []);

    const searchableFields = [
        "publicId",
        "trackingUser",
        // "firms",
        // "factories",
        "shippingDate",
        "trDate",
        "companyName",
        "transportNumber",
        "location",
        "trackingStatus",
        "inWayDayCount",
        "amount",
        "brutto",
        "netto",
        "transportType"
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
                onDownload ={(buildHead, buildBody, columns, data) => convertDataIntoExcelSpreadSheet(trackingInfoList, columnNames)}
                title={"Список слежений"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGenerator(url)}
                loading={dataPaginationRes.loading}
                {
                    ...{ searchableFields }
                }
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default TransportList;