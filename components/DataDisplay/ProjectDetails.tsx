import React, { useEffect, useState } from "react";
import { ProjectField } from "components/DataDisplay/ProjectField";
import { TaskStatus } from "components/DataDisplay/TaskStatus";
import { ProjectCollaborators } from "components/DataDisplay/ProjectCollaborators";
import { ProjectNotes } from "components/DataDisplay/ProjectNotes";
import { ProjectContext } from "context/ProjectContext";
import { ProjectQuery } from "queries/projects";
import { UpdateProjectStatusMutation, UpdateProjectMutation } from "mutations/project";

import { ProjectForm } from "components/Forms/ProjectForm";
import { useQuery, useMutation } from "@apollo/client";

import { Button, Tabs } from "antd";
import dayjs from "dayjs";

interface ProjectSummaryProps {
  project?: any;
}

const { TabPane } = Tabs;

export const ProjectDetails = ({ project }: ProjectSummaryProps) => {
  const { id } = project;

  const { data, loading, error, refetch } = useQuery(ProjectQuery, {
    variables: { id: id },
  });

  const [
    updateStatus,
    { loading: loadingUpdateStatus, error: errorUpdateStatus },
  ] = useMutation(UpdateProjectStatusMutation, {
    onCompleted: () => {
      refetch();
    },
  });

  const [
    updateProject,
    { loading: loadingUpdateProject, error: errorUpdateProject },
  ] = useMutation(UpdateProjectMutation, {
    onCompleted: () => {
      refetch();
    },
  });

  const [tasks, setTasks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (data) {
      const tasks = JSON.parse(data?.project.task);
      setTasks(tasks);
    }
  }, [data]);

  const updateTaskArray = (key, value) => {
    const newProjects = tasks.map((task) =>
      task.title === key ? { ...task, status: value } : task
    );

    const variables = {
      id: data?.project.id,
      task: JSON.stringify(newProjects),
    };

    updateStatus({ variables });
  };

  const onFinish = async (data) => {
    const {
      name,
      startDate,
      endDate,
      address,
      typeId,
      responsible,
      customer,
      onField,
      assistant,
    } = data;
    const formattedStartDate = dayjs(startDate).format();
    const formattedEndDate = endDate ? dayjs(startDate).format() : null;


    const variables = {
      id: id,
      name,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      address,
      typeId,
      responsible,
      onField,
      customer,
      assistant,
    };
    try {
      updateProject({ variables });
      setTimeout(setIsEditMode(false), 30
)
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <ProjectContext.Provider value={data.project}>
      <div>
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={
            isEditMode ? (
              <Button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 height-xs"
                type="primary"
                onClick={() => setIsEditMode(false)}
                icon={<i className="fa fa-close mr-2" />}
              >
                Cancel Edit
              </Button>
            ) : (
              <Button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 height-xs"
                type="primary"
                onClick={() => setIsEditMode(true)}
                icon={<i className="fa fa-edit mr-2" />}
              >
                Edit Event
              </Button>
            )
          }
        >
          <TabPane
            tab={
              <h3 className="font-semibold text-base mb-2 mt-2 text-blueGray-700">
                Details
              </h3>
            }
            key="1"
          >
            {!isEditMode ? (
              <div className="pb-4">
                <ProjectField
                  Icon={<i className="fas fa-calendar" />}
                  field={dayjs(data.project.startDate).format("ddd, DD MMMM")}
                />
                <ProjectField
                  Icon={<i className="fas fa-handshake" />}
                  field={data.project.customer.name}
                />
                <ProjectField
                  Icon={<i className="fas fa-location-dot" />}
                  field={data.project.address}
                />
                <ProjectField
                  Icon={<i className="fas fa-mobile" />}
                  field={data.project.customer.phone}
                />

                <ProjectCollaborators
                  direction="flex-col"
                  collaborators={data.project.collaborators}
                />
              </div>
            ) : (
              <ProjectForm
                isUpdate={true}
                onFinish={onFinish}
                isLoading={loadingUpdateProject}
                initialValues={data.project}
              />
            )}

            <hr />
            <div className="text-sm py-6 px-4">
              {tasks.map((task, index) => (
                <TaskStatus
                  key={index}
                  status={task.status}
                  title={task.title}
                  editable={true}
                  onTaskChange={updateTaskArray}
                />
              ))}
            </div>

            <hr />

            <div className="text-sm py-6">
              {data.project.documents.length > 0 ? (
                data.project.documents.map((document) => (
                  <ProjectField
                    Icon={<i className="fas fa-file-image" />}
                    field={document.number}
                    link={document.link}
                  />
                ))
              ) : (
                <>No documents has been attached</>
              )}
            </div>
          </TabPane>
          <TabPane
            tab={
              <h3 className="font-semibold text-base mb-2 mt-2 text-blueGray-700">
                Notes
              </h3>
            }
            key="2"
          >
            <ProjectNotes notes={data.project.notes} refetch={refetch} />
          </TabPane>
        </Tabs>
      </div>
    </ProjectContext.Provider>
  );
};
