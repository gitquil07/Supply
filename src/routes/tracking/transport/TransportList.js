import { useQuery } from "@apollo/client";
import { GET_TRACKING_TRASNPORTS } from "./gql";
import { find, propEq } from "ramda";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useDateRange, useTitle } from "../../../hooks";
import { setTitleWithDateRange } from "../../../utils/functions";

import DatePickers from "../../../components/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";


const TrackingTransportList = ({ match }) => {

    const {
        fromDate,
        setFromDate,
        toDate,
        setToDate
    } = useDateRange();

    const title = useTitle("Слежение");

    const { data } = useQuery(GET_TRACKING_TRASNPORTS);

    const list = [];

    const columns = [
        {
            name: "public_id",
            label: "Номер слежки",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list)
                    return (
                        <Link to={`${match.url}/create/${id?.id}`}>
                            {value}
                        </Link>
                    );

                }
            }
        },
        {
            name: "vendor",
            label: "Поставщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "locations",
            label: "Место нахождений",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "transport_number",
            label: "Номер транспорта",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "created_at",
            label: "Дата создания заявки",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "tr_date",
            label: "Дата поставки",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "amount",
            label: "Сумма транспортировки",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    const handleDateRangeChange = () => {}

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <DatePickers
                fromDate={fromDate}
                toDate={toDate}
                changeFrom={setFromDate}
                changeTo={setToDate}
                buttonClicked={handleDateRangeChange}
            />
            <CustomMUIDataTable
                title={setTitleWithDateRange("слежение", fromDate, toDate)}
                columns={columns}
                data={list}
            />
        </>
    );
}

export default TrackingTransportList;