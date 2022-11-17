import React from "react";
import { useQuery } from "@apollo/client";

import { Form, DatePicker, Select, Button, Input } from "antd";
import { FormInput, FormTextArea } from "components/Forms/Input";

import { AllCollaboratorsQuery } from "queries/collaborators";
import { AllClientsQuery } from "queries/clients";

interface ProjectFormProps {
  onFinish: any;
  isLoading: Boolean
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onFinish, isLoading }) => {

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
          {/*<h4 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Client Information
  </h4>*/}
          <div className="flex flex-wrap">
            <div className="relative w-full mb-3">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the project's name",
                  },
                ]}
              >
              <Input className={genericClassName} />

              </Form.Item>
            </div>
            <div className="relative w-full mb-3">
            <Form.Item
                label="Project Type"
                name="typeId"
                rules={[{ required: true, message: "Please select a type" }]}
              >
                <Select className={genericClassName}>
                  <Select.Option value="69691c71-32e4-449f-b4cc-2a97dfafb6d8">
                    Reportes y Curvas
                  </Select.Option>
                  <Select.Option value="af1fd6be-a651-4ff2-a44b-72e07a3beb44">
                    Plano Catastro
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="relative w-full mb-3 pr-4">
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true, message: "Please enter a date" }]}
                >
                  <DatePicker
                    className={genericClassName}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="relative w-full mb-3">
                <Form.Item label="End Date" name="endDate">
                  <DatePicker
                    className={genericClassName}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="relative w-full mb-3"></div>

            <div className="relative w-full mb-3">
              <Form.Item
                label="Address"
                name="address"
              >
                <Input.TextArea />
              </Form.Item>
            </div>
            <div className="relative w-full mb-3">
              <Form.Item
                label="Client"
                name="customer"
                rules={[{ required: true, message: "Please select a client" }]}
              >
                <Select
                  className={genericClassName}
                  showSearch
                  optionFilterProp="children"
                >
                  {clientsData?.customers.map((data) => {
                    return (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name} {data.lastName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="relative w-full mb-3">
              <Form.Item
                label="Responsible"
                name="responsible"
                rules={[{ required: true, message: "Please select" }]}
              >
                <Select className={genericClassName}>
                  {collaboratorsData?.collaborator.map((data) => {
                    return (
                      data.collaboratorType.type === "RESPONSIBLE" && (
                        <Select.Option key={data.id} value={data.id}>
                          {data.name} {data.lastName}
                        </Select.Option>
                      )
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="relative w-full mb-3">
              <Form.Item label="On Field" name="onField">
                <Select className={genericClassName}>
                  {collaboratorsData?.collaborator.map((data) => {
                    return (
                      data.collaboratorType.type === "ON_FIELD" && (
                        <Select.Option key={data.id} value={data.id}>
                          {data.name} {data.lastName}
                        </Select.Option>
                      )
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="relative w-full mb-3">
              <Form.Item label="Assistant" name="assistant">
                <Select className={genericClassName}>
                  {collaboratorsData?.collaborator.map((data) => {
                    return (
                      data.collaboratorType.type === "ASSISTANT" && (
                        <Select.Option key={data.id} value={data.id}>
                          {data.name} {data.lastName}
                        </Select.Option>
                      )
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 mt-6">
              <div className="relative w-full mb-3">
                <Form.Item label="Initial Note" name="note">
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                    //@ts-ignore

                    rows={"4"}
                    defaultValue=""
                  ></textarea>
                </Form.Item>
              </div>
            </div>
            <div className="relative w-full mt-6">
                <Button htmlType="submit" icon={<i className={`${buttonIcon} mr-2`}></i>} type="primary" className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 float-right">Create Event</Button>
              </div>
          </div>
        </Form>
      </div>
    </>
  );
};
