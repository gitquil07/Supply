import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/client";

import { GET_FACTORIES } from "./gql";
import { columns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";
import { useState } from "react";
import FactoryCreate from "./FactoryCreate";

const FactoryList = ({ match }) => {
    const title = useTitle("Заводы");
    const [createOpen, setCreateOpen] = useState(false);
    const { data } = useQuery(GET_FACTORIES);

    const list = data?.factory?.factories?.edges.map(({ node }) => {
        return {
            code: node.code,
            created_at: node.createdAt,
            name: node.name
        }
    });

    console.log(data)

    return (
        <>
            <FactoryCreate isOpen={createOpen} close={() => setCreateOpen(false)} />
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

export default FactoryList;