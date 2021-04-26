import { useMemo } from "react";
import { GET_NEW_CUSTOMS } from "./gql";
import { Helmet } from "react-helmet";

import { useDateRange, useTitle } from "../../../hooks";
import { setTitleWithDateRange } from "../../../utils/functions";

import { generateColumns } from "./TableData";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import DatePickers from "../../../components/DatePickers";


const NewList = ({match}) => {

    const {
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        handleClick,
        data, 
        error
      } = useDateRange(GET_NEW_CUSTOMS);
    
      const title = useTitle("Таможня");
    
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

export default NewList;
