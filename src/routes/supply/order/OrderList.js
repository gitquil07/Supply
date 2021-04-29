import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "./gql";
import { useTitle } from '../../../hooks';
import { generateColumns } from './TableData';
import { TimeParser } from "../../../utils/functions";
import { FlexForHeader } from '../../../components/Flex';
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from '../../../components/Inputs/DatePickers';
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";

const OrderList = ({ match }) => {

    const { data } = useQuery(GET_ORDERS);

    const title = useTitle("Заказы");

    const list = data?.order.orders.edges.map(({ node }) => {
        return {
            public_id: node.publicId,
            factory: node.vendorFactory?.factory.name,
            vendor: node.vendorFactory?.vendor.name,
            status: node.status,
            invoice_proforma: node.invoiceProforma,
            invoice_date: node.invoiceDate,
            created_at: TimeParser(node.createdAt),
        }
    })


    const { url } = match;
    const columns = useMemo(() => generateColumns(url, list), [list, url]);

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать заказ" url={`${match.url}/create`} />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех сотрудников"}
                data={list}
                columns={columns}
            />
        </>
    );
};

export default OrderList;