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

    const applications = getList(dataPaginationRes?.data) || [];
    const { one, setUniqueVal } = useGetOne(applications, "id");
    const list = applications.map(({ node }) => {
        return {
            ...node,
            publicId: node.id,
            vendor: { vendor: node.vendor?.name, trNumber: node.transportNumber },
            amount: `${node.amount} ${node.currency} ${node.brutto} / ${node.netto}`,
        }
    });

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
                {/* <ButtonWithIcon name="создать слежение" url={`${match.url}/create`}/> */}
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список слежений"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGeneratorForModal(openDialog)}
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