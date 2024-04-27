import {

  ProColumns,
  ProTable,

} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import InterfaceInfo from '..';
import { FormInstance } from 'antd';
export type Props = {
  onCancel: () => void;
  onSubmit: (values:API.InterfaceInfo) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.InterfaceInfo>[];
  values: API.InterfaceInfo;
};  


const UpdateModal: React.FC<Props> = (props) => {
  const { visible, onCancel ,onSubmit,columns,values} = props;
  const formRef = useRef<FormInstance>();

useEffect(() => {
  if(formRef.current){
  formRef.current.setFieldsValue(values);
  }
},[values]);

  return (
    <Modal footer={null} open={visible} onCancel={()=>onCancel?.()}>
    <ProTable type='form'
     columns={columns}
     formRef={formRef}
     onSubmit={ async (value) => {
        onSubmit?.(value)}
    }
          />
    
    </Modal>
  );
      } 
export default UpdateModal;
