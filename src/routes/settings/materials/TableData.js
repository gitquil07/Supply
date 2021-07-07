import moment from "moment";
import { Row, RowGray } from "components/Row";
import { setHeading } from "utils/functions";

const options =  {
    options: {
        filter: true,
        display: "none"
    }
}

export const generateColumns = () => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
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
                filter: false,
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
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: (value) => {
                    return(
                        <>
                            <Row>{value.deliveryDayCount} дн. / {value.productionDayCount} дн.</Row>
                            <RowGray>{value.price} / {value.currency}</RowGray>
                        </>
                    );
                }
            }
        },
        {
            name: "factory",
            label: "Завод",
            ...options
        },
        {
            name: "vendor",
            label: "Почставщик",
            ...options
        },
        {
            name: "product",
            label: "Продукт",
            ...options
        },
        {
            name: "productionDayCount",
            label: "Срок изготовления",
            ...options
        },
        {
            name: "deliveryDayCount",
            label: "Срок доставки",
            ...options
        },
        {
            name: "price",
            label: "Цена",
            ...options
        },
        {
            name: "currency",
            label: "Валюта",
            ...options
        }
    ];
}