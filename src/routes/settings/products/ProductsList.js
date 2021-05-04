import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";

import { GET_PRODUCTS } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { Pagination } from "../../../components/Pagination";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";

const ProductsList = ({ match }) => {

    const title = useTitle("Продукты");
    const [getProducts,  { data }] = useLazyQuery(GET_PRODUCTS);

    useEffect(() => {
        getProducts();
    }, []);

    const list = data?.product?.products?.edges?.map(({node}) => {
        return {
            id: node.id,
            name: node.name,
            group: node.group.name,
            measure: node.measure,
            codeTnved: node.codeTnved,
            typeOfPackaging: node.typeOfPackaging
        }
    })

    const {url} = match;
    const columns = useMemo(() => generateColumns(url), [data]);

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать продукт" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех продуктов"}
                data={list}
                columns={columns}
            />
            <Pagination />
        </>
    );
};

export default ProductsList;