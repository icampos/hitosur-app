import React from "react";
import { ProjectField } from "components/DataDisplay/ProjectField";
import { TaskStatus } from "components/DataDisplay/TaskStatus";
import { ProjectCollaborators } from "components/DataDisplay/ProjectCollaborators";
import dayjs from "dayjs";

interface ProjectSummaryProps {
  project?: any;
}

export const ProjectDetails = ({ project }: ProjectSummaryProps) => {
  const { customer, address, collaborators, documents } = project;

  return (
    <div>
      <div className="pb-4">
        <ProjectField
          Icon={<i className="fas fa-calendar" />}
          field={dayjs(project.startDate).format("ddd, DD MMMM")}
        />
        <ProjectField
          Icon={<i className="fas fa-handshake" />}
          field={customer.name}
        />
        <ProjectField
          Icon={<i className="fas fa-location-dot" />}
          field={address}
        />
        <ProjectField
          Icon={<i className="fas fa-mobile" />}
          field={customer.phone}
        />

        <ProjectCollaborators
          direction="flex-col"
          collaborators={collaborators}
        />
      </div>
      <hr />
      <div className="text-base py-6">
        <TaskStatus status="pending" title="Visita" />
        <TaskStatus status="done" title="Dibujo" />
        <TaskStatus status="done" title="Reporte" />
        <TaskStatus status="done" title="Foto" />
        <TaskStatus status="blocked" title="Correo" />
      </div>

      <hr />
      <div className="text-base py-6">
        {documents.map((document) => (
          <ProjectField
            Icon={<i className="fas fa-file-image" />}
            field={document.number}
            link={document.link}
          />
        ))}
      </div>
    </div>
  );
};
