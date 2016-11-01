import React from 'react'
import _ from 'lodash'
import {
  Radio,
  Input,
  InputGroup,
  InputNumber,
  Icon,
  SelectMulti,
  Datetimepicker
 } from 'UI'

import baseState from '../stateConfig'
import { compacts } from '../public/tool'
import { YearsSel, MonthSel, DaySel, ABSel, DateTypeSel } from './DateSelect'

/**
* 解析过滤器 json, 生成 react dom
* @param {Object} _this      当前 react组件this 对象
* @param {Object} dataList   过滤器列表数据
* @param {Object} fieldType  字段类型数据
* @param {Object} fieldAll   字段列表数据
*/
export function resolveFilter(_this, dataList, fieldType, fieldAll, errorOf) {
  let contentItem = null
  let filedSelectConfig = []
  let filterCate = ['is empty', 'is not empty']

  //  用于配合select组件参数结构
  _.each(fieldAll.lists,
    (val) => {
    filedSelectConfig.push(val)
  })
  /**
  * 生成过滤器列表组
  * 两侧循环
  */
  let filterItem = _.map(dataList, (arrVal, index) => {
    let arrValRadioName = arrVal.type + (index + Math.random())
    //  content -> group
     contentItem = _.map(arrVal.content, (Valcontent, i) => {
       let ValcontentRadioName = Valcontent.type + (index + Math.random())
      return (
        <div
          className="page-filter-action__item"
          key={'FilterGroup_' + Valcontent.name + i} >
          <div className="page-filter-action__info">
            <div
              className="page-filter-action__remove"
              onClick={ filterDel.bind(_this, index, i) }>
              <Icon type="remove-o"></Icon>
            </div>
            <SelectMulti
              type="type2"
              replace
              text={ !Valcontent.name? '选择字段' : Valcontent.name }
              liDates = {
                _.map(filedSelectConfig, (mapData) => {
                return {text: mapData.name, onClick: chooseSelect.bind(_this, index, i, mapData)}
              })}
            >
            </SelectMulti>
            <SelectMulti
              type="type2"
              replace
              text={ !Valcontent.operate? '选择运算' : Valcontent.operate }
              liDates = {
                _.map(fieldType[Valcontent.cate], (filedData) => {
                return {text: filedData, onClick: chooseSelect.bind(_this, index, i, {operate: filedData}, true)}
              })}
            >
            </SelectMulti>
            {/* 这里会根据组件而生成不一样的控件 */}
            <div className="page-filter-action__Combox" data-id={ errorOf && !Valcontent.value }>
              { getWidget.call(_this, Valcontent, index, i) }
            </div>
          </div>
          {
            /* 错误项目 */
            errTip(errorOf, Valcontent, filterCate)
          }
          {
            /* 如果有type值 则出现选项 */
            (Valcontent.type || (index + 1) == dataList.length)?
            <div className="page-filter-action__typeChose" >
              <Radio
                distance={5}
                name={ ValcontentRadioName }
                checked={ Valcontent.type === 'AND' }
                onChange={ filterAction.bind(_this, index, i, 'AND') }>并且</Radio>
              <Radio
              distance={5}
              name={ ValcontentRadioName }
              checked={ Valcontent.type === 'OR' }
              onChange={ filterAction.bind(_this, index, i, 'OR') }>或者</Radio>
            </div> : null
          }
      </div>
    )
    })
    /* 两个块之间的 type 类型 */
    arrVal.type? contentItem.push(<div className="page-filter-action__typeChose" key={'typeChose_' + index}>
      <Radio
        distance={5}
        name={ arrValRadioName }
        checked={ arrVal.type === 'AND' }
        onChange={ filterActionGroupTypeChange.bind(_this, arrVal, 'AND') }>并且</Radio>
      <Radio
        distance={5}
        name={ arrValRadioName }
        checked={ arrVal.type === 'OR' }
        onChange={ filterActionGroupTypeChange.bind(_this, arrVal, 'OR') }>或者</Radio>
    </div>) : null

    return (
      <div className="page-filter-action__group" key={ 'childCom_' + index }>
        { contentItem }
      </div>
    )
  })
  return filterItem
}

