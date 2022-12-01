import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AllCollaboratorsQuery } from "queries/collaborators"; 
// Antd Components
import { Table, Drawer, Button } from "antd";

// Custom Components
import { CardContainer } from "components/Cards/CardContainer";
import { CollaboratorDetails } from "./CollaboratorDetails";
import { CollaboratorForm } from "components/Forms/CollaboratorForm";

import {CreateCollaboratorMutation} from 'mutations/collaborator'

export default function ProjectList() {
  const { data, loading, error, refetch } = useQuery(AllCollaboratorsQuery);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addClientEnabled, setAddClientEnabled] = useState(false);

  console.log(data)
  
    const [createCollaborator, {loading : loadingAddClient, error: errorAddingClient}] = useMutation(CreateCollaboratorMutation, {
    onCompleted: () => refetch(),
  });

  const onSubmit = async (data) => {
    const { name, lastName, phone, email, address } = data;
    const variables = { name, lastName, phone, email, address };
    try {
      createCollaborator({ variables });
    } catch (error) {
      console.error(error);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <span className="text-sm">{name}</span>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (name: any) => <span className="text-sm">{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: any) => <span className="text-sm">{email}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "email",
      render: (phone: any) => <span className="text-sm">{phone}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: any) => <span className="text-sm">{address}</span>,
    },
    {
      title: "Type",
      dataIndex: "collaboratorType",
      key: "collaboratorType",
      render: (collaboratorType: any) => <span className="text-sm">{collaboratorType?.type}</span>,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "address",
      render: (user: any) => <span className="text-sm">{user}</span>,
    },
  ];

  return (
    <>
      <CardContainer color="light" title="Clients">
        <div className="flex justify-end p-8 pt-4">
          <Button
            onClick={() => setAddClientEnabled(true)}
            className="mr-4"
            type="primary"
            icon={<i className="fa fa-edit mr-2" />}
          >
            Add Collaborator
          </Button>
        </div>
        <div className="p-8 pt-2 pb-0">
          <Table
            dataSource={data.collaborator}
            //@ts-ignore
            columns={columns}
            loading={loading}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setSelectedRow(record);
                }, // click row
              };
            }}
          />
        </div>
      </CardContainer>
      <Drawer
        title={"Contact Details"}
        placement="right"
        closable={true}
        onClose={() => setSelectedRow(null)}
        visible={selectedRow}
        key={"placement"}
        destroyOnClose={true}
        width={"700px"}
      >
        {selectedRow && <CollaboratorDetails client={selectedRow} />}
      </Drawer>
      <Drawer
        title={<h6 className="text-blueGray-700 text-xl font-bold">Add Collaborator</h6>}
        placement="right"
        closable={true}
        onClose={() => setAddClientEnabled(false)}
        visible={addClientEnabled}
        key={"placement"}
        destroyOnClose={true}
        width={"500px"}
        className="form"
      >
        {addClientEnabled && 
        <CollaboratorForm isLoading={loadingAddClient} onSubmit={onSubmit}/>}
      </Drawer>
    </>
  );
}
