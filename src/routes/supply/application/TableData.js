import moment from "moment";
import { Row, RowGray } from "components/Row";
import { setHeading } from "utils/functions";

export const generateColumns = () => {
    const options = {
        filter: true,
        sort: false
    }

    return [
        {
            name: "id",
            label: "№",
            options: {
                display: "none"
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
            name: "transportTypeCountDelivery",
            label: "Тип транспортировки / Кол - во\nУсловие доставки",
            options: {
                ...options,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return <>
                                <Row>{value.transportType} / {value.transportCount}</Row>
                                <RowGray>{value.deliveryCondition}</RowGray>
                            </>
                }
            }
        },
        // {
        //     name: "typeOfPackaging",
        //     label: "Вид упаковки / Кол-во",
        //     options
        // },
        {
            name: "trackingUser",
            label: "Логист",
            options: options
        }
    ];

}