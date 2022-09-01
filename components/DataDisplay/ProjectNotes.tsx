import React from "react";
import { Timeline, Empty, Button } from "antd";
import dayjs from "dayjs";

interface ProjectSummaryProps {
  notes?: any;
}

export const ProjectNotes = ({ notes }: ProjectSummaryProps) => {
  const color = "rgb(234, 179, 8)";
  return (
    <div>
      <Timeline>
        {notes?.map((note) => {
          return (
            <Timeline.Item color={color}>
              <>
                <p className="font-bold">{dayjs(note.date).format("ddd, DD MMMM, YYYY")}</p> 
                <p>{note.note}</p>
              </>
            </Timeline.Item>
          );
        })}
      </Timeline>
      {notes && !notes.length && (
        <Empty className="p-8" description="No notes had been added">
          <Button onClick={() => console.log(true)} type="primary">
            Add Note
          </Button>
        </Empty>
      )}
    </div>
  );
};
