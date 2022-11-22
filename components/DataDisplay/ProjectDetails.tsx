import React, { useEffect, useState } from "react";
import { ProjectField } from "components/DataDisplay/ProjectField";
import { TaskStatus } from "components/DataDisplay/TaskStatus";
import { ProjectCollaborators } from "components/DataDisplay/ProjectCollaborators";
import { ProjectNotes } from "components/DataDisplay/ProjectNotes";
import { ProjectContext } from "context/ProjectContext";
import { ProjectQuery } from "queries/projects";
import { ProjectForm } from "components/Forms/ProjectForm";
import { useQuery } from "@apollo/client";

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

  const [tasks, setTasks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (data) {
      const tasks = JSON.parse(data?.project.task);
      setTasks(tasks);
    }
  }, [data]);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <ProjectContext.Provider value={data.project}>
      <div>
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={
            <Button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 height-xs"
              type="primary"
              onClick={() => setIsEditMode(true)}
              icon={<i className="fa fa-edit mr-2" />}
            >
              Edit Event
            </Button>
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
              <ProjectForm isUpdate={true} onFinish={()=>{console.log('test')} } isLoading={false} initialValues={data.project}/>
            )}

            <hr />
            <div className="text-sm py-6">
              {tasks.map((task) => (
                <TaskStatus status={task.status} title={task.title} />
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
