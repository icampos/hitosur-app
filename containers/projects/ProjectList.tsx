import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { AllProjectsQuery } from "queries/projects";

// Antd Components
import { Table, Tooltip, Drawer } from "antd";

// Custom Components
import { Initials } from "components/DataDisplay/Initials";
import { CardContainer } from "components/Cards/CardContainer";
import { TaskStatus } from "components/DataDisplay/TaskStatus";
import { ProjectNotes } from "components/DataDisplay/ProjectNotes";
import { ProjectDetails } from "components/DataDisplay/ProjectDetails";
import { ProjectTitle } from "components/DataDisplay/ProjectTitle";

export default function ProjectList() {
  const { data, loading, error } = useQuery(AllProjectsQuery);
  const [selectedRow, setSelectedRow] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const columns = [
    {
      title: "Project Type",
      dataIndex: "projectType",
      key: "projectType",
      render: (projectType: any) => (
        <Initials title={projectType.type} color="light" />
      ),
      filters: [
        { text: "Reportes y Curvas", value: "Reportes y Curvas" },
        { text: "Planos Catastrados", value: "Planos Catastrados" },
      ],
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (name: any) => <span className="text-sm">{name}</span>,
    },
    {
      title: "Client",
      dataIndex: "customer",
      key: "customer",
      render: (customer: any) => (
        <span className="text-sm">{customer.name}</span>
      ),
      fixed: "left",
    },
    {
      title: "Contact",
      dataIndex: "customer",
      key: "contact",
      render: (customer: any) => (
        <span className="text-sm">{customer.phone}</span>
      ),
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location: any) => <span className="text-sm">{location}</span>,
    },
    {
      title: "Date",
      dataIndex: "startDate",
      key: "startDate",
      filters: [
        { text: "2022", value: "2022" },
        { text: "2021", value: "2021" },
      ],
      render: (startDate: any) => <span className="text-sm">{startDate}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: any) => <span className="text-sm">{address}</span>,
    },
    {
      title: "Responsible",
      dataIndex: "collaborators",
      key: "responsible",
      filters: [
        { text: "Mario Alberto", value: "Mario Alberto" },
        { text: "Mario Andres", value: "Mario Andres" },
      ],
      render: (collaborators: any) =>
        collaborators.map((collaborator) => {
          return (
            collaborator.collaboratorType.type === "RESPONSIBLE" && (
              <Tooltip
                key={collaborator.id}
                placement="topLeft"
                title={`${collaborator.name} ${collaborator.lastName}`}
              >
                <img
                  src="/img/team-1-800x800.jpg"
                  alt="..."
                  className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4 mr-2"
                ></img>
              </Tooltip>
            )
          );
        }),
    },
    {
      title: "On Field",
      dataIndex: "collaborators",
      key: "on_field",
      render: (collaborators: any) =>
        collaborators.map((collaborator) => {
          return (
            collaborator.collaboratorType.type === "ON_FIELD" && (
              <Tooltip
                key={collaborator.id}
                placement="topLeft"
                title={`${collaborator.name} ${collaborator.lastName}`}
              >
                <img
                  src="/img/team-1-800x800.jpg"
                  alt="..."
                  className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4 mr-2"
                ></img>
              </Tooltip>
            )
          );
        }),
      filters: [
        { text: "Mario Alberto", value: "Mario Alberto" },
        { text: "Mario Andres", value: "Mario Andres" },
      ],
    },
    /*{
      title: "Assistants",
      dataIndex: "collaborators",
      key: "assistant",
      render: (collaborators: any) =>
        collaborators.map((collaborator) => {
          return (
            collaborator.collaboratorType.type === "ASSISTANT" && (
              <span>{`${collaborator.name}  ${collaborator.lastName}`}</span>
            )
          );
        }),
    },*/

    {
      title: "Visita",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <TaskStatus status="pending" />,
    },
    {
      title: "Dibujo",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <TaskStatus status="pending" />,
    },
    {
      title: "Reporte",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <TaskStatus status="pending" />,
    },
    {
      title: "Correo",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <TaskStatus status="pending" />,
    },
  ];

  return (
    <>
      <CardContainer color="light" title="Projects">
        <div className="p-8 pt-2 pb-0">
          <Table
            dataSource={data.projects}
            //@ts-ignore
            columns={columns}
            scroll={{ x: 1800 }}
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
        title={
          <ProjectTitle
            projectType={selectedRow?.projectType.type}
            name={selectedRow?.name}
          />
        }
        placement="right"
        closable={true}
        onClose={() => setSelectedRow(null)}
        visible={selectedRow}
        key={"placement"}
        destroyOnClose={true}
        width={"700px"}
      >
        {selectedRow && <ProjectDetails project={selectedRow} />}
      </Drawer>
    </>
  );
}
