import React from "react";

interface CardTableProps {
  status: string
}

export const StatusIndicator: React.FC<CardTableProps> = ({ status }) => {
  return (
    <>
    {status === 'INACTIVE' && (
        <i className="fas fa-circle text-red-500 mr-2"/>
    )} 
    {status === 'ACTIVE' && (
       <i className="fas fa-circle text-emerald-500 mr-2"/>
    )} 
    <span>{status}</span>
    </>
  );
};