import { Helmet } from "react-helmet";
import { useLazyQuery } from "@apollo/client";

import { GET_FACTORIES } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";
import { useState, useEffect, useMemo } from "react";
import FactoryCreate from "./FactoryCreate";

const FactoryList = ({ match }) => {
    const title = useTitle("Заводы");
    const [createOpen, setCreateOpen] = useState(false);
    const [id, setId] = useState(undefined);

    const [ getfactories , { data }] = useLazyQuery(GET_FACTORIES);

    useEffect(() => {
        getfactories();
    }, []);

    const list = data?.factory?.factories?.edges.map(({ node }) => {
        return {
            id: node.id,
            pk: node.pk,
            code: node.code,
            name: node.name,
            officialName: node.officialName,
            position: node.position,
            createdAt: node.createdAt
        }
    });

    console.log("factory length", data?.factory?.factories?.edges?.length);

    const factory = list?.find(factory => factory.id === id);

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
            <FactoryCreate isOpen={createOpen} close={close} entry={factory} />
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать завод" clicked={() => setCreateOpen(true)} url="#" />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех заводов"}
                data={list}
                columns={columns}
            />
            <Pagination />
        </>
    );
};

export default FactoryList;