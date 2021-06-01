import { Helmet } from "react-helmet";

import { PAGINATE_VENDORS } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";
import { useMemo } from "react";
import { usePagination } from "../../../hooks";
import { CustomRowGenerator, getList } from "../../../utils/functions";

const SuppliersList = ({ match }) => {
    const title = useTitle("Партнеры");

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
        qraphQlQuery: PAGINATE_VENDORS,
        singular: "vendor",
        plural: "vendors"
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

    const vendors = getList(dataPaginationRes?.data) || [];
    const list = vendors.map(({ node }) => {
        return {
            id: node.id,
            name: node.name,
            companyName: node.companyName,
            sapCountry: node.sapCountry?.name,
            sapAccountGroup: node.sapAccountGroup?.name,
            phoneNumber: node.phoneNumber,
            street: node.street,
            house: node.house,
            postcode: node.postcode,
            sapOkonkh: node.sapOkonkh,
            sapCity: node.sapCity
        }
    });

    const { url } = match;
    const columns = useMemo(() => generateColumns(url), []);

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                <ButtonWithIcon name="Создать партнера" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех партнеров"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGenerator(url)}
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default SuppliersList;