//  检查每以个 value 是否符合规定
function errTip(errorOf, Valcontent, filterCate) {
  let errorState = false
  if (errorOf  && filterCate.indexOf(Valcontent.cate) == -1) {
    if (!Valcontent.value) {
      errorState =  true
    } else if(Valcontent.operate == 'is between') {
      console.log(Valcontent.value)
      Valcontent.value === ','? errorState = true : null;
      (Valcontent.value !== ',' && compacts(Valcontent.value.split(',')).length !==2)? errorState = true : null;
    }
  }

  return errorState? <p className="page-filter--error">你有选项没有填</p> : null
}

/**
* 过滤器前两个选择的方法
* @param {Object} index         父层索引
* @param {Object} i             子层索引
* @param {Object} filedData     字段数据
* @param {type} 下拉选项   1  字段选择  2 过滤选择
*/
function chooseSelect(index, i, filedData, type) {
  let newFilterCom = this.state.currentFilterCom;
  let value = ''
  let date = new Date()
  switch(filedData.operate) {
    case 'is day of month':
      value = date.getDate();
      break;
    case 'is in month':
      value = date.getMonth() +1;
      break;
    case 'is in year':
      value = date.getFullYear();
      break;
  }

  //  现在索引位置
  if (!type) {
    _.merge(newFilterCom[index].content[i], { cate: filedData.type, name:  filedData.name, value: '', operate: ''})
  } else {
    newFilterCom[index].content[i].value = value
    _.merge(newFilterCom[index].content[i], filedData)
  }

  this.setState({
    currentFilterCom: newFilterCom,
    errorOf: false
  })
}

/**
* 块之间的 type 变换
*  @param arrVal        父级数据
*  @param arrVal        组织之间的关系 OR | AND
*  @param childrenIndex 子索引
*/
function filterActionGroupTypeChange(arrVal, type, childrenIndex) {
  let newFilterCom = this.state.currentFilterCom
  let i = newFilterCom.indexOf(arrVal) // 父级索引
  let theNewCom = newFilterCom[i]

  if (type === 'AND') {
    /**
    * 合并: 需要把 type 下一个的type, 合拼下一个数组, 然后删除原先数组
    */

    // step1: type变换
    theNewCom.type = newFilterCom[i + 1].type
    theNewCom.content[theNewCom.content.length -1].type = 'AND'

    // step2: 数据合拼
    newFilterCom[i].content = _.concat(newFilterCom[i].content, newFilterCom[i + 1].content)

    // step3: 删除合拼的数据
    newFilterCom.splice(i + 1, 1)
  } else {
    /**
    * 拆分: 需要把 type 下一个的type, 合拼下一个数组, 然后删除原先数组
    */

    // step1: 分割数组
    let splitRightArr = _.drop(theNewCom.content, (childrenIndex + 1))
    let slpitLeftArr = _.dropRight(theNewCom.content, (theNewCom.content.length - childrenIndex - 1) )

    // step2: 重新定义数组 改变数组关系
    newFilterCom[i].content = splitRightArr
    newFilterCom.splice(i,  0, {content: slpitLeftArr})
    newFilterCom[i].type = 'OR'
    newFilterCom[i].content[newFilterCom[i].content.length - 1].type = ''

  }


  //  更新数据状态
  this.setState({
    currentFilterCom: newFilterCom
  })
}

/**
* 组之间的 type 变换
*  @param index      父级索引
*  @param index      组织之间的关系 OR | AND
*  @param i         子索引
*/
function filterAction(index, i, type) {
  let newFilterCom = this.state.currentFilterCom;
  let length = 0;
  let baseConfig = {
     "name": "",
     "operate": "",
     "value": "",
     "cate": "",
     "type": ""
 }

  //  子父级都要在最后一个的时候才是添加
  let isAdd = ( index == (newFilterCom.length -1) ) &&　(i == newFilterCom[index].content.length -1)

  if (isAdd) {
    _.each(newFilterCom, (val) => {
      length += val.content.length
    })

    if (length >= 3) return false;
    //  添加过滤组
    type == 'AND'? pushNewItem() : pushNewGroup()
  } else {
    filterActionGroupTypeChange.call(this, newFilterCom[index], type, i)
  }
  /**
  * 并且: 如果是最后一个的话, 往里面加一个基础配置
  */
  function pushNewItem() {
    let content = newFilterCom[index].content
    content[content.length-1].type = 'AND'
    content.push(baseConfig)
  }

  /*
  * 或者: 要拆分数据, 往下面一个组中添加一个数据 并改变 type
  **/
  function pushNewGroup() {
    newFilterCom[index].type = 'OR'
    newFilterCom.push({content: [baseConfig], type: ''})
  }

  //  更新数据状态
  this.setState({
    currentFilterCom: newFilterCom
  })
}

