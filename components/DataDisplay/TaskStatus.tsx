import React, { useState } from "react";
import {StatusSelect} from 'components/Forms/StatusSelect'

interface TaskStatusProps {
  status: string;
  title?: string;
  editable?: boolean; 
  onTaskChange?: any
}

export const TaskStatus: React.FC<TaskStatusProps> = ({ status, title, editable=false, onTaskChange }) => {
  const statusColors = {
    pending: "text-orange-500",
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

  const [isEditMode, setIsEditMode] = useState(false)

  const onStatusChange =  (key, value) => {
      setIsEditMode(false)
      onTaskChange(title, value)
  }

  return (
    <div className="flex items-center mb-4 justify-between">
    <div onClick={()=>setIsEditMode(true)} onBlur={()=>setIsEditMode(false)} className="status cursor-pointer flex justify-between align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-base mr-4">
      <div>
        <i className={`mr-2 ${statusColor} ${statusIcon}`}></i>{" "}
        <span className="capitalize ml-3">{title ? title : status}</span>
      </div>
      {/*<div>{title && <i className="fas fa-edit hidden" />}</div>*/}
    </div>
    {editable && isEditMode && (
      <div className="w-full lg:w-6/12 flex items-center">
      <StatusSelect onChange={onStatusChange} title={title}/>
      <div onClick={()=>setIsEditMode(false)}>{<i className="text-lg ml-2 fa-solid fa-square-xmark" />}</div>
      </div>
    )}
    </div>
  );
};



