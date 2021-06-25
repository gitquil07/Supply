import moment from "moment";
import { Row, RowGray } from "components/Row";
import { setHeading } from "utils/functions";

export const generateColumns = () => {
    const options = {
        filter: true,
        sort: true
    }

    return [
        {
            name: "id",
            label: "№",
            options: {
                filter: false,
                display: false,
                viewColumns: false
            },
        },
        {
            name: "createdAt",
            label: "Дата создания",
            options: {
                ...options,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "status",
            label: "Статус",
        },
        {
            name: "transportTypeCountDelivery",
            label: "Тип транспортировки / Кол - во\nУсловие доставки",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return <>
                                <Row>{value.transportType} / {value.transportCount}</Row>
                                <RowGray>{value.deliveryCondition}</RowGray>
                            </>
                }
            }
        },
        {
            name: "trackingUser",
            label: "Логист",
            options: options
        },
        {
            name: "invoices",
            label: "инвойсы",
            options: {
                filter: true,
                display: "none",
                viewColumns: false
            }
        },
        {
            name: "transportType",
            label: "Тип транспорта",
            options: {
                filter: true,
                display: "none",
            }
        },
        {
            name: "count",
            label: "Кол-во",
            options: {
                filter: true,
                display: "none"
            }
        },
        {
            name: "deliveryCondition",
            label: "Условия доставки",
            options: {
                filter: true,
                display: "none"
            }
        },
        {
            name: "transportCount",
            label: "Кол-во транспорта",
            options: {
                filter: true,
                display: "none"
            }
        }
    ];

}