import React from "react";
import { Button, Form, Input } from "antd";

interface ClientFormProps {
  subtititle?: string;
  onSubmit: any;
  isLoading: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({ subtititle, onSubmit, isLoading}) => {
  const buttonIcon = isLoading ? "fa fa-spinner" : "fa fa-save";
  return (
    <>
      <div className="flex-auto pt-0">
        <Form className="client-form" onFinish={onSubmit}>
          <h5 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Client Information
          </h5>
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="relative w-full mb-3">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input client's name" },
                  ]}
                >
                  <Input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                </Form.Item>
              </div>
              <div className="relative w-full mb-3">
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input client's last name" },
                  ]}
                >
                  <Input className="block borde px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150" />
                </Form.Item>
              </div>
              <div className="relative w-full mb-3">
                <Form.Item label="Email" name="email">
                  <Input className="block border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150" />
                </Form.Item>
              </div>
              <div className="relative w-full mb-3">
                <Form.Item label="Phone" name="phone">
                  <Input className="block border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150" />
                </Form.Item>
              </div>
              <div className="relative w-full mb-3">
                <Form.Item label="Address" name="address">
                  <Input className="block border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150" />
                </Form.Item>
              </div>
              <div className="relative w-full mt-6">
                <Button htmlType="submit" icon={<i className={`${buttonIcon} mr-2`}></i>} type="primary" className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 float-right">Add Contact</Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
