import React from "react";

interface ProjectFieldProps {
  Icon: any;
  field: string;
  link?: string;
}

export const ProjectField: React.FC<ProjectFieldProps> = ({
  Icon,
  field,
  link,
}) => {
  return (
    <div className="mb-4 text-base">
      <div className="w-5 inline-block text-center">{Icon}</div>
      {link ? (
        <a href={link} target="blank">
          <span className="ml-3"> {field}</span>
        </a>
      ) : (
        <span className="ml-3"> {field}</span>
      )}
    </div>
  );
};
