import {  useMemo } from "react";
import { GET_TRACKING_ARRIVINGS } from "./gql";
import { Helmet } from "react-helmet";

import { useDateRange, useTitle } from "../../../hooks";
import { setTitleWithDateRange } from "../../../utils/functions";

import { generateColumns } from "./TableData";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import DatePickers from "../../../components/DatePickers";


const ArrivedList = ({ match }) => {

  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleClick,
    data, 
    error
  } = useDateRange(GET_TRACKING_ARRIVINGS);

  const title = useTitle("Прибывшие");

  const list = [];

  const { url } = match;
  const columns = useMemo(() => generateColumns(url, list), [data]); 

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
        buttonClicked={handleClick}
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
