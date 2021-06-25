import { Row, RowGray } from "components/Row";
import moment from "moment";

export const generateColumns = () => {
    const options = {
        options: {
            filter: true,
            sort: false,
            display: "none",
        }
    }

    return [
        {
            name: "publicId",
            label: "№",
            options: {
                filter: false,
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
            name: "vendorFactory",
            label: "Название завода / Поставщик",
            options: {
                filter: false,
                sort: false,
                customBodyRender: ({factories, vendors}) => {
                    return (
                        <>
                            {
                                factories.map((factory, idx) => 
                                    <Row>{factory} / {vendors[idx]}</Row>    
                                )
                            }
                        </>
                    );
                }

            }
        },
        {
            name: "trTypeAndMode",
            label: "Тип транспорта / Режим",
            options: {
                filter: false,
                sort: false,
                customBodyRender: ({transportType, mode}) => {
                    return <Row>{transportType} / {mode}</Row>
                }
            }
        },
        {
            name: "invoices",
            label: "Инвойсы",
            options: {
                filter: false,
                sort: false,
                customBodyRender: value => {
                    console.log("invoices", value);
                    if (typeof value === "object") {
                        return (
                            <>
                                <RowGray>Декларант: {value.declarant}</RowGray>
                                <RowGray>Контрактор: {value.contractor}</RowGray>
                            </>
                        )
                    }
                }
            }
        },
        {
            name: "transportType",
            label: "Вид транспорта",
            ...options
        },
        {
            name: "mode",
            label: "Режим",
            ...options
        },
        {
            name: "factories",
            label: "",
            options: {
                filter: false,
                display: "none"
            }   
        },
        {
            name: "vendors",
            label: "",
            options: { 
                filter: false,
                display: "none"
            }
        }
    ];
}
