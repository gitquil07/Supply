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
                customBodyRender: ({pk, ordersNumbers}) => {
                    return ordersNumbers.map((oN, idx) => 
                        <Row>{pk} / <span style={{fontSize: "12px"}}>{idx + 1}</span></Row>    
                    )
                }
            }
        },
        {
            name: "ordersNumbers",
            label: "Номера\nзаказов",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => toNewLine(value, "50")
            } 
        },
        {
            name: "trackingUser",
            label: "Логист",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => <RowFixWidth width="150">{value}</RowFixWidth>
            }
        },
        {
            name: "country",
            label: "Страна / Город\nпоставщика",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
                customBodyRender: value => <RowFixWidth width="150">{value.country} / {value.city}</RowFixWidth>
            }
        },
        {
            name: "firmName",
            label: "Получатель",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => toNewLine(value, "300"),
            }
        },
        {
            name: "factories",
            label: "Заводы",
            options: {
                filter: false,
                sort: false,
                customBodyRender: value => toNewLine(value, "200"),
            }
        },
        {
            name: "products",
            label: "Товары",
            options: {
                filter: false,
                sort: false,
                customBodyRender: value => toNewLine(value, "300")
            }
        },
        {
            name: "cargoInvoices",
            label: "Грузовой\nинвойс №",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => toNewLine(value, "150"),
            }
        },
        {
            name: "stationBorder",
            label: "Станция\nГраница",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
                customBodyRender: value => <RowFixWidth width="300">{   
                    (value.station && value.border)? `${value.station} / ${value.border}` : null 
                }</RowFixWidth>
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
            name: "trDate",
            label: "Дата\nприбытия",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
                customBodyRender: value => <RowFixWidth width="100">{moment(value).format("YYYY-MM-DD")}</RowFixWidth>
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
                        <RowFixWidth width="200">
                            <Row>
                                <b>{value.vendor}</b>
                            </Row>
                            <RowGray>
                                {value.trType} / {value.trNumber}
                            </RowGray>
                        </RowFixWidth>
                    )
                }
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
            name: "amount",
            label: "Нетто / Брутто",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => <RowFixWidth width="150">{value.netto} кг / {value.brutto} кг</RowFixWidth>
            }
        },
        {
            name: "transportExpencese",
            label: "Транспортный\nрасход",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return <RowFixWidth width="150">{value.amount} {value.currency}</RowFixWidth>
                }
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
            name: "transferredDate",
            label: "Дата\nоплаты",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
                customBodyRender: value => <RowFixWidth width="100">{moment(value).format("YYYY-MM-DD")}</RowFixWidth> 
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
            name: "relativeWeight",
            label: "Относительный\nвес",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading
            }
        }
    ];

}


const RowFixWidth = styled.div`
    width:${({width}) => width+"px"};
`;

const RowCenter = styled.div`
    text-align:center;
`;

const toNewLine = (arr, width) => {

    console.log("arr", arr);

    return <RowFixWidth width={width}>
                {
                    arr.map(item => <Row>{item}</Row>)
                }
           </RowFixWidth>
}