import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/client";

import { GET_USERS } from "./gql";
import { columns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";
import UserCreate from "./UserCreate";
import { useState } from "react";

const UsersList = ({ match }) => {
    const title = useTitle("Пользователи");
    const [createOpen, setCreateOpen] = useState(false);
    const { data } = useQuery(GET_USERS);

    const list = data?.account?.users?.edges.map(({ node }) => {
        return {
            first_name: node.firstName,
            last_name: node.lastName,
            username: node.username,
            phone_number: node.phoneNumber,
            role: node.role?.displayName,
        }
    })

    return (
        <>
            <UserCreate isOpen={createOpen} close={() => setCreateOpen(false)} />
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать пользователя" clicked={() => setCreateOpen(true)} url="#" />
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

export default UsersList;