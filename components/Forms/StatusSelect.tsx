import React from "react";
import { Select } from "antd";

interface StatusSelectProps {
    onChange: any;
    title: string;
  }
  
const genericClassName = 'block border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150'

export const StatusSelect = ({onChange, title}: StatusSelectProps) => {
  return (
    <Select className={genericClassName} onChange={(value)=>onChange(title, value)}>
        <Select.Option value="done">Done</Select.Option>
        <Select.Option value="pending">Pending</Select.Option>
        <Select.Option value="blocked">Blocked</Select.Option>
    </Select>
  );
};