import React, { useState, useEffect } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
// Antd Components
import { Button, Drawer, Tabs, Empty } from "antd";
import { WeeklyAgenda } from "components/Calendar/WeeklyAgenda";
// Library Components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

import { CardContainer } from "components/Cards/CardContainer";
import { ProjectSummary } from "components/DataDisplay/ProjectSummary";
import { ProjectDetails } from "components/DataDisplay/ProjectDetails";
import { ProjectTitle } from "components/DataDisplay/ProjectTitle";

import {ProjectForm} from "components/Forms/ProjectForm";

// Layout for page
import SubAdmin from "layouts/SubAdmin.js";

import { CurrentWeekProjectsQuery } from "queries/projects";

export default function Dashboard() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [dailyAgenda, setDailyAgenda] = useState(null);
  const { data, loading, error } = useQuery(CurrentWeekProjectsQuery);

  const projects = data?.currentWeekProjects;

  const onProjectClick = (project) => {
    setSelectedProject(project);
    setIsDrawerVisible(true);
  };

  const { TabPane } = Tabs;

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    if (data && projects.length) {
      const dailyProjects = projects.filter((project) => {
        return project.startDate === dayjs().format("YYYY-MM-DD");
      });
      setDailyAgenda(dailyProjects);
    }
  }, [data, projects]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardContainer color="light">
            <div className="p-8 pt-2 pb-0">
              <Tabs defaultActiveKey="2" onChange={onChange}>
                <TabPane
                  tab={
                    <h3 className="font-semibold text-lg mb-2 mt-2 text-blueGray-700">
                      Today's Agenda
                    </h3>
                  }
                  key="1"
                >
                  {!loading &&
                    dailyAgenda &&
                    dailyAgenda.map((project) => (
                      <>
                        <ProjectSummary
                          key={project.id}
                          project={project}
                          color="light"
                          onClick={() => onProjectClick(project)}
                        />
                      </>
                    ))}
                  {(!dailyAgenda || dailyAgenda.length <= 0) && (
                    <Empty
                      className="p-8"
                      description="No events happening today"
                    />
                  )}
                </TabPane>
                <TabPane
                  tab={
                    <h3 className="font-semibold text-lg mb-2 mt-2 text-blueGray-700">
                      Weekly Agenda
                    </h3>
                  }
                  key="2"
                >
                  {!loading && projects && (
                    <WeeklyAgenda
                      projects={projects}
                      onProjectClick={onProjectClick}
                    />
                  )}
                  {(!projects || projects.length <= 0) && (
                    <Empty
                      className="p-8"
                      description="No events happening this week"
                    
                    >
                       <Button onClick={()=>setIsAddDrawerVisible(true)} type="primary">Create Event</Button>
                      </Empty>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </CardContainer>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
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
          key={"placement"}
        >
          <ProjectDetails project={selectedProject} />
        </Drawer>
      )}
      {isAddDrawerVisible && (
        <Drawer
          title='Create Event'
          placement="right"
          closable={true}
          onClose={() => setIsAddDrawerVisible(false)}
          visible={isAddDrawerVisible}
          key={"placement"}
        >
          <ProjectForm />
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
