import React from "react";
import dayjs from "dayjs";

import { ReminderStatus } from "components/DataDisplay/ReminderStatus";
import { ProjectCollaborators } from "components/DataDisplay/ProjectCollaborators";

import styles from "styles/components/Reminder.module.scss";

interface ReminderProps {
  title: string;
  description: string;
  assignee?: any;
  date: string;
  status: string;
}

export default function CardReminder({
  title,
  description,
  assignee,
  date,
  status,
}: ReminderProps) {
  return (
    <>
      <div
        className={`${styles.reminder} relative flex flex-col min-w-0 break-words bg-white  mb-6 xl:mb-0`}
      >
        <div className="flex-auto py-6 px-4">
          <div className="flex flex-wrap items-start justify-center flex-col lg:flex-row">
            <div
              className={`${styles.reminder__date} self-stretch mr-4 flex-1`}
            >
              <span className="font-semibold text-sm text-blueGray-700">
                {dayjs(date).format("ddd, DD MMMM")}
              </span>
            </div>
            <div
              className={`${styles.reminder__description} relative w-full pr-4 max-w-full lg:ml-3 mr-4`}
              style={{ flex: 5 }}
            >
              <h5 className="text-blueGray-700 uppercase font-bold text-xs">
                {title}
              </h5>
              <span className="font-normal text-sm text-blueGray-700 text-justify">
                {description}
              </span>
            </div>

            <div className="flex-1 self-center">
              <ReminderStatus status={status.toLowerCase()} />
            </div>
            <div className="relative self-center w-auto pl-4 flex-1">
              <ProjectCollaborators collaborators={[assignee]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
