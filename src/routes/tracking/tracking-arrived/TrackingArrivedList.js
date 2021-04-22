import { useQuery } from "@apollo/client";
import { GET_TRACKING_ARRIVINGS } from "./gql";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Button } from "../../../components/Buttons";
import { Title } from "../../../components/Title";
import { CustomHeader } from "../../../components/CustomHeader";
import { propEq, find } from "ramda";
import { Link } from "react-router-dom";

const TrackingArrivedList = ({ match }) => {
  const { data } = useQuery(GET_TRACKING_ARRIVINGS);

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
      <CustomHeader>
        <Title name="Date Picker"></Title>
        <Button name="Применить"></Button>
      </CustomHeader>
      <CustomMUIDataTable
        title="Заявки на прибывшие"
        data={list}
        columns={columns}
      />
    </>
  );

}

export default TrackingArrivedList;
