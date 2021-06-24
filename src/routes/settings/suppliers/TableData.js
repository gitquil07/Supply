import { Row, RowGray } from "components/Row";
import moment from "moment";
import { setHeading } from "utils/functions";


const options = {
     options: {
        filter: true,
        display: "excluded"
     }
}

export const generateColumns = (url) => {
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
            label: "Дата создания",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "contactPersonVendorPhone",
            label: "Контактное лицо / Поставщик\nНомер телефона",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return (
                        <>
                            <Row>
                                {value.contactPerson} / {value.vendor}
                            </Row>
                            <RowGray>
                                {value.phoneNumber}
                            </RowGray>
                        </>
                    );
                }
            }
        },
        {
            name: "address",
            label: "Страна / Город\nУлица / Дом",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return (
                        <>
                            <Row>
                                {value.country} / {value.city}
                            </Row>
                            <RowGray>
                                {value.street} / {value.house}
                            </RowGray>
                        </>
                    );
                }
            }
        },
        {
            name: "contactPerson",
            label: "Контактное лицо",
            ...options
        },
        {
            name: "vendor",
            label: "Поставщик",
            ...options
        },
        {
            name: "phoneNumber",
            label: "Тел. номер",
            ...options
        },
        {
            name: "country",
            label: "Страна",
            ...options
        },
        {
            name: "city",
            label: "Город",
            ...options
        },
        {
            name: "street",
            label: "Улица",
            ...options
        },
        {
            name: "house",
            label: "Дом",
            ...options
        }
    ];
}