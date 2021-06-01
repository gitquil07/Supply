import moment from "moment";
import { Row } from "components/Row";

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
            name: "vendorFactoryProduct",
            label: "Завод / Поставщик ",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <>
                            {value.factory} / {value.vendor}
                            <Row>{ value.product }</Row>
                        </>
                    )
                }
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
            name: "deliveryAndProductionDayCount",
            label: "Дни изгот. / Дни дост.",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return(
                        <>
                            {value.deliveryDayCount} дн. / {value.productionDayCount} дн.
                            <Row>{value.price} / {value.measure}</Row>
                        </>
                    );
                }
            }
        }
    ];
}