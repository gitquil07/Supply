import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/client";

import { GET_USERS } from "./gql";
import { columns } from "./TableData";
import { useTitle } from "../../../hooks";
import MaterialsCreate from "./MaterialsCreate";
import { FlexForHeader } from "../../../components/Flex";
import { Pagination } from "../../../components/Pagination";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";

const MaterialsList = ({ match }) => {
    const title = useTitle("Материалы");
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
            <MaterialsCreate isOpen={createOpen} close={() => setCreateOpen(false)} />
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

export default MaterialsList;