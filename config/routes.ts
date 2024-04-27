export default [
  { path: '/user', name: '接口展馆', icon: 'book', component: './Index' },

  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/interface_info/:id',
    name: '查看接口',
    icon: 'smile',
    component: './InterfaceInfo',
    hideInMenu: true,
  },

  { path: '/user/login', layout: false, name: '登录', component: './User/Login' },
  { path: '/user/register', layout: false, name: '注册', component: './User/Register' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        icon: 'analysis',
        path: '/admin/interfaceinfoanalysis',
        component: './Admin/InterfaceInfoAnnlysis',
      },
    ],  
  },
  { path: '/', redirect: '/User/Login' },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
