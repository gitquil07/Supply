import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/client";

import { GET_USERS } from "./gql";
import { columns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { Pagination } from "../../../components/Pagination";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";

const MaterialsList = ({ match }) => {
    const title = useTitle("Материалы");
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
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать материал" url={`${match.url}/create`} />
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