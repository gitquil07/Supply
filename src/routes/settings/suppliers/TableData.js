import { Row, RowGray } from "components/Row";
import moment from "moment";
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
                filter: true,
                sort: true,
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
                filter: true,
                sort: true,
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
    ];
}