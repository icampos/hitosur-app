import React from "react";
import CardTableV2 from "components/Cards/CardTableV2";
import { ReminderStatus } from "./ReminderStatus";
import { ProjectCollaborators } from "components/DataDisplay/ProjectCollaborators";

import { Table } from "antd";

interface RemidersProps {
  reminders: any;
}

export default function Reminders({ reminders }: RemidersProps) {
  const columns = [
    {
      title: "Due Date",
      dataIndex: "date",
      key: "date",
      render: (date: any) => <span className="text-sm">{date}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title, record: any) => (
        <>
          <span className="text-sm">{record.title}</span>
          <br />
          <span className="text-sm">{record.description}</span>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => <ReminderStatus status={status} />,
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee) => <ProjectCollaborators collaborators={[assignee]} />,
    },
  ];
  const data = [
    {
      title: "Enviar Documentos",
      description: "Enviar Documentos",
      date: "2022/02/02",
      status: "pending",
      assignee: {
        name: "Mario",
        lastName: "Loria",
        collaboratorType: {
          type: "ON_FIELD",
        },
      },
    },
  ];
  return (
    <CardTableV2 title="Reminders">
      <Table
        dataSource={data}
        //@ts-ignore
        columns={columns}
      />
    </CardTableV2>
  );
}
