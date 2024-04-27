import {

  ProColumns,
  ProTable,

} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Form, Modal } from 'antd';
import React from 'react';

export type Props = {
  onCancel: () => void;
  onSubmit: (values:API.InterfaceInfo) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.InterfaceInfo>[];
};  
const CreateModal: React.FC<Props> = (props) => {
  const { visible, onCancel ,onSubmit,columns} = props;



  return (
    <Modal footer={null} open={visible} onCancel={()=>onCancel?.()}>
    <ProTable type='form' columns={columns}  onSubmit={ async (value) => {
        onSubmit?.(value)}
    }
          />
    
    </Modal>
  );
      } 
export default CreateModal;
