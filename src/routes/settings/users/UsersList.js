import { Title } from "../../../components/Title";
import { Button } from "../../../components/Buttons";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { columns } from "./TableData";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./gql";
import { CustomHeader } from "../../../components/CustomHeader";

const UsersList = () => {
    const { data } = useQuery(GET_USERS);

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
            <CustomHeader>
                <Title name="Пользователи" />
                <Button name="Создать пользователя" url="/settings/users/create" />
            </CustomHeader>
            <CustomMUIDataTable
                title={"Список всех сотрудников"}
                data={list}
                columns={columns}
            />
        </>
    );
};

export default UsersList;