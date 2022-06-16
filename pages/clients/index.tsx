import React from "react";
import { gql, useQuery } from "@apollo/client";

// components
import BootstrapTableComponent from "components/Tables/BootstrapTable";
import { StatusIndicator } from "components/StatusIndicator";
// layout for page
import SubAdmin from "layouts/SubAdmin";

const AllClientsQuery = gql`
  query {
    customers {
      id
      name
      lastName
      email
      phone
      status
    }
  }
`;

export default function Clients() {
  const { data, loading, error } = useQuery(AllClientsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const columns = [
    {
      dataField: "name",
      text: "Name",
      formatter: (cell, row, rowIndex, extraData) => (
        <strong><a href={`clients/detail/${row.id}`}>{row.name} {row.lastName}</a></strong>
       ),
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "phone",
      text: "Mobile",
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell, row, rowIndex, extraData) => (
       <StatusIndicator status={row.status}/>
      ),
    },
  ];
  return (
    <>
      {data && (
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
          {/*}  <CardTable
              columns={columnsOld}
              color="dark"
              title="Clients"
              data={data?.customers}
      /> */}
          </div>
          <div className="w-full mb-12 px-4">
            <BootstrapTableComponent
              columns={columns}
              color="dark"
              title="Clients"
              data={data?.customers}
            />
          </div>
        </div>
      )}
    </>
  );
}

Clients.layout = SubAdmin;
