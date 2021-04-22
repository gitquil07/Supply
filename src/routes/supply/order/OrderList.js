import { useEffect } from 'react';
import { find, propEq } from 'ramda';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { GET_ORDERS } from "./gql";
import { ButtonWithIcon } from "../../../components/Buttons";
import { TimeParser } from "../../../utils/functions";
import DatePickers from '../../../components/DatePickers';
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";

const OrderList = ({ match }) => {


    const dispatch = useDispatch();
    const { data } = useQuery(GET_ORDERS);

    useEffect(() => {
        dispatch({ type: "CHANGE_TITLE", payload: "Заказы" })
    }, [dispatch])



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
            <Helmet>
                <title>Заказы</title>
            </Helmet>
            <Header>
                <DatePickers />
                <ButtonWithIcon name="Создать заказ" />
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