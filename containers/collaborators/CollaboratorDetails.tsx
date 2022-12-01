import React, {useEffect, useState} from "react";
import { ProjectField } from "components/DataDisplay/ProjectField";
import { TaskStatus } from "components/DataDisplay/TaskStatus";
import { ProjectCollaborators } from "components/DataDisplay/ProjectCollaborators";
import { ProjectNotes } from "components/DataDisplay/ProjectNotes";
import { ProjectContext } from 'context/ProjectContext';
import { ClientQuery } from "queries/clients";
import { useQuery } from "@apollo/client";
import { Tabs } from "antd";
import dayjs from "dayjs";

interface ClientSummaryProps {
  client?: any;
}

const { TabPane } = Tabs;

export const CollaboratorDetails = ({ client }: ClientSummaryProps) => {
  const { id } = client;

  const { data, loading, error, refetch } = useQuery(ClientQuery, {
    variables: {id: id}
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;
   
 
  return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <h3 className="font-semibold text-base mb-2 mt-2 text-blueGray-700">
                Details
              </h3>
            }
            key="1"
          >
            <div className="pb-4">
              <ProjectField
                Icon={<i className="fas fa-handshake" />}
                field={`${data.customer.name} ${data.customer.lastName}`}
              />
              <ProjectField
                Icon={<i className="fas fa-mobile" />}
                field={data.customer.phone}
              />
               <ProjectField
                Icon={<i className="fas fa-envelope" />}
                field={data.customer.email}
              />
                <ProjectField
                Icon={<i className="fas fa-location" />}
                field={data.customer.address}
              />
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
          </TabPane>
        </Tabs>
      </div>
  );
};
