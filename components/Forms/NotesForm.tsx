import React, { useState } from "react";
import { Form, Input, Button } from "antd";

interface NotesFormProps {
  onFinish?: any;
  isLoading?: boolean;
}

export const NotesForm = ({ onFinish, isLoading = false }: NotesFormProps) => {
  const [note, setNote] = useState(null);
  const buttonIcon = isLoading ? "fa fa-spinner" : "fa fa-save";

  const onFormFinish = (values) => {
    onFinish(values);
    setNote(false);
  };

  const onNoteChange = (value) => {
    if(value.target.value){
      setNote(true)
    }else{
      setNote(false)
    }
  }
  return (
    <>
      <div>
        <Form onFinish={onFormFinish}>
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="relative w-full mb-3">
                <Form.Item style={{ display: "initial" }} name="note">
                  <Input.TextArea
                    showCount
                    maxLength={500}
                    onClick={()=>setNote(true)}
                    onChange={(value) => onNoteChange(value)}
                    placeholder={"Add a new note.."}
                    className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                  />
                </Form.Item>
              </div>
            </div>
            {note && (
              <div className="w-full">
                <div className="relative w-full mb-3">
                  <Form.Item className="text-right">
                    <Button htmlType="submit" type="primary" disabled={!note} className="mt-3">
                      <i className={`${buttonIcon} mr-2`} />
                      Add note
                    </Button>
                  </Form.Item>
                </div>
              </div>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};
