import { Helmet } from "react-helmet";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import { generateColumns } from "./TableData";
import { PAGINATE_TRANSPORT_TYPES } from "./gql.js";
import TransportCreate from "./TransportCreate";
import { useTitle, usePagination } from "../../../hooks";
import { CustomRowGenerator, CustomRowGeneratorForModal, getList } from "../../../utils/functions";
import { useState, useMemo } from "react";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";

const TransportList = () => {
    const title = useTitle("Типы транспорта"),
        [createOpen, setCreateOpen] = useState(false),
        [id, setId] = useState(undefined);

    const {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        dataPaginationRes,
        setMutateState,
        setIsFirstPage
    } = usePagination({
        qraphQlQuery: PAGINATE_TRANSPORT_TYPES,
        singular: "transport",
        plural: "transportTypes"
    });

    const paginationParams = {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage
    }

    const transportTypes = getList(dataPaginationRes?.data) || [];
    const list = useMemo(() => {
            return transportTypes.map(({node}) => {
                return {
                    id: node.id,
                    pk: node.pk,
                    name: node.name,
                    customsDayCount: node.customsDayCount
                }
            });
        }, [transportTypes]
    );

    const transportType = list.find(transportType => transportType.id === id);

    const editEntry = (id) => {
        setId(id);
        setCreateOpen(true);
    }

    const close = () => {
        setId(undefined);
        setCreateOpen(false);
    }

    const columns = useMemo(() => generateColumns(editEntry), []);

    const searchableFields = [
        "name"
    ];

    return (
        <>
            <TransportCreate isOpen={createOpen} close={close} entry={transportType}
                setMutateState={setMutateState} getEntries={getDataPagination} setIsFirstPage={setIsFirstPage} amountOfElemsPerPage={amountOfElemsPerPage} paginatingState={paginatingState} />
            <Helmet title={title} />
            <FlexForHeader>
                <ButtonWithIcon name="Создать тип транспорта" clicked={() => setCreateOpen(true)} url="#" />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех типов транспорта"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGeneratorForModal(editEntry)}
                {
                    ...{ searchableFields }
                }
            />
            <Pagination {...paginationParams} />
        </>
    );

}

export default TransportList;