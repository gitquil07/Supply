import { Helmet } from 'react-helmet';
import { useTitle } from 'hooks';
import DatePickers from 'components/Inputs/DatePickers';
import { CustomMUIDataTable } from "components/CustomMUIDataTable";
import { CUSTOMS } from './gql';
import { generateColumns } from './TableData';
import { useMemo } from 'react';
import { FlexForHeader } from "components/Flex";
import { ButtonWithIcon } from "components/Buttons";
import { Pagination } from 'components/Pagination';
import { usePagination } from "hooks";
import { getList } from "utils/functions";
import { modes } from "utils/static"; 


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
        return {
            publicId: {publicId: node.publicId, id: node.id},
            createdAt: node.createdAt,
            vendorFactory: node.invoice?.application?.orders?.edges?.map(({node}) => {
                return node.vendorFactory.factory.name + " / " + node.vendorFactory.vendor.name 
            }),
            trTypeAndMode: node.invoice?.application?.transportType?.name + " / " +  modes.find(mode => mode.value == node.mode)?.label,
            invoices: {declarant: node.declarantNote, contractor: node.contractorNote}
        }
    }), [applications]);

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
                <ButtonWithIcon name="создать таможню" url={`${match.url}/create`}/>
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список новых таможен"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default NewList;
