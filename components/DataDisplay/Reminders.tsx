import React from "react";
import CardReminder from "components/Cards/CardReminder";

interface RemidersProps {
  reminders: any;
  onCreateReminder: any;
}

export default function Reminders({ reminders }: RemidersProps) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Reminders</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Create Reminder
            </button>
          </div>
          <hr className="mt-5"/>

        </div>
        <div className="flex-auto px-4 lg:px-8 pb-6 bg-white">
          {reminders?.map((reminder) => {
            return (
              <>
              <CardReminder
                date={reminder.date}
                title={reminder.title}
                description={reminder.description}
                status={reminder.status}
                assignee={reminder.assignee}
              />
              <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
