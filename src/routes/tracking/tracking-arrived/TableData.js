export const columns = [
    {
        name: "public_id",
        label: "Номер слежки",
        options: {
          filter: true,
        //   customBodyRender: (value, tableMeta, updateValue) => {
        //     const id = find(propEq("public_id", value))(list);
        //     return <Link to={`${match.url}/create/${id?.id}`}>{value}</Link>;
        //   },
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