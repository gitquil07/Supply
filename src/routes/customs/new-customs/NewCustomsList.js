import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { Button } from "../../../components/Button";
import { Title } from "../../../components/Title"
import { useQuery } from "@apollo/client";
import { GET_TRACKINGS } from "./gql";
import { HeaderForFilter } from "../../../components/HeaderForFilter";
import { propEq, find } from "ramda";
import { Link } from "react-router-dom";


const NewCustomsList = ({match}) => {

    const { data } = useQuery()

    const columns = [
        {
            name: "public_id",
            label: "Номер заявки",
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
            name: "order",
            label: "Поставщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "degree_of_danger",
            label: "Степень опасности",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "delivery_condition",
            label: "Способ доставки",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "package_on_pallet",
            label: "Кол-во Паддонов",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "transport_count",
            label: "Кол-во транспорта",
            options: {
                filter: true,
                sort: true,
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
            name: "created_at",
            label: "Дата создания заявки",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "updated_at",
            label: "Дата поставки",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "type_of_packaging",
            label: "Вид упаковки",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];
    const reducerList = useSelector(state => state)
    const list = pathOr([], ['application', 'application_list'], reducerList)
    const [from, setFrom] = useState(moment().startOf('month').toDate());
    const [to, setTo] = useState(new Date());


    const data = list.map(({public_id, order, degree_of_danger, delivery_condition, package_on_pallet, transport_count, status, created_at, updated_at, type_of_packaging}) => {
        return{
            public_id,
            order : order?.vendor_factory?.vendor?.company_name,
            degree_of_danger,
            delivery_condition,
            package_on_pallet,
            transport_count,
            status,
            created_at: moment(created_at).format('YYYY-MM-DD'),
            updated_at: moment(updated_at).format('YYYY-MM-DD'),
            type_of_packaging
        }})

    useEffect(() => {
        getApplicationList(moment(from).format("YYYY-MM-DD"), moment(to).format("YYYY-MM-DD"), false, "в растаможке")
    },[from, to])

    const options = {
        filterType: 'dropdown',
        responsive: 'stacked'
    };
    return (
        <div className="map-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.customs" />} match={match} />
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
                        <div className="col-sm-4 col-md-6 col-lg-6" />
                    </div>
                </div>
                <br />
                <MUIDataTable
                    title={`Заявки на поставку с ${moment(from).format("YYYY-MM-DD")} по ${moment(to).format("YYYY-MM-DD")}`}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </RctCollapsibleCard>
        </div>
    )
}
export default connect(null, {
    getApplicationList,
})(NewCustomsList);
