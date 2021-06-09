import { Row, RowGray } from "components/Row";
import moment from "moment";
import { setHeading } from "utils/functions";

export const generateColumns = () => {
    return [
        {
            name: "id",
            label: "№",
            options: {
                display: "none"
            }
        },
        {
            name: "ordersNumbers",
            label: "Номера\nзаказов",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
            } 
        },
        {
            name: "createdAt",
            label: "Дата создания\nзаявки",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "transportMix",
            label: "Тип\nзявки",
            options:{
                filter: true,
                soft: true,
                customHeadRender: setHeading,
                customBodyRender: value => <b>{value? "Сборная" : "Обычная"}</b>
            }
        },
        {
            name: "shippingDate",
            label: "Дата\nотгрузки",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "vendor",
            label: "Транспортировщик\nТип / Номер транспорта",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: (value) => {
                    return (
                        <>
                            <Row>
                                <b>{value.vendor}</b>
                            </Row>
                            <RowGray>
                                {value.trType} / {value.trNumber}
                            </RowGray>
                        </>
                    )
                }
            }
        },
        {
            name: "amount",
            label: "Сумма\nНетто / Брутто",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return (
                        <>
                            <Row>{value.amount} {value.currency}</Row>
                            <RowGray>{value.netto} кг / {value.brutto} кг</RowGray>
                        </>
                    );
                }
            }
        },
        {
            name: "note",
            label: "Примечание",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "locations",
            label: "Местонахождение",
            options: {
                filter: false,
                sort: false,
            }            
        },
        {
            name: "factories",
            label: "Заводы",
            options: {
                filter: false,
                sort: false,
            }
        },
    ];

}