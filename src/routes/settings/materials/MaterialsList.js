import { useMemo } from "react";
import { Helmet } from "react-helmet";

import { PAGINATE_VENDOR_PRODUCTS } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { Pagination } from "../../../components/Pagination";
import { ButtonWithIcon } from "../../../components/Buttons";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { exceptKey } from "../../../utils/functions";
import { usePagination } from "../../../hooks";
import { getList } from "../../../utils/functions";


const MaterialsList = ({ match }) => {
    const title = useTitle("Материалы");
 
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
        qraphQlQuery: PAGINATE_VENDOR_PRODUCTS, 
        singular: "vendor", 
        plural: "vendorProducts"
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


    const vendorProducts = getList(dataPaginationRes?.data) || [];
    const list = vendorProducts.map(({node}) => {
        const obj = exceptKey(node, ["__typename", "vendorFactory", "product", "productionDayCount", "deliveryDayCount"]);
        return {
            ...obj,
            vendorFactoryProduct: {factory: node.vendorFactory?.factory?.name, vendor: node.vendorFactory?.vendor?.name, product: node.product?.name},  
            deliveryAndProductionDayCount: {deliveryDayCount: node.deliveryDayCount,  productionDayCount: node.productionDayCount, price: node.price,  measure: node.product.measure}

        }
    });


    const { url } = match;
    const columns =  useMemo(() => generateColumns(url), [])

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                {/* <DatePickers mR="15px" /> */}
                <ButtonWithIcon name="Создать материал" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех материалов"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
            />
             <Pagination {...paginationParams}/>
        </>
    );
};

export default MaterialsList;