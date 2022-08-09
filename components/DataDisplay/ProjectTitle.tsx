import React from "react";
import {Initials} from "./Initials"

interface CardContainerProps {
  projectType: string;
  name: string;
}

export const ProjectTitle: React.FC<CardContainerProps> = ({ projectType, name }) => {
  return (
    <div className="flex items-center">
    <Initials color="light" title={projectType} />
    <span className={"ml-3 font-bold text-blueGray-600"}>{name}</span>
  </div>
  );
};
