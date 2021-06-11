import { Row, RowGray } from "components/Row";
import moment from "moment";
import { setHeading } from "utils/functions";
import styled from "styled-components";

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
            name: "pk",
            label: "№\nслежения",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
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
                customBodyRender: value => <RowFixWidth width="100">{moment(value).format("YYYY-MM-DD")}</RowFixWidth>
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
                customBodyRender: value => <RowFixWidth width="100">{moment(value).format("YYYY-MM-DD")}</RowFixWidth>
            }
        },
        {
            name: "inWayDayCount",
            label: "Дней\nв пути",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
                customBodyRender: value => <RowCenter>{value}</RowCenter>
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
                        <RowFixWidth width="180">
                            <Row>{value.amount} {value.currency}</Row>
                            <RowGray>{value.netto} кг / {value.brutto} кг</RowGray>
                        </RowFixWidth>
                    );
                }
            }
        },
        {
            name: "country",
            label: "Страна\nпоставщика",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
            }
        },
        {
            name: "deliveryCondition",
            label: "Условия\nдоставки",
            options:{
                filter: true,
                sort: true,
                customHeadRender: setHeading,
            }
        },
        {
            name: "invoiceProforma",
            label: "Инвойсы",
        },
        {
            name: "trackingUser",
            label: "Логист",
            options: {
                filter: true,
                sort: true
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


const RowFixWidth = styled.div`
    width:${({width}) => width+"px"};
`;

const RowCenter = styled.div`
    text-align:center;
`;