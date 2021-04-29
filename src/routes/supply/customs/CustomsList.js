import { Helmet } from 'react-helmet';
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { useTitle } from '../../../hooks';
import DatePickers from '../../../components/Inputs/DatePickers';
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { GET_APPLICATIONS } from './gql';
import { generateColumns } from './TableData';
import { useMemo } from 'react';
import { Pagination } from '../../../components/Pagination';

const CustomsList = ({ match }) => {

    const { data } = useQuery(GET_APPLICATIONS);

    const title = useTitle("Таможня");

    const list = data?.application.applications.edges.map(({ node }) => {
        return {
            public_id: node.public_id
        }
    });

    const { url } = match;
    const columns = useMemo(() => generateColumns(url, list), [list, url]);

    return (
        <>
            <Helmet title={title} />
            <Header>
                <DatePickers />
            </Header>
            <CustomMUIDataTable
                title={"Список заявок"}
                list={list}
                columns={columns}
            />
            <Pagination />
        </>
    );
};

export default CustomsList;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;