import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Tooltip, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateModal';

import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet,
  offlineInterfaceInfoUsingPost,
  onlineInterfaceInfoUsingPost,
  updateInterfaceInfoUsingPost,
} from '@/services/Jmaxapi_backend/interfaceInfoController';
import CreateModal from './components/Createmodal';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [CreateModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败, ' + error.message);
      return false;
    }
  };

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在创建');
    try {
      await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      message.success('创建成功');
      actionRef.current?.reload();
      handleCreateModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败, ' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPost({
        id: currentRow.id,
        ...fields,
      });
      hide();
      message.success('修改成功');
      actionRef.current?.reload();
      handleUpdateModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('修改错误，' + error.message);
      return false;
    }
  };

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('正在发布');
    try {
      await onlineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('发布成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('发布失败, ' + error.message);
      return false;
    }
  };

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('正在创建');
    try {
      await offlineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('下线失败, ' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '此项为必填项' }],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      render: (description) => {
        return (
          <Tooltip title={description}>
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '40px',
                display: 'inline-block',
              }}
            >
              {description}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
    },
    // {
    //   title:'请求参数',
    //   dataIndex:'requestParams',
    //    valueType:'jsonCode',
    //   },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      render: (text: any) => {
        const jsonString = JSON.stringify(text);
        const displaytext =
          jsonString.length > 50 ? `${jsonString.substring(0, 50)}...` : jsonString;
        return (
          <Tooltip title={jsonString}>
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '40px',
                display: 'inline-block',
              }}
            >
              {displaytext}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      render: (text: any) => {
        const jsonString = JSON.stringify(text);
        const displaytext =
          jsonString.length > 50 ? `${jsonString.substring(0, 50)}...` : jsonString;
        return (
          <Tooltip title={jsonString}>
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '40px',
                display: 'inline-block',
              }}
            >
              {displaytext}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record); // 设置currentRow
            handleUpdateModalOpen(true);
          }}
        >
          <Button type="primary" ghost>
            修改
          </Button>
        </a>,
        !record.status ? (
          <a
            key="online"
            onClick={() => {
              handleOnline(record);
            }}
          >
            <Button type="primary" ghost>
              发布
            </Button>
          </a>
        ) : null,
        record.status ? (
          <a
            key="offline"
            onClick={() => {
              handleOffline(record);
            }}
          >
            <Button type="primary" ghost>
              下线
            </Button>
          </a>
        ) : null,
        <a
          key="config"
          onClick={() => {
            handleRemove(record);
          }}
        >
          <Button type="primary" danger ghost>
            删除
          </Button>
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (
          params: U & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
          sort: Record<string, SortOrder>,
          filter: Record<string, (string | number)[] | null>,
        ) => {
          const res = await listInterfaceInfoByPageUsingGet(params);
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total || 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={false}
      />

      <CreateModal
        columns={columns}
        onCancel={() => {
          handleCreateModalOpen(false);
        }}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        visible={CreateModalOpen}
      />

      <UpdateForm
        columns={columns}
        values={currentRow}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
        }}
        visible={updateModalOpen}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.InterfaceInfo>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.InterfaceInfo>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
