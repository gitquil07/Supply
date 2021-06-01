import { Row } from "components/Row";

export const generateColumns = (callback) => {
    const options = {
        filter: true,
        sort: false
    }

    return [
        {
            name: "publicId",
            label: "№",
            options: {
                display: "none"
            },
        },
        {
            name: "createdAt",
            label: "Дата создаия",
            options,
        },
        {
            name: "vendorFactory",
            label: "Название завода / Поставщик",
            options: {
                customBodyRender: value => {
                    if (typeof value === "object") {
                        return (
                            <>
                                {
                                    value.map(v => <Row>{v}</Row>)
                                }
                            </>
                        );
                    }
                }

            }
        },
        {
            name: "trTypeAndMode",
            label: "Тип транспорта / Статус",
            options,
        },
        {
            name: "invoices",
            label: "Инвойсы",
            options: {
                customBodyRender: value => {
                    console.log("invoices", value);
                    if (typeof value === "object") {
                        return (
                            <>
                                <Row>Декларант: {value.declarant}</Row>
                                <Row>Контрактор: {value.contractor}</Row>
                            </>
                        )
                    }
                }
            }
        }
    ];
}
