import { Helmet } from "react-helmet";
import { PAGINATE_FACTORIES } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";
import { useState, useMemo } from "react";
import FactoryCreate from "./FactoryCreate";
import { usePagination } from "../../../hooks";
import { getList } from "../../../utils/functions";

const FactoryList = () => {
    const title = useTitle("Заводы");
    const [createOpen, setCreateOpen] = useState(false);
    const [id, setId] = useState(undefined);

    const {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        dataPaginationRes,
        setMutateState
    } = usePagination({
        qraphQlQuery: PAGINATE_FACTORIES,
        singular: "factory", 
        plural: "factories"
    });


    const paginationParams = {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
    }


    const factories = getList(dataPaginationRes?.data) || [];

    const list = useMemo(() => {
        return factories?.map(({ node }) => {
            return {
                id: node.id,
                pk: node.pk,
                code: node.code,
                name: node.name,
                officialName: node.officialName,
                position: node.position,
                createdAt: node.createdAt
            }
        });
    }, [factories]);


    const factory = list?.find(factory => factory.id === id);

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
            <FactoryCreate isOpen={createOpen} close={close} entry={factory} 
                           setMutateState={setMutateState}  getEntries={getDataPagination} amountOfElemsPerPage={amountOfElemsPerPage} paginatingState={paginatingState} />
            <Helmet title={title} />
            <FlexForHeader>
                <ButtonWithIcon name="Создать завод" clicked={() => setCreateOpen(true)} url="#" />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех заводов"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
            />
            <Pagination {...paginationParams}/>
        </>
    );
};

export default FactoryList;