import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

// 错误处理方案： 错误类型  预定义的枚举值
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {

  withCredentials: true,

  baseURL: 
  'http://localhost:7529' ,
  
  requestInterceptors: [
    (config: RequestOptions) => {
        const token = sessionStorage.getItem("token");  // 从你的业务逻辑中获取token
        // 添加请求头
        if (token) {
            config.headers.Authorization = token;
        }
        // 允许携带凭证信息
      config.credentials = 'include';
      return { ...config};
    },
  ],


  
// 响应拦截器

responseInterceptors: [
  (response) => {
    // 拦截响应数据，进行个性化处理
    const { data } = response as unknown as ResponseStructure;
    if(data.code === 40100){
      const urlParams = new URL(window.location.href).searchParams;
      const redirectUrl = urlParams.get('redirect');

      if(redirectUrl!=null){
        history.push('/user/login' + redirectUrl);
      }
      return response;
    }
    if (data?.code !== 0) {
      message.error( data.message);

    }
    return response;
  },
],
};