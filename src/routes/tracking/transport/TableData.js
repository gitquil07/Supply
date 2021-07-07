import { TwoRows } from "components/Row";
import { setHeading } from "utils/functions";

const options = {
    options: {
        filter: true,
        sort: false,
        display: "none",
        viewColumns: false
    }
}

export const generateColumns = () => {
    return [
        {
            name: "id",
            label: "№",
            options: {
                filter: false,
                display: false,
                viewColumns: false
            }
        },
        {
            name: "publicIdAndLogist",
            label: "№ слежения\nлогист",
            options:{
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return (
                        <TwoRows main={value?.publicId} sub={value?.trackingUser} />
                    );
                }
            }
        },
        {
            name: "firmAndFactory",
            label: "Получатель\nЗавод",
            options:{
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: ({firms, factories}) => {
                    return (
                        <>
                            {
                                factories.map((factory, idx) => 
                                    <TwoRows main={factory} sub={firms[idx]} />
                                )
                            }
                        </>
                    )
                }
            }
        },
        {
            name: "shippingDateAndArrivingDate",
            label: "Дата отгрузки\nДата прибытия",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: ({shippingDate, trDate}) => 
                    <TwoRows main={shippingDate} sub={trDate} />
            }
        },
        {
            name: "companyNameAndtransportNumber",
            label: "Транспортировщик\nНомер транспорта",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: ({companyName, transportNumber}) => 
                    <TwoRows main={companyName} sub={transportNumber} />
            }
        },
        {
            name: "locationAndStatusAndDaysInWay",
            label: "Местонахождение\nСтатус / Дни",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: ({trackingStatus, inWayDayCount, location}) => 
                    <TwoRows main={location} sub={`${trackingStatus} / ${inWayDayCount}`} />
            }
        },
        {
            name: "amountAndNettoAndBrutto",
            label: "Транс., расходы\nНетто / Брутто",
            options: {
                filter: false,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: ({amount, netto, brutto}) => 
                    <TwoRows main={amount} sub={`${netto} / ${brutto}`} />
            }
        },
        {
            name: "transportType",
            label: "Тип транспорта",
            options:{
                filter: true,
                sort: true
            }
        },
        // Columns to add to filter
        {   
            name: "publicId",
            label: "номер",            
            ...options
        },
        {
            name: "trackingUser",
            label: "Логист",
            ...options
        },
        {
            name: "shippingDate",
            label: "Дата отгрузки",
            ...options
        },
        {
            name: "trDate",
            label: "Дата прибытия",
            ...options
        },
        {
            name: "companyName",
            label: "Транспортировщик",
            ...options
        },
        {
            name: "transportNumber",
            label: "номер транспорта",
            ...options
        },
        {
            name: "location",
            label: "Местонахождение",
            ...options
        },
        {
            name: "trackingStatus",
            label: "Статус",
            ...options
        },
        {
            name: "inWayDayCount",
            label: "В пути",
            ...options
        },
        {
            name: "amount",
            label: "Транспортный расход",
            ...options
        },
        {
            name: "brutto",
            label: "Брутто",
            ...options
        },
        {
            name: "netto",
            label: "Нетто",
            ...options
        },
    ];

}