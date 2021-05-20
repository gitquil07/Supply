import { Helmet } from "react-helmet";
import { useMemo } from "react";

import { PAGINATE_VENDOR_FACTORIES } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { Pagination } from "../../../components/Pagination";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { exceptKey } from "../../../utils/functions";
import { usePagination } from "../../../hooks";
import { getList } from "../../../utils/functions";

const VendorFactoriesList = ({ match }) => {

    const title = useTitle("Поставщики");
    
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
        qraphQlQuery: PAGINATE_VENDOR_FACTORIES,
        singular: "vendor", 
        plural: "vendorFactories"
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

    const vendorFactories = getList(dataPaginationRes?.data) || [];
    const list = vendorFactories.map(({node}) => {
        const obj = exceptKey(node, ["__typename"]);
        return {
            ...obj,
            vendor: node.vendor?.name,
            factory: node.factory?.name
        }
    })

    const {url} = match;
    const columns = useMemo(() => generateColumns(url), []);

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать поставщика" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех поставщиков"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default VendorFactoriesList;