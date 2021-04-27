import { useMemo } from "react";
import { GET_CERTIFICATE_CUSTOMS } from "./gql";
import { Helmet } from "react-helmet";

import { useDateRange, useTitle } from "../../../hooks";
import { setTitleWithDateRange } from "../../../utils/functions";

import { generateColumns } from "./TableData";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import DatePickers from "../../../components/Inputs/DatePickers";

const CertificateList = ({ match }) => {

  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleClick,
    data, 
    error
  } = useDateRange(GET_CERTIFICATE_CUSTOMS);

  const title = useTitle("Сертификат");

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
        title={setTitleWithDateRange("поставку", fromDate, toDate)}
        data={list}
        columns={columns}
      />
    </>
  );

}

export default CertificateList;
