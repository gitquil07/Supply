import { GET_TRACKING_CLIENTS } from "./gql";
import { useDateRange, useTitle } from "../../../hooks";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import DatePickers from "../../../components/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { ButtonWithIcon } from "../../../components/Buttons";

const ClientList = ({match}) => {
    
    const {
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        handleDateRangeChange,
        data,
        error
    } = useDateRange(GET_TRACKING_CLIENTS);

    const title = useTitle("Транспортные компаии");
    

    const list = [];

    const columns = [
        {
            name: "id",
            label: "№",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name",
            label: "Имя",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "created_at",
            label: "Создано",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "role",
            label: "Тип",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phone_number",
            label: "Номер телефона",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "city",
            label: "Откуда",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "load_city",
            label: "Куда",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header>
                <DatePickers 
                    mR="15px"
                    fromDate={fromDate}
                    toDate={toDate}
                    changeFrom={setFromDate}
                    changeTo={setToDate}
                    buttonClicked={handleDateRangeChange}
                />
                <ButtonWithIcon name="Создать" url={`${match.url}/create`}  />
            </Header>
            <CustomMUIDataTable
                title="Список трансрортных компаний"
                data={list}
                columns={columns}
            />
        </>
    );
}

export default ClientList;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;