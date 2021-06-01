import { useMemo } from 'react';
import { Helmet } from 'react-helmet';

import { ORDERS } from "./gql";
import { useTitle } from '../../../hooks';
import { generateColumns } from './TableData';
import { CustomRowGenerator, TimeParser } from "../../../utils/functions";
import { FlexForHeader } from '../../../components/Flex';
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from '../../../components/Inputs/DatePickers';
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { usePagination } from "../../../hooks";
import { Pagination } from "../../../components/Pagination";
import { getList } from "../../../utils/functions";

const OrderList = ({ match }) => {

    const title = useTitle("Заказы");

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
        qraphQlQuery: ORDERS,
        singular: "order",
        plural: "orders"
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


    const orders = getList(dataPaginationRes?.data) || [];

    const list = orders.map(({ node }) => {
        return {
            id: node.id,
            factory: node.vendorFactory?.factory.name,
            vendor: node.vendorFactory?.vendor.name,
            status: node.status,
            invoice_proforma: node.invoiceProforma,
            invoice_date: node.invoiceDate,
            created_at: TimeParser(node.createdAt),
        }
    })


    const { url } = match;
    const columns = useMemo(() => generateColumns(url), []);

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px"
                    fromDate={fromDateChange}
                    toDate={toDateChange}
                    changeFrom={setFromDateChange}
                    changeTo={setToDateChange}
                    buttonClicked={handleDateApply}
                />
                <ButtonWithIcon name="Создать заказ" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех заказов"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGenerator(url)}
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default OrderList;