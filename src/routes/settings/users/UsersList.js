import styled from "styled-components";
import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";
import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { columns } from "./TableData";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./Queries";

const UsersList = () => {
    const { data } = useQuery(GET_USERS);

    const options = {
        // filterType: 'checkbox',
    };

    const list = data?.account?.users?.edges.map(({ node }) => {
        return {
            first_name: node.firstName,
            last_name: node.lastName,
            username: node.username,
            phone_number: node.phoneNumber,
            role: node.role?.displayName,
            // factories: factories?.map((factory) => {
            //     let factoryJoined = []
            //     factoryJoined.push(factory?.name)
            //     return factoryJoined + (', ')
            // }),
            // id,
        }
    })

    return (
        <>
            <Header>
                <Title name="Пользователи" />
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

export default UsersList;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;