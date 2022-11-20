import React from "react";
import { useQuery } from "@apollo/client";

import { Form, DatePicker, Select, Button, Input } from "antd";

import { AllCollaboratorsQuery } from "queries/collaborators";
import { AllClientsQuery } from "queries/clients";

interface ReminderFormProps {
  onFinish: any;
  isLoading: Boolean
}

export const ReminderForm: React.FC<ReminderFormProps> = ({ onFinish, isLoading }) => {

  const { data: collaboratorsData, loading: isLoadingCollaborators } = useQuery(
    AllCollaboratorsQuery
  );
  const { data: clientsData, loading: isLoadingClients } =
    useQuery(AllClientsQuery);

  const buttonIcon = isLoading ? "fa fa-spinner" : "fa fa-save";

  const genericClassName =
    "block borde px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150";
  return (
    <>
      <div className="flex-auto p-4">
        <Form className="project-form" onFinish={onFinish}>
          <div className="flex flex-wrap">
            <div className="relative w-full mb-3">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title",
                  },
                ]}
              >
              <Input className={genericClassName} />

              </Form.Item>
            </div>
            <div className="w-full">
              <div className="relative w-full mb-3 pr-4">
                <Form.Item
                  label="Due Date"
                  name="date"
                  rules={[{ required: true, message: "Please enter a date" }]}
                >
                  <DatePicker
                    className={genericClassName}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="relative w-full mb-3">
              <Form.Item
                label="Description"
                name="description"
              >
                <Input.TextArea className={genericClassName}/>
              </Form.Item>
            </div>
            <div className="relative w-full mb-3">
              <Form.Item
                label="Assignee"
                name="assignee"
                rules={[{ required: true, message: "Please select" }]}
              >
                <Select className={genericClassName}>
                  {collaboratorsData?.collaborator.map((data) => {
                    return (
                        <Select.Option key={data.id} value={data.id}>
                          {data.name} {data.lastName}
                        </Select.Option>
                      
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="relative w-full mt-6">
                <Button htmlType="submit" icon={<i className={`${buttonIcon} mr-2`}></i>} type="primary" className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 float-right">Create Reminder</Button>
              </div>
          </div>
        </Form>
      </div>
    </>
  );
};
