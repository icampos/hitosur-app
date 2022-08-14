import React, { useEffect, useState } from "react";
import { ProjectSummary } from "components/DataDisplay/ProjectSummary";
import dayjs from "dayjs";

interface WeeklyAgendaProps {
  projects: any;
  onProjectClick: any;
}

export const WeeklyAgenda = ({ projects, onProjectClick }: WeeklyAgendaProps) => {
  const [weeklyProjects, setWeeklyProjects] = useState({});

  useEffect(() => {
    if (projects && projects.length) {
      const groups = projects.reduce((groups, project) => {
        const date = project.startDate;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(project);
        return groups;
      }, {});

      setWeeklyProjects(groups);
    }
  }, [projects]);

  return (
    <>
      {Object.keys(weeklyProjects).map((day) => {
        return (
          <>
            <div className="mb-2 first-of-type:mt-0">
              <h3 className="text-blueGray-700 mb-8 text-lg">
                {dayjs(day).format("ddd, DD MMMM")}
              </h3>
              {weeklyProjects[day]?.map((project) => (
                <ProjectSummary
                  key={project.id}
                  project={project}
                  color="light"
                  onClick={() => onProjectClick(project)}
                />
              ))}
            </div>
            <hr className="mb-6" />
          </>
        );
      })}
    </>
  );
};
