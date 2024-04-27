import MyCard from '@/pages/Index/component/MyCard';
import { listInterfaceInfoByPageUsingGet } from '@/services/Jmaxapi_backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { Divider, List } from 'antd';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await listInterfaceInfoByPageUsingGet({
        pageSize: 5,
        current: page,
      });

      if (res.data?.records && res.data?.records.length > 0) {
        // 对已存在的老数据进行拼接
        setList((prevList) => [...prevList, ...(res.data.records as API.InterfaceInfo[])]);
        // 递增页码
        setPage((prevPage) => prevPage + 1);
      } else {
        // 无新数据时，不再进行加载
        setHasMore(false);
      }
    } catch (error: any) {
      console.log('请求失败' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="接口展馆">
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={loadData}
        hasMore={!loading && hasMore}
        useWindow={true}
      >
        <List
          dataSource={list}
          renderItem={(item) => {
            return (
              <List.Item 
              style={{
                width: '100%' 
              }}
              >
                {/* <List.Item.Meta
                      style={{ flex: 1 }}
                      title={<a href={apilink}>{item.name}</a>}
                    />
                    <div style={{ flex: 2 }}>{item.description}</div> */}
                <MyCard name={item.name} description={item.description} id={item.id} method={item.method}  status={item.status}/>
              </List.Item>
            );
          }}
        />
        {!hasMore && <Divider plain>已经是全部啦 🤐</Divider>}
      </InfiniteScroll>
    </PageContainer>
  );
};

export default Index;
