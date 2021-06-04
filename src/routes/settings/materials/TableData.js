import moment from "moment";
import { Row, RowGray } from "components/Row";
import { setHeading } from "utils/functions";

export const generateColumns = (url) => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                display: "none"
            }
        },
        {
            name: "createdAt",
            label: "Дата создания:",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "vendorFactoryProduct",
            label: "Завод / Поставщик\nПродукт",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: (value) => {
                    return (
                        <>
                            <Row>{value.factory} / {value.vendor}</Row>
                            <RowGray>{ value.product }</RowGray>
                        </>
                    )
                }
            }
        },
        {
            name: "deliveryAndProductionDayCount",
            label: "Дни изгот. / Дни дост.\nЦена / Ед.Изм.",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: (value) => {
                    return(
                        <>
                            <Row>{value.deliveryDayCount} дн. / {value.productionDayCount} дн.</Row>
                            <RowGray>{value.price} / {value.measure}</RowGray>
                        </>
                    );
                }
            }
        }
    ];
}