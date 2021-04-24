import { useMemo } from "react";
import { GET_TRACKINGS } from "./gql";
import { Helmet } from "react-helmet";

import { useDateRange, useTitle } from "../../../hooks";
import { setTitleWithDateRange } from "../../../utils/functions";
import { generateColumns } from "./TableData";

import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import DatePickers from "../../../components/DatePickers";

const TrackingList = ({ match }) => {

  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleDateRangeChange,
    data,
    error
  } = useDateRange(GET_TRACKINGS);

  const title = useTitle("Логистика");
  
  // const list = data?.application?.applications?.edges?.map(({ node }) => {
  //   return {
  //     public_id: node.publicId,
  //     order: `${node.trackingUser.firstName} + ${node.trackingUser.fullName}`,
  //     degree_of_danger: node.degreeOfDanger,
  //     delivery_condition: node.deliveryCondition,
  //     package_on_pallet: node.packageOnPallet,
  //     transport_count: node.transportCount,
  //     transport_type: node.transportType.name,
  //     created_at: node.created_at,
  //     updated_at: node.updated_at,
  //     type_of_packaging: node.typeOfPackaging,
  //     factory: node.order.vendorFactory.name
  //   }
  // });

  const list = [];
  
  const { url } = match;
  const columns = useMemo(() => generateColumns(url, list), [data]);


  return (
    <>
      <Helmet title={title} />
      <DatePickers
        fromDate={fromDate}
        toDate={toDate}
        changeFrom={setFromDate}
        changeTo={setToDate}
        buttonClicked={handleDateRangeChange}
      />
      <CustomMUIDataTable
        title={setTitleWithDateRange("поставку", fromDate, toDate)}
        data={list}
        columns={columns}
      />
    </>
  );
}

export default TrackingList;