import { Row }   from "components/Row";
import moment from "moment";

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
                filter: true,
                customBodyRender: (value) => {
                    return <a href="#" onClick={() => {
                        callback(value.id)
                        return false
                    }}>{value.publicId}</a>;
                },
            },
        },
        {
            name: "createdAt",
            label: "Дата создаия",
            options: {
                ...options,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "vendorFactory",
            label: "Название завода / Поставщик",
            options: {
                customBodyRender: value => {
                    if(typeof value === "object"){
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
                    if(typeof value === "object"){
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
