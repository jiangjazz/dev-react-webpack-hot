/**
* 过滤器 state 配置
**/
module.exports = {
  showActionModal: false,     // 编辑和创建模态框
  showDelModal: false,        // 删除模态框
  showSaveAlertModal: false,  // 是否要保存的模态框
  currentId: -1,              // 当前选择的id
  chooseId: [],               // 当前选择中的
  filterState: 'create',      // 编辑器状态  ( edit | create )
  TotalCheckStatus: false,    // 全选的状态
  dataLodingEnd: false,       // 页面全部数据是否加载完
  getListConfig: {            // 获取列表的配置
    page: 1,
    page_size: 20,
    keyword: '',
    order_by: '',
    order_sort: 'asc'
  },
  currentFilterName: '',    // 当前的编辑的名字
  currentFilterCom: [       //  当前过滤器的配置
    {"content":[{"name":"","operate":"","value":"","cate":"","type":""}]}
  ],
  searchResult: false,
  errorOf: false,
  isAjax: false,
  filterAjaxState: false
}
