import React, { useState } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { useQuery } from "@apollo/client";
import {  Calendar } from "antd";
import { ProjectDetails } from "components/DataDisplay/ProjectDetails";
import { ProjectTitle } from "components/DataDisplay/ProjectTitle";
// Antd Components
import { Drawer } from "antd";
import { CardContainer } from "components/Cards/CardContainer";

// Layout for page
import SubAdmin from "layouts/SubAdmin.js";

import { AllProjectsQuery } from "queries/projects";

const projectList = [
    {
        "__typename": "Project",
        "id": "16efdbb5-ffc9-436f-bd0f-4db1dd5bfb85",
        "name": "Uvita",
        "address": "Uvita",
        "location": "Uvita",
        "startDate": "1655964000000",
        "endDate": "1655964000000",
        "description": "Uvita",
        "status": null,
        "customer": {
            "__typename": "Customer",
            "name": "Client",
            "phone": "555555555"
        },
        "collaborators": [
            {
                "__typename": "Task",
                "name": "Colaborador "
            }
        ],
        "projectType": {
            "__typename": "ProjectType",
            "name": "Reportes y Curvas"
        }
    },
    {
        "__typename": "Project",
        "id": "81d806c4-0cf4-412e-81f7-bd62ba2e8f1d",
        "name": "Dominical",
        "address": "Dominical",
        "location": "Dominical",
        "startDate": "1657173600000",
        "endDate": "1657173600000",
        "description": "Dominical",
        "status": null,
        "customer": {
            "__typename": "Customer",
            "name": "Client 2",
            "phone": "888888888"
        },
        "collaborators": [],
        "projectType": {
            "__typename": "ProjectType",
            "name": "Planos Catastrados"
        }
    }
]


const getListData = (value: Moment) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = projectList
        break;
      case 10:
        listData = projectList
        break;
      case 15:
        listData = projectList
        break;
      default:
    }
    return listData || [];
  };
  
  const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default function Dashboard() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { data, loading, error } = useQuery(AllProjectsQuery);

  const projects = data?.projects;

  const onProjectClick = (project) => {
    setSelectedProject(project);
    setIsDrawerVisible(true);
  };

  const onChange = (key) => {
    return false
  };

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(project => (
          <li key={project.id} className="mb-2">
            <button onClick={()=>onProjectClick(project)}>
            <ProjectTitle name={project.name} projectType={project.projectType.type}/>
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardContainer title="Project Calendar" color="light">
            <div className="p-8 pt-0">
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
            </div>
          </CardContainer>
        </div>
      </div>
      {selectedProject && (
        <Drawer
          title={
            <ProjectTitle
              projectType={selectedProject.projectType.type}
              name={selectedProject.name}
            />
          }
          placement="right"
          closable={true}
          onClose={() => setIsDrawerVisible(false)}
          visible={isDrawerVisible}
        >
          <ProjectDetails project={selectedProject} />
        </Drawer>
      )}
    </>
  );
}

Dashboard.layout = SubAdmin;

export const getServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/login",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