/*
* 过滤器编辑删除
* @parma {Number} index  父索引
* @param {Number} i      子索引
**/
function filterDel(index, i) {
  let newFilterCom = this.state.currentFilterCom;

  //  只有一条的时候
  if (newFilterCom.length === 1 && newFilterCom[0].content.length === 1) return false;

  //  头部删除逻辑
  if (newFilterCom.length == 1 && index == 0) {
    let headContent = newFilterCom[index].content;
    if (i == headContent.length -1) {
      headContent[i-1].type = ''
    }
    headContent.splice(i, 1)
  }

  if (newFilterCom.length > 1) {
    /**
    * 加入不是第一条 且 条数只有一条的情况下直接删除
    */
    if (newFilterCom[index].content.length == 1) {

      if (index == newFilterCom.length -1) {
        newFilterCom[index -1].type = ''
      }
      newFilterCom.splice(index, 1)
    } else {

      if (i == newFilterCom[index].content.length -1) {
        newFilterCom[index].content[i-1].type = ''
      }
      newFilterCom[index].content.splice(i, 1)
    }

  }

  this.setState({
    currentFilterCom: newFilterCom
  })
}

//  控件判断
function getWidget(Valcontent, index, i) {
  /**
  * type :  控件名称
  * value:  编辑情况下的话的默认值
  * index:  父级的索引
  * i: 子级的索引
  *
  **/
  let type = Valcontent.operate

  let { value = '', cate } = Valcontent

  let widgetName = null

  //  控件分类 3种
  let perSonWidget = (val='', placeholder='') => {
    switch(cate) {
      case 'string':
        return <Input value={ val } placeholder={placeholder} onChange={ getWidgetInput.bind(this, index, i) }/>
        break;
      case 'integer':
        return <InputNumber defaultValue={ val } onChange={ getWidgetInput.bind(this, index, i, event) } />
        break;
      case 'date':
        return <Datetimepicker defaultText={val} mode="date" inputFormat="YYYY-MM-DD" onChange={ getDateChange.bind(this, index, i) }/>
        break;
    }
  }

  //  控件输入框和类型
  switch (type) {
    case 'matches':
    case 'does not match':
    case 'starts with':
    case 'ends with':
    case 'contains':
    case 'does not contains':
    case 'is greater than':
    case 'is smaller than':
    case 'is before':
    case 'is after':
      widgetName = perSonWidget(value)
      break;
    case 'is empty':
    case 'is not empty':
      break;
    case 'is in year':
      widgetName = <YearsSel
                      defaultValue={ value }
                      selectYear={ getDateChange.bind(this, index, i) }
                    />
      break;
    case 'is in month':
      widgetName = <MonthSel
                      defaultValue={ value }
                      selectMonth={ getDateChange.bind(this, index, i) }
                    />
      break;
    case 'is day of month':
      widgetName = <DaySel
                      defaultValue={ value }
                      selectDay={ getDateChange.bind(this, index, i) }
                    />
      break;
    case 'is one of the values':
    case 'is not one of the values':
      widgetName = perSonWidget(value, "请用英文逗号分隔开")
      break;
    case 'dynamic match':
      let vals = value.split(',')
      widgetName = (
        <div className="page-filter-widgrt__match" ref={'ipt_dateMatch_box_' + index + i}>
          <InputNumber
            defaultValue={ vals[0] }
            onBlur={ selMatch.bind(this, index, i) }
          />{' '}
          <DateTypeSel
            defaultValue={ vals[1] }
            selectDateType={ selMatch.bind(this, index, i) }
          />{' '}
          <ABSel
            defaultValue={ vals[2] }
            selectAB={ selMatch.bind(this, index, i) }
          />
        </div>
      )
      break;
    case 'is between':
      let datas = value.split(',')
      widgetName = cate != 'date'?
              (<div className="page-filter-widgrtBT" ref={ 'ipt_number_box_'+index+i } >
                <InputNumber
                  defaultValue={ datas[0]? datas[0] : ''}
                  onBlur={ BetweentNumber.bind(this, index, i) }
                />
                <span style={{padding:"0 5px"}}>和</span>
                <InputNumber
                  defaultValue={ datas[1]? datas[1] : ''}
                  onBlur={ BetweentNumber.bind(this, index, i) }
                />
              </div>
            ) :
            (
              <div className="page-filter-widgrtBT" ref={'ipt_number_box_'+index+i} >
                <Datetimepicker
                  defaultText={ datas[0]? datas[0] : '' }
                  mode="date"
                  inputFormat="YYYY-MM-DD"
                  onChange={ BetweentDate.bind(this, index, i, 0) }
                />
                <span style={{padding:"0 5px"}}>和</span>
                <Datetimepicker
                  defaultText={ datas[1]? datas[1] : '' }
                  mode="date"
                  inputFormat="YYYY-MM-DD"
                  onChange={ BetweentDate.bind(this, index, i, 1) }
                />
              </div>
            )
      break;

  }

  return widgetName
}

