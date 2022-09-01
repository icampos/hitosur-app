import React from "react";

interface TaskStatusProps {
  status: string;
  title?: string;
}

export const ReminderStatus: React.FC<TaskStatusProps> = ({ status, title }) => {
  const statusColors = {
    pending: "text-orange-500",
    done: "text-emerald-500",
    blocked: "text-red-500",
    default: "text-orange-500",
  };

  const backgroundColor = {
    pending: "bg-orange-200",
    done: "text-emerald-500",
    blocked: "text-red-500",
    default: "text-orange-500",
  };

  const statusIcons = {
    pending: "fas fa-clock",
    done: "fas fa-check-circle",
    blocked: "fas fa-minus-circle",
    default: "fas fa-clock",
  };

  const statusColor = statusColors[status];
  const statusIcon = statusIcons[status];
  const statusBackgroundColor = backgroundColor[status];


  return (
    <div className={`status cursor-pointer flex justify-between align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-base`}>
      <div>
        <i className={`${statusColor} ${statusIcon}`}></i>{" "}
        <span className="capitalize text-sm">{title ? title : status}</span>
      </div>
    </div>
  );
};
