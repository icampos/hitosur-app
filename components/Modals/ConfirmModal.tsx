import { Modal } from 'antd';
import React, { useState } from 'react';


interface ModalConfirmProps {
    content?: string;
    title?: string;
    onCofirm?: any;
    onCancel?: any;
    isOpen: boolean;
  }
  

export const ConfirmModal = ({ isOpen, content, title, onCancel, onCofirm }: ModalConfirmProps) => {

  const [confirmLoading, setConfirmLoading] = useState(false);
  return (
      <Modal
        title={title}
        open={true}
        onOk={onCofirm}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <p className='testContent'>{content}</p>
      </Modal>
  );
};

