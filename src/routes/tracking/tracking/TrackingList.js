import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRACKINGS } from "./gql";
import { propEq, find } from "ramda";

import { CustomHeader } from "../../../components/CustomHeader";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Button } from "../../../components/Buttons";
import { Title } from "../../../components/Title"

const TrackingList = ({ match }) => {

  const { data } = useQuery(GET_TRACKINGS);

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

  const list = data?.application?.applications?.edges?.map(({ node }) => {
    return {
      public_id: node.publicId,
      order: `${node.trackingUser.firstName} + ${node.trackingUser.fullName}`,
      degree_of_danger: node.degreeOfDanger,
      delivery_condition: node.deliveryCondition,
      package_on_pallet: node.packageOnPallet,
      transport_count: node.transportCount,
      transport_type: node.transportType.name,
      created_at: node.created_at,
      updated_at: node.updated_at,
      type_of_packaging: node.typeOfPackaging,
      factory: node.order.vendorFactory.name
    }
  });

  return (
    <>
      <CustomHeader>
        <Title name="Date picker"></Title>
        <Button name="Применить"></Button>
      </CustomHeader>
      <CustomMUIDataTable
        title={"Заявки на поставку"}
        data={list}
        columns={columns}
      />
    </>
  );
}

export default TrackingList;