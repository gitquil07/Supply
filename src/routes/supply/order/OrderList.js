import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";
import styled from "styled-components";
import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { columns } from "./TableData";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "./gql";
import { TimeParser } from "../../../utils/functions";

const OrderList = () => {

    const { data } = useQuery(GET_ORDERS);

    const options = {
        filterType: 'checkbox',
    };

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


    return (
        <>
            <Header>
                <Title name="Заказы" />
                <Button name="Создать пользователя" url="/settings/users/create" />
            </Header>
            <StyledMUIDataTable
                title={"Список всех сотрудников"}
                data={list}
                columns={columns}
                options={options}
            />
        </>
    );
};

export default OrderList;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    height: 70px;

    background: #FFFFFF;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 0 10px;
`;