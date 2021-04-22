import React, {useState, useEffect}  from 'react';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import MatButton from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getCustomsList} from "Actions";
import {useSelector} from "react-redux";
import {find, pathOr, propEq} from 'ramda'

const NoDocumentCustomsList = ({match, getCustomsList}) => {

    const columns = [
        {
            name: "public_id",
            label: "Заказ номера",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list)
                    return (
                        <Link to={`${match.url}/${id?.id}`}>
                            {value}
                        </Link>
                    );

                }
            }
        },
        {
            name: "application",
            label: "Название Завода / Поставщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "status",
            label: "Статус",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "transport_type",
            label: "Тип транспорта",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "invoices",
            label: "Инвойсы",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "created_at",
            label: "Дата создания заказа",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];
    const reducerList = useSelector(state => state)
    const list = pathOr([], ['customs', 'customs_list', 'results'], reducerList)
    const [from, setFrom] = useState(moment().startOf('month').toDate());
    const [to, setTo] = useState(new Date());

    const data = list.map(({public_id, application, status, created_at}) => {
        return{
            public_id,
            application: application?.order?.vendor_factory?.factory.name + ' / ' + application?.order?.vendor_factory?.vendor?.name ,
            status: status.join(' - '),
            transport_type: application?.transport_type?.name,
            invoices: application?.invoices,
            created_at: moment(created_at).format('YYYY-MM-DD'),
        }})

    useEffect(() => {
        getCustomsList(moment(from).format("YYYY-MM-DD"), moment(to).format("YYYY-MM-DD"), "нет документов")
    },[from, to])

    const options = {
        filterType: 'dropdown',
        responsive: 'stacked'
    };
    return (
        <div className="map-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.no-document-customs" />} match={match} />
            <RctCollapsibleCard>
                <div className="search-bar-wrap">
                    <div className="row">
                        <div className="col-sm-4 col-md-2 col-lg-2">
                            <DatePicker
                                format={moment(from).format("DD.MM.YYYY")}
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="От"
                                value={from}
                                onChange={date => setFrom(date)}
                            />
                        </div>
                        <div className="col-sm-4 col-md-2 col-lg-2">
                            <DatePicker
                                format={moment(to).format("DD.MM.YYYY")}
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="До"
                                value={to}
                                onChange={date => setTo(date)}
                            />
                        </div>
                        <div className="col-sm-4 col-md-8 col-lg-8" />
                    </div>
                </div>
                <br />
                <MUIDataTable
                    title={`Заказы на поставку с ${moment(from).format("YYYY-MM-DD")} по ${moment(to).format("YYYY-MM-DD")}`}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </RctCollapsibleCard>
        </div>
    )
}
export default connect(null, {
    getCustomsList,
})(NoDocumentCustomsList);