/**
* 控件单个输入事件
* @parma {Number} index  父索引
* @param {Number} i      子索引
* @oaram {Object} ev     React event 参数
*/
function getWidgetInput(index, i, ev, number) {
  let cateType = this.state.currentFilterCom[index].content[i].cate
  let val = cateType === 'integer'? number : ev.target.value

  readData.call(this, index, i, val)
}

/**
* 当个日期改变事件
*/
function getDateChange(index, i, date) {
  let val = date;
  if (date.length > 7) {
    let dates = new Date(parseInt(date));
    val = [dates.getFullYear(), dates.getMonth()+1, dates.getDate()].join('-')
  }

  readData.call(this, index, i, val)
}

/**
* 日期控件之间的事情
*/
function BetweentDate(index, i, sIndex, date) {
  /**
  *  由于 dom 上的数据是由 setState 设置的的为异步
  *  这里用jq 获取也是用异步来获取
  */
  _.defer(()=> {
    let date_value = $(this.refs.action_modal.refs['ipt_number_box_'+index+i]).find('.u-input__datepick')
    let result = _.compact([date_value.eq(0).val(), date_value.eq(1).val()])

    if (result.length !== 2) return false;
    readData.call(this, index, i, result.join(','))
  })
}

/**
* 动态匹配函数
*/
function selMatch(index, i, date) {
  /**
  *  由于 dom 上的数据是由 setState 设置的的为异步
  *  这里用jq 获取也是用异步来获取
  */
  _.defer(() => {
    let $box = $(this.refs.action_modal.refs['ipt_dateMatch_box_' + index + i])
    let $select = $box.find('.u-select')

    //  收集 value 数据
    let $number = $box.find('.u-input__number__action')[0].getAttribute('data-value')
    let $dataType = $select.eq(0).find('.u-hd').text()
    let $abType = $select.eq(1).find('.u-hd').text()

    //  过滤数据
    let result = _.filter([$number, $dataType, $abType], (n) => { return n !== '[选择]' })
    result = compacts(result)

    if (result.length !== 3) return false;

    readData.call(this, index, i, result.join(','))
  })
}

/**
* 控件数字两个输入框事件
* @parma {Number} index  父索引
* @param {Number} i      子索引
* @oaram {Number} val    Inputnumber 参数 输入的数值
* @oaram {Object} e      Inputnumber 参数 输入时候 event 参数
*/
//  数字控件之间的事件
function BetweentNumber(index, i, val) {
  let number_value = $(this.refs.action_modal.refs['ipt_number_box_'+index +i]).find('.u-input__number__action')
  let temNumber = 0;

  let result = _.map(number_value, (node) => {
    return node.getAttribute('data-value')
  })

  if (result.length !== 2) return false;
  readData.call(this, index, i, result.join(','))
}

/**
* 写入数据
*/
function readData(index, i, val) {
  let newFilterCom = this.state.currentFilterCom
  newFilterCom[index].content[i].value = val

  this.setState({
    currentFilterCom: newFilterCom,
    errorOf: false
  })
}
