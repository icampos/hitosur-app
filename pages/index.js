import React, { useState } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { useQuery } from "@apollo/client";

// Antd Components
import { Drawer } from "antd";

// Library Components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardTable from "components/Cards/CardTable.js";
import { CardContainer } from "components/Cards/CardContainer";
import { ProjectSummary } from "components/DataDisplay/ProjectSummary";

// Layout for page
import Admin from "layouts/Admin.js";

import { AllProjectsQuery } from "queries/projects";

export default function Dashboard() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const { data, loading, error } = useQuery(AllProjectsQuery);

  const projects = data?.projects;

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardContainer title="Today's Projects" color="light">
            <hr />
            {!loading &&
              projects.map((project) => (
                <ProjectSummary
                  project={project}
                  color="light"
                  onClick={() => setIsDrawerVisible(true)}
                />
              ))}
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
      <Drawer
        title="Basic Drawer"
        placement="bottom"
        closable={true}
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        key={"placement"}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}

Dashboard.layout = Admin;

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
