import React from "react";
import { weekDays } from "utils/calendar";
import { ProjectSummary } from "components/DataDisplay/ProjectSummary";
import dayjs from "dayjs";

interface WeeklyAgendaProps {
  projects: any;
}

export const WeeklyAgenda = ({ projects }: WeeklyAgendaProps) => {
  const daysOfCurrentWeek = weekDays(new Date());
  const onProjectClick = () => console.log("test");

  return (
    <>
      {daysOfCurrentWeek.map((day) => {
        return (
          <>
            <div className="mb-2 first-of-type:mt-0">
              <h3 className="text-blueGray-700 mb-8 text-lg">
                {dayjs(day).format("ddd, DD MMMM")}
              </h3>
              {projects?.map((project) => (
                <ProjectSummary
                  key={project.id}
                  project={project}
                  color="light"
                  onClick={() => onProjectClick()}
                />
              ))}
            </div>
            <hr className="mb-6"/>
          </>
        );
      })}
    </>
  );
};
