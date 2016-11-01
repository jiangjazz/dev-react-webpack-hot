import _ from 'lodash'
import { Notification } from 'UI'
/**
* 创建名称
* eg: name 2016-10-13 18:03
*/
export function createName(name) {
  if (!name) {
    throw 'name isRquest'
  }
  let time = ''
  let date = new Date()

  function add0(n) {
    return n > 9? n : '0' + n
  }

  let ymd = [
    date.getFullYear(),
    add0(date.getMonth() + 1),
    add0(date.getDate())
  ].join('-')

  let hm = [
    add0(date.getHours()),
    add0(date.getMinutes())
  ].join(':')

  return [name, ymd, hm].join(' ')
}

/**
* 首字母大写
* action => Action
*/
export function UpperFirst(str) {
  return str.substr(0, 1).toUpperCase() +　str.substring(1)
}

/*
* 排除数单一数组中的假数据，除0
**/
export function compacts(arr) {
  return _.filter(arr, n => {
    return !!n || n + '' === '0'
  })
}

/**
* 限制文本长度
* tip: 需求是限制展示汉字限制, 汉字默认为 2 个字节, 其他算 1个字节
*/
export function subString(str, num) {
  let defaultChartByte = 2
  let totalByte = 0
  let substringIndex = 0
  let substringByte = 0

  for(let i = 0; i < str.length; i++) {
    /[\u4e00-\u9fa5]/.test(str[0])? totalByte+=2 : totalByte++

    if (totalByte >= num*2) {
      substringIndex = i
      substringByte = totalByte
      break;
    }
  }

  return substringByte < num * 2? str : str.substr(0, substringIndex) + '...'
}

/**
* axios catch信息管理
*/
export function showCatchMessage(e) {
  if (e.response) {
    Notification.init({iconType: 'exclamation-triangle', content: e.response.data.data.message})
  } else {
    Notification.init({iconType: 'exclamation-triangle', content: e.message})
  }
}

/**
* 全选和单选
*
*/
export function findId(arr, id) {
  return _.indexOf(arr, id) > -1
}

export function pushAllId(data, idKeyName) {
  let arr = [];
  console.log(data)
  _.each(data.lists, (item, index) => {
    !data.is_lock? arr.push(item[idKeyName]) : null
  })
  return arr
}
