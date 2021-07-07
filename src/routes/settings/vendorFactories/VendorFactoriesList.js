import { Helmet } from "react-helmet";
import { useMemo } from "react";

import { PAGINATE_VENDOR_FACTORIES } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { Pagination } from "../../../components/Pagination";
import { ButtonWithIcon } from "../../../components/Buttons";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { CustomRowGenerator, exceptKey } from "../../../utils/functions";
import { usePagination } from "../../../hooks";
import { getList, cutTextLength } from "../../../utils/functions";

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

    const vendorFactories = useMemo(() => getList(dataPaginationRes?.data), [dataPaginationRes?.data]) || [];
    const list = useMemo(() => vendorFactories.map(({ node }) => {
        return {
            ...exceptKey(node, ["__typename"]),
            vendor: cutTextLength(node.vendor?.companyName),
            factory: node.factory?.name,
        }
    }), [vendorFactories]);

    const { url } = match;
    const columns = useMemo(() => generateColumns(url), []);

    const searchableFields = [
        "factory",
        "vendor",
        "paymentCondition",
        "isActive",
        "partnerStartDate"
    ];

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                <ButtonWithIcon name="Создать поставщика" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех поставщиков"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGenerator(url)}
                loading={dataPaginationRes.loading}
                {
                    ...{ searchableFields }
                }
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default VendorFactoriesList;