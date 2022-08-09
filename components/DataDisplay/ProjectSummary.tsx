import React from "react";
import { ProjectTitle } from "components/DataDisplay/ProjectTitle";
import {ProjectCollaborators} from "components/DataDisplay/ProjectCollaborators"
interface ProjectSummaryProps {
  color: string;
  project?: any;
  onClick?: any;
}

export const ProjectSummary = ({
  color,
  project,
  onClick,
}: ProjectSummaryProps) => {
  const { name, address, customer, collaborators, projectType } = project;

  return (
    <>
      <div className="project-summary" onClick={() => onClick()}>
        <div>
          <ProjectTitle projectType={projectType.type} name={name} />
        </div>
        <div>
          <i className="fas fa-handshake mr-2"></i> {customer.name}
        </div>
        <div>
          <i className="fas fa-location-dot mr-2"></i> {address}
        </div>
        <div>
          <i className="fas fa-mobile mr-2"></i> {customer.phone}
        </div>
        <div>
          <ProjectCollaborators collaborators={collaborators} />
        </div>
      </div>
    </>
  );
};
