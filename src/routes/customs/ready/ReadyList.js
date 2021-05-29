import { Helmet } from 'react-helmet';
import { useTitle } from '../../../hooks';
import DatePickers from '../../../components/Inputs/DatePickers';
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { READY_CUSTOMS } from './gql';
import { generateColumns } from './TableData';
import { useMemo } from 'react';
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import { Pagination } from '../../../components/Pagination';
import { usePagination, useToggleDialog, useGetOne } from "../../../hooks";
import { getList } from "../../../utils/functions";
import { modes } from "utils/static"; 
import SmallDialog from "components/SmallDialog";
import { DetailedInfo } from "components/DetailedInfo";


const ReadyList = () => {
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
        qraphQlQuery: READY_CUSTOMS,
        singular: "custom",
        plural: "customs"
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

    const customs = getList(dataPaginationRes?.data) || [];
    const {one, setUniqueVal} = useGetOne(customs, "id");
    const list = useMemo(() => customs.map(({ node }) => {
        return {
            publicId: {publicId: node.publicId, id: node.id},
            createdAt: node.createdAt,
            vendorFactory: node.invoice?.application?.orders?.edges?.map(({node}) => {
                return node.vendorFactory.factory.name + " / " + node.vendorFactory.vendor.name 
            }),
            trTypeAndMode: node.invoice?.application?.transportType?.name + " / " +  modes.find(mode => mode.value == node.mode).label,
            invoices: {declarant: node.declarantNote, contractor: node.contractorNote}
        }
    }), [customs]);

    const openDialog = (id) => {
        setUniqueVal(id);
        handleOpen();
    }

    const columns = useMemo(() => generateColumns(openDialog), []);

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
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список таможен (готовые к офрмлению)"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
            />
            <SmallDialog title={`Заявка ${one?.node?.publicId}`} close={handleClose} isOpen={open}>
                {
                    one && <DetailedInfo>
                        <fieldset>
                            <legend>Режим: </legend>
                            <span>{one.node.mode}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Примечания декларанта: </legend>
                            <span>{one.node.declarantNote}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Примечания контрактора: </legend>
                            <span>{one.node.declarantNote}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Создан : </legend>
                            <span>{one.node.createdAt}</span>
                        </fieldset>
                    </DetailedInfo>
                }
            </SmallDialog>
            <Pagination {...paginationParams} />
        </>
    );
};

export default ReadyList;
