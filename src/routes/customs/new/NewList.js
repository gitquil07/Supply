import { Helmet } from 'react-helmet';
import { useTitle } from 'hooks';
import DatePickers from 'components/Inputs/DatePickers';
import { CustomMUIDataTable } from "components/CustomMUIDataTable";
import { CUSTOMS, CUSTOM_FILE_CREATE, GET_CUSTOM_TEMPLATE } from './gql';
import { generateColumns } from './TableData';
import { useMemo } from 'react';
import { Pagination } from 'components/Pagination';
import { usePagination } from "hooks";
import { CustomRowGenerator, getList } from "utils/functions";
import { modes } from "utils/static";
import { BulkUpload } from "components/BulkUpload";
import styled from "styled-components";


const NewList = ({ match }) => {
    const title = useTitle("Таможня");
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
        qraphQlQuery: CUSTOMS,
        singular: "application",
        plural: "applications"
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

    const applications = getList(dataPaginationRes?.data) || [];
    const list = useMemo(() => applications.map(({ node }) => {
        
        const fCols = {
            factories: node.invoice?.application?.orders?.edges?.map(({node}) => node.vendorFactory?.factory?.name),
            vendors: node.invoice?.application?.orders?.edges?.map(({node}) => node.vendorFactory?.vendor?.companyName),
            transportType: node.invoice?.application?.transportType?.name,
            mode: modes.find(mode => mode.value === node.mode)?.label
        }

        return {
            publicId: node.id,
            createdAt: node.createdAt,
            vendorFactory: {factories: fCols.factories, vendors: fCols.vendors},
            trTypeAndMode: {transportType: fCols.transportType, mode: fCols.mode},
            invoices: { declarant: node.declarantNote, contractor: node.contractorNote },
            ...fCols
        }
        
    }), [applications]);

    const { url } = match;
    const columns = useMemo(() => generateColumns(url), []);

    const searchableFields = [
        "createdAt",
        "transportType",
        "mode",
        "factories",
        "vendors"
    ];

    return (
        <>
            <Helmet title={title} />
            <DatePickers
                fromDate={fromDateChange}
                toDate={toDateChange}
                changeFrom={setFromDateChange}
                changeTo={setToDateChange}
                buttonClicked={handleDateApply}
            />
            <BulkUploadWrapper>
                <BulkUpload 
                    query={GET_CUSTOM_TEMPLATE} 
                    keyName="customsTemplate"
                    message="Данные"
                    mutation={CUSTOM_FILE_CREATE}   
                    withoutSelection={true} 
                />
            </BulkUploadWrapper>
            <CustomMUIDataTable
                title={"Список новых таможен"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGenerator(url)}
                loading={dataPaginationRes.loading}
                heightOffset="715"

                {
                    ...{ searchableFields }
                }
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default NewList;


const BulkUploadWrapper = styled.div`
    margin-bottom:20px;
`;