import { Helmet } from "react-helmet";
import { useLazyQuery } from "@apollo/client";

import { GET_VENDORS } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";
import { useEffect, useMemo } from "react";
import SuppliersCreate from "./SuppliersCreate";

const SuppliersList = ({ match }) => {
    const title = useTitle("Поставщики");
    const [ getVendors, { data }] = useLazyQuery(GET_VENDORS);

    useEffect(() => {
        getVendors();
    }, []);

    const list = data?.vendor?.vendors?.edges?.map(({ node }) => {
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
    const columns = useMemo(() => generateColumns(url) , [data]);

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать поставщика" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех сотрудников"}
                data={list}
                columns={columns}
            />
            <Pagination />
        </>
    );
};

export default SuppliersList;