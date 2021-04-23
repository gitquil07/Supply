import { useState, useEffect } from "react";
import moment from "moment";
import { propEq, find } from "ramda";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRACKING_ARRIVINGS } from "./gql";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import DatePickers from "../../../components/DatePickers";

const ArrivedList = ({ match }) => {

  const [fromDate, setFromDate] = useState(moment().startOf('month').toDate());
  const [toDate, setToDate] = useState(new Date());

  const dispatch = useDispatch();
  const title = useSelector(state => state.title);

  const { data } = useQuery(GET_TRACKING_ARRIVINGS);

  const list = [];

  useEffect(() => {
    dispatch({type: "CHANGE_TITLE" , payload: "Прибывшие"})
  }, [dispatch]);

  const columns = [
    {
      name: "public_id",
      label: "Номер слежки",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const id = find(propEq("public_id", value))(list);
          return <Link to={`${match.url}/create/${id?.id}`}>{value}</Link>;
        },
      },
    },
    {
      name: "vendor",
      label: "Поставщик",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "location",
      label: "Место нахождений",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "transport_number",
      label: "Номер транспорта",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "created_at",
      label: "Дата создания заявки",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "updated_at",
      label: "Дата поставки",
      options: {
        filter: true,
        sort: false,
      },
    },

  ];

  const handleDateRangeChange = () => {}

  return (
    <> 
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <DatePickers
        fromDate={fromDate}
        toDate={toDate}
        changeFrom={setFromDate}
        changeTo={setToDate}
        buttonClicked={handleDateRangeChange}
      />
      <CustomMUIDataTable
        title={`Заявки на прибывшие c ${moment(fromDate).format("DD.MM.YYYY")} по ${moment(toDate).format("DD.MM.YYYY")}`}
        data={list}
        columns={columns}
      />
    </>
  );

}

export default ArrivedList;
