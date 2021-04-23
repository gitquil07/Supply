import { propEq, find } from "ramda";
import { Link } from "react-router-dom";
import { GET_TRACKING_ARRIVINGS } from "./gql";
import { Helmet } from "react-helmet";

import { useDateRange, useTitle } from "../../../hooks";
import { setTitleWithDateRange } from "../../../utils/functions";

import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import DatePickers from "../../../components/DatePickers";

const ArrivedList = ({ match }) => {

  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleDateRangeChange,
    data, 
    error
  } = useDateRange(GET_TRACKING_ARRIVINGS);

  const title = useTitle("Прибывшие");

  const list = [];

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
        title={setTitleWithDateRange("прибывшие", fromDate, toDate)}
        data={list}
        columns={columns}
      />
    </>
  );

}

export default ArrivedList;
