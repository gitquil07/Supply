import { find, propEq } from 'ramda';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import { useTitle } from '../../../hooks';
import { TimeParser } from "../../../utils/functions";
import DatePickers from '../../../components/Inputs/DatePickers';
import { ButtonWithIcon } from "../../../components/Buttons";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { GET_APPLICATIONS } from './gql';

const ApplicationList = ({ match }) => {

    const { data } = useQuery(GET_APPLICATIONS);

    console.log(data);

    const title = useTitle("Заявки На Транспорт");

    const list = data?.application.applications.edges.map(({ node }) => {
        return {
            public_id: node.public_id,
            // vendor_factory: vendor_factory?.factory?.name + ' / ' + vendor_factory?.vendor?.company_name,
            // status,
            // created_at: moment(created_at).format('YYYY-MM-DD'),
            // updated_at: moment(updated_at).format('YYYY-MM-DD')
        }
    })

    const columns = [
        {
            name: "public_id",
            label: "Номер заказа",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list)
                    return (
                        <Link to={`${match.url}/${id?.id}`}>
                            {value}
                        </Link>
                    );

                }
            }
        },
        {
            name: "vendor_factory",
            label: "Название Завода / Поставщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "status",
            label: "Статус",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "created_at",
            label: "Дата создания заказа",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "updated_at",
            label: "Дата поставки",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];


    return (
        <>
            <Helmet title={title} />
            <Header>
                <DatePickers mR="15px" />
                <ButtonWithIcon name="Создать заказ" url={`${match.url}/create`} />
            </Header>
            <CustomMUIDataTable
                title={"Заказы на поставку с 2021-04-01 по 2021-04-24"}
                list={list}
                columns={columns}
            />
        </>
    );
};

export default ApplicationList;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;