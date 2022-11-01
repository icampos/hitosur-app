import React, { useState, useContext } from "react";
import { Timeline, Empty, Button } from "antd";
import dayjs from "dayjs";
import { NotesForm } from "components/Forms/NotesForm";
import { gql, useMutation } from "@apollo/client";
import { ProjectContext } from "context/ProjectContext";

interface ProjectSummaryProps {
  notes?: any;
  refetch?: any;
}

const CreateNoteMutation = gql`
  mutation ($date: String!, $note: String!, $projectId: String!) {
    createNote(date: $date, note: $note, projectId: $projectId) {
      date
      note
      projectId
    }
  }
`;

const DeleteNoteMutation = gql`
  mutation ($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export const ProjectNotes = ({ notes, refetch }: ProjectSummaryProps) => {
  const color = "rgb(234, 179, 8)";
  const [displayNotesForm, setDisplayNotesForm] = useState(false);
  const [isEditModeEnabled, setIsEditMode] = useState(false);
  const [createNote, { loading, error }] = useMutation(CreateNoteMutation, {
    onCompleted: () => refetch(),
  });

  const [deleteNote] = useMutation(DeleteNoteMutation, {
    onCompleted: () => refetch(),
  });

  const projectContext = useContext(ProjectContext);

  const onSubmit = async (data) => {
    const date = dayjs();
    const { note } = data;
    const { id } = projectContext;
    const variables = { date, note, projectId: id };
    try {
      createNote({ variables });
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteNote = async (data) => {
    const { id } = data;
    const variables = { id: id };
    console.log(variables);
    try {
      //@ts-ignore
      deleteNote({ variables });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <>
      {<NotesForm onFinish={onSubmit} isLoading={loading} />}
      <hr className="my-6"/>
        <Timeline className="mt-6">
          {notes?.map((note) => {
            return (
              <>
              <Timeline.Item color={color}>
                <>
                  <div className="flex flex-row place-content-between mb-2">
                    <p className="font-bold">
                      {dayjs(note.date).format("ddd, DD MMMM, YYYY")}
                    </p>
                    <div className="flex flex-row">
                      <Button type="link" onClick={() => setIsEditMode(true)}>
                        <i className="fa fa-edit" />
                      </Button>
                      <Button
                        type="link"
                        onClick={() => onDeleteNote({ id: note.id })}
                      >
                        <i className="fa fa-trash" />
                      </Button>
                    </div>
                  </div>
                  <p className="mb-0">{note.note}</p>
                </>
              </Timeline.Item>
              </>
            );
          })}
        </Timeline>
        {notes && !notes.length && !displayNotesForm && (
          <Empty className="p-8" description="No notes has been added"></Empty>
        )}
      </>
    </div>
  );
};
