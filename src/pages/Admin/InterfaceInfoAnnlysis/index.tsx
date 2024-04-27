
import {PageContainer} from '@ant-design/pro-components';
import ReactECharts from 'echarts-for-react';
import '@umijs/max';
import React, { useEffect,  useState } from 'react';
import { listTopInvokeInterfaceInfoUsingGet } from '@/services/Jmaxapi_backend/analysisController';




const InterfaceAnalysis: React.FC = () => {

  const [data,setData]=useState<API.InterfaceInfoVO[]>()


  useEffect(()=>{
    try {
      listTopInvokeInterfaceInfoUsingGet().then(res=>{
        if(res.data)
        setData(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  },[])

  const chartData= data?.map(item=>{
    return{
      value:item.totalNum,
      name:item.name
    }
  })


  // eslint-disable-next-line no-global-assign
  Option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '接口调用次数',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartData
      }
    ]
  };
  
  
  return (
    <PageContainer>
    <ReactECharts option={Option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
