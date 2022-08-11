import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";

import { AllProjectsQuery } from "queries/projects";

// Antd Components
import { Table, Tooltip } from "antd";

// Custom Components
import { Initials } from "components/DataDisplay/Initials";
import { CardContainer } from "components/Cards/CardContainer";
import { TaskStatus } from "components/DataDisplay/TaskStatus";

export default function ProjectList() {
  const { data, loading, error } = useQuery(AllProjectsQuery);

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
    },
    {
      title: "Client",
      dataIndex: "customer",
      key: "customer",
      render: (customer: any) => <span>{customer.name}</span>,
      fixed: "left",
    },
    {
      title: "Contact",
      dataIndex: "customer",
      key: "contact",
      render: (customer: any) => <span>{customer.phone}</span>,
    },

    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Date",
      dataIndex: "startDate",
      key: "startDate",
      filters: [
        { text: "2022", value: "2022" },
        { text: "2021", value: "2021" },
      ],
    },
    { title: "Address", dataIndex: "address", key: "address" },
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
    {
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
    },

    {
      title: "Visita",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <TaskStatus status="pending"/>,

    },
    {
      title: "Dibujo",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <TaskStatus status="pending"/>,
    },
    {
      title: "Reporte",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <TaskStatus status="pending"/>,
    },
    {
      title: "Correo",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <TaskStatus status="pending"/>,
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
          />
        </div>
      </CardContainer>
    </>
  );
}
