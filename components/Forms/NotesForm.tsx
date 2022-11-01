import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import RichTextEditor from "components/Editor";

interface NotesFormProps {
  onFinish?: any;
  isLoading?: boolean;
}

export const NotesForm = ({ onFinish, isLoading = false }: NotesFormProps) => {
  const [note, setNote] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const buttonIcon = isLoading ? "fa fa-spinner" : "fa fa-save";
  return (
    <>
   {/*}   <div className="flex-auto pt-0 p-4  border-1 border-blueGray-50 shadow">
        {showEditor && (
          <div className="p-4">
            <RichTextEditor/>
          </div>
        )}
        {!showEditor && (
          <Input.TextArea
            maxLength={500}
            onClick={(value) => setShowEditor(true)}
            placeholder={"Add a new note.."}
          />
        )}*/}
        <div>
        <Form onFinish={onFinish}>
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="relative w-full mb-3">
                <Form.Item
                  style={{ display: "initial" }}
                  name="note"
                >
                  <Input.TextArea
                    showCount
                    maxLength={500}
                    onChange={(value) => setNote(true)}
                    placeholder={"Add a new note.."}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="w-full">
              <div className="relative w-full mb-3">
                <Form.Item>
                  <Button htmlType="submit" type="primary" disabled={!note}>
                    <i className={`${buttonIcon} mr-2`}/>Add note
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
  </Form>
      </div>
    </>
  );
};
