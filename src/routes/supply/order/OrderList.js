import { find, propEq } from 'ramda';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "./gql";
import { useTitle } from '../../../hooks';
import { TimeParser } from "../../../utils/functions";
import DatePickers from '../../../components/Inputs/DatePickers';
import { ButtonWithIcon } from "../../../components/Buttons";
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

    const columns = [
        {
            name: "public_id",
            label: "Номер заказа",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    const id = find(propEq("public_id", value))(list);
                    return (
                        <Link to={`${match.url}/detail/${id.public_id}`}>
                            {value}
                        </Link>
                    );

                }
            }
        },
        {
            name: "factory",
            label: "Название Завода",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "vendor",
            label: "Поставщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "status",
            label: "Статус",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "invoice_proforma",
            label: "Invoice Proforma",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "invoice_date",
            label: "Invoice Date",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "created_at",
            label: "Дата создания заказа",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];


    return (
        <>
            <Helmet title={title} />
            <Header>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать заказ" url={`${match.url}/create`} />
            </Header>
            <CustomMUIDataTable
                title={"Список всех сотрудников"}
                data={list}
                columns={columns}
            />
        </>
    );
};

export default OrderList;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;