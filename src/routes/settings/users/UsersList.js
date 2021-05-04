import { Helmet } from "react-helmet";
import { useLazyQuery } from "@apollo/client";

import { GET_USERS } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";
import UserCreate from "./UserCreate";
import { useState, useEffect, useMemo } from "react";

const UsersList = ({ match }) => {
    const title = useTitle("Пользователи");
    const [createOpen, setCreateOpen] = useState(false);
    const [id, setId] = useState(undefined);
    
    const [getUsers, { data }] = useLazyQuery(GET_USERS);

    useEffect(() => {
        getUsers();
    }, []);
    
    const list = data?.account?.users?.edges?.map(({ node }) => {
        return {
            id: node.id,
            pk: node.pk,
            firstName: node.firstName,
            lastName: node.lastName,
            username: node.username,
            phoneNumber: node.phoneNumber,
            role: node.role?.displayName,
            email: node?.email,
            password: node?.password,
            factories: (typeof node.pk === "object")? node.pk : [node.pk]
        }
    })


    const user = list?.find(user => user.id === id);

    const editEntry = (id) => {
        setId(id);
        setCreateOpen(true);
    }

    const close = () => {
        setId(undefined);
        setCreateOpen(false);
    }

    const columns = useMemo(() => generateColumns(editEntry), [data]);

    return (
        <>
            <UserCreate isOpen={createOpen} close={close} entry={user} />
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