import React from "react";
import { Tooltip } from "antd";
import { ProjectField } from "./ProjectField";

interface ProjectCollaboratorsProps {
  collaborators: any;
  direction?: string;
}

export const ProjectCollaborators = ({
  collaborators,
  direction = "flex-row",
}: ProjectCollaboratorsProps) => {
  const responsible = collaborators.filter(
    (collaborator) => collaborator.collaboratorType.type === "RESPONSIBLE"
  );
  const onField = collaborators.filter(
    (collaborator) => collaborator.collaboratorType.type === "ON_FIELD"
  );
  const assistants = collaborators.filter(
    (collaborator) => collaborator.collaboratorType.type === "ASSISTANT"
  );

  const sortedCollaborators = responsible.concat(onField).concat(assistants);

  return (
    <>
      {direction === "flex-row" && (
        <InlineProjectCollaborators collaborators={sortedCollaborators} />
      )}
      {direction === "flex-col" && (
        <ColumnProjectCollaborators collaborators={sortedCollaborators} />
      )}
    </>
  );
};

const InlineProjectCollaborators = (props) => {
  return (
    <div className={`flex items-center`}>
      {props.collaborators.map((collaborator, index) => (
        <div key={index}>
          <Tooltip
            key={collaborator.id}
            placement="topLeft"
            title={`${collaborator.name} ${collaborator.lastName}`}
          >
            <img
              src="/img/team-1-800x800.jpg"
              alt="..."
              className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4 mr-2"
            />
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

const ColumnProjectCollaborators = (props) => {
  return (
    <>
      {props.collaborators.map((collaborator) => {
        const icon =
          collaborator.collaboratorType.type === "RESPONSIBLE"
            ? "fa-user-shield"
            : collaborator.collaboratorType.type === "ON_FIELD"
            ? "fa-user-gear"
            : "fa-users-gear";
        return (
          <ProjectField
            key={collaborator.id}
            Icon={<i className={`fas ${icon}`} />}
            field={`${collaborator.name} ${collaborator.lastName}`}
          />
        );
      })}
    </>
  );
};
