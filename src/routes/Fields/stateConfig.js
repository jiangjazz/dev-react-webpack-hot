module.exports = {
  TotalCheckStatus: false,    // 全选的状态
  currentId: -1,              // 当前选择的id
  chooseId: [],               // 当前选择中的
  getListConfig: {            // 获取列表的配置
    page: 1,
    page_size: 20,
    keyword: '',
    order_by: '',
    order_sort: 'asc'
  },
  currentData: {},
  ActionModalState: 'create',
  showActionModal: false,
  showDelAlertModal: false,
  searchResult: false,
  isAjax: false,
  FiledAjaxState: false
}
