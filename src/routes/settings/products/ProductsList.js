import { Helmet } from "react-helmet";
import { useMemo } from "react";

import { PAGINATE_PRODUCTS } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { Pagination } from "../../../components/Pagination";
import { ButtonWithIcon } from "../../../components/Buttons";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { usePagination } from "../../../hooks";
import { CustomRowGenerator, getList } from "../../../utils/functions";

const ProductsList = ({ match }) => {

    const title = useTitle("Продукты");

    const {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        dataPaginationRes
    } = usePagination({
        qraphQlQuery: PAGINATE_PRODUCTS,
        singular: "product",
        plural: "products"
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

    const products = getList(dataPaginationRes?.data) || [];

    const list = products.map(({ node }) => {
        return {
            id: node.id,
            name: node.name,
            group: node.group?.name,
            measure: node.measure,
            codeTnved: node.codeTnved,
            typeOfPackaging: node.typeOfPackaging
        }
    })

    const { url } = match;
    const columns = useMemo(() => generateColumns(url), []);

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                {/* <DatePickers mR="15px" /> */}
                <ButtonWithIcon name="Создать продукт" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех продуктов"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGenerator(url)}
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default ProductsList;