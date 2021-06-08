import { Helmet } from "react-helmet";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import { generateColumns } from "./TableData";
import { PAGINATE_FIRMS } from "./gql.js";
import FirmCreate from "./FirmCreate";
import { useTitle, usePagination } from "../../../hooks";
import { CustomRowGeneratorForModal, getList } from "../../../utils/functions";
import { useState, useMemo } from "react";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";

const FirmsList = () => {
    const title = useTitle("Фирмы"),
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
        qraphQlQuery: PAGINATE_FIRMS,
        singular: "factory",
        plural: "firms"
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

    const firms = getList(dataPaginationRes?.data) || [];

    const list = useMemo(() => {
        return firms.map(({ node }) => {
            return {
                id: node.id,
                pk: node.pk,
                name: node.name,
                inn: node.inn,
                factories: node.factories.edges.map(({ node }) => <p style={{ margin: "5px" }}>{node.name}</p>)
            }
        });
    }, [firms])

    const firm = list.find(firm => firm.id === id);

    console.log(list)

    const editEntry = (id) => {
        setId(id);
        setCreateOpen(true);
    }

    const close = () => {
        setId(undefined);
        setCreateOpen(false);
    }

    const columns = useMemo(() => generateColumns(editEntry), []);

    return (
        <>
            <FirmCreate isOpen={createOpen} close={close} entry={firm}
                setMutateState={setMutateState} getEntries={getDataPagination} setIsFirstPage={setIsFirstPage} amountOfElemsPerPage={amountOfElemsPerPage} paginatingState={paginatingState} />
            <Helmet title={title} />
            <FlexForHeader>
                <ButtonWithIcon name="Создать фирму" clicked={() => setCreateOpen(true)} url="#" />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех фирм"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGeneratorForModal(editEntry)}
            />
            <Pagination {...paginationParams} />
        </>
    );

}

export default FirmsList;