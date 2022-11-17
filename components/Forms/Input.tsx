import React from "react";
import { Input } from "antd";

const genericClassName = 'block border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150'

export const FormInput = () => {
  return (
    <Input className={genericClassName} />
  );
};


export const FormTextArea = () => {
    const { TextArea } = Input;
    return (
        <TextArea className={genericClassName}/>
    )
}