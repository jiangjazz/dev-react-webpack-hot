import React, { Component } from 'react'

import {
  Input,
  InputGroup,
  Button,
  ButtonGroup,
  Tooltips,
  Icon,
  Checkbox,
  Notification,
  Modal
 } from 'UI'

import FieldsMatchingBreadcrumb from './otherComponents/breadcrumb'
import FieldsMatchingTableHead from './otherComponents/tableHead'
import FieldsMatchingList from './otherComponents/list'
import MATCHING_InportModal from './otherComponents/inportModal'

class FieldsMatchingView extends Component{
  static contextTypes = {
      router: React.PropTypes.object
  }
  constructor(props) {
    super(props)
    const {
      _localCSV
    } = props.public
    this.state = {
      listData: [],
      // 当前表头
      activeHead: [],
      // 当前联系人组的一些数据
      CSVData: undefined,
      /**
       * 导入模态框
       */
      // 导入模态框显示状态
      showInputModal: false,
      /**
       * 中断提示
       */
      showPromptModal: false,
      /**
       * 左右滑动模块
       */
      // 单个单元格宽度
      itemWidth: 150,
      // 偏移量
      offsetDistance: 0,
      // 最大偏移量
      maxOffset: 1
    }
  }
  // 获取数据成功后初始化
  resetState(res, _CSVData) {
    const email = new RegExp(/^[^@\.]*@[^@\.]{2,}\.[^@\.]{2,}$/gui)
    const mobile = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/gui)
    let resetArr = []

    if ( res != undefined ) {

      resetArr = res.rows[0].map( (item) => {
         return email.test(item)
            ?'email'
            :mobile.test(item)
            ?'mobile'
            :'#ignore'
      } )
    } else {
      this.context.router.push('/')
    }

    this.setState({
      activeHead: resetArr,
      CSVData: _CSVData
    })
  }
  // 最终添加联系人
  addContact(status) {
    const _this = this
    const {
      activeHead,
      CSVData
    } = this.state
    const {
      Remove_LocalCSV
    } = this.props
    if ( CSVData.from === 'addGroup') {
      this.props.addToGroup({
        csv_head: activeHead,
        status,
        ...CSVData
      }, (res) => {
        Notification.init({
          iconType: 'check-circle',
          content: '导入成功',
          onClose () {
            _this.context.router.push('/')
          }
        })
        Remove_LocalCSV()
      })
    } else {
      this.props.addToSingle({
        csv_head: activeHead,
        status,
        ...CSVData
      }, (res) => {
        Notification.init({
          iconType: 'check-circle',
          content: '导入成功',
          onClose () {
            _this.context.router.push('/')
          }
        })
        Remove_LocalCSV()
      })
    }
    console.log(12312312)
  }
  // 取消导入
  cancel() {
    this.context.router.push('/')
    this.props.Remove_LocalCSV()
  }
  // 获取表头数据
  getHeadItem() {
    const {
      _localCSV
    } = this.props.public
    if ( _localCSV == undefined ) {
      return []
    } else {
      return _localCSV.rows[0]
    }
  }
  // 列表
  getListItem() {
    const {
      activeHead,
      itemWidth,
      offsetDistance
    } = this.state

    const {
      _localCSV
    } = this.props.public

    if ( _localCSV == undefined ) {
      return null
    } else {
      return (
        _localCSV.rows.map( (item, index) => {
          return (
            <FieldsMatchingList
              activeHead={ activeHead }
              key={ '_fieldsmatching' + index }
              index={ index }
              item={ item }
              itemWidth={ itemWidth }
              offsetDistance={ offsetDistance }
              >
            </FieldsMatchingList>
          )
        })
      )
    }
  }

  // 左右移动
  setOffset(arrow) {
    const {
      offsetDistance,
      itemWidth
    } = this.state
    const {
      _localCSV
    } = this.props.public

    const step = $(this.refs.head.refs.offsetCt).width()
    let maxOffset = _localCSV.rows[0].length * itemWidth - step
    maxOffset = maxOffset<0? 0: maxOffset
    let offset = offsetDistance

    if ( arrow === 'left') {
      if ( offset - step <= 0 ){
        offset = 0
      } else {
        offset = offset - step
      }
    } else {
      if ( offset + step >= maxOffset ){
        offset = maxOffset
      } else {
        offset = offset + step
      }
    }
    console.log(offset)
    this.setState({
      offsetDistance: offset,
      maxOffset
    })
  }

  resizeMaxoffset() {
    const {
      itemWidth
    } = this.state
    const {
      _localCSV
    } = this.props.public

    const step = $(this.refs.head.refs.offsetCt).width()
    let maxOffset = _localCSV.rows[0].length * itemWidth - step
    maxOffset = maxOffset<0? 0: maxOffset

    this.setState({
      maxOffset
    })
  }

  // 初始化
  componentWillMount() {
    const _this = this
    $(window).on('resize', this.resizeMaxoffset.bind(this))

    // 获取cookie CSV数据
    this.props.Get_LocalCSV(
      // successFN
      this.resetState.bind(this)
    )
    // 获取字段信息
    this.props.getFields({},
      // successFN
      () => {
        _this.resizeMaxoffset()
      }
    )

  }
  componentWillUnmount() {
    $(window).off('resize')
  }
  render() {
    const {
      listData,
      activeHead,
      showInputModal,
      CSVData,
      status,
      showPromptModal,
      itemWidth,
      offsetDistance,
      maxOffset
    } = this.state

    const {
      loading,
      fieldsArr
    } = this.props.FieldsMatching

    const {
      _localCSV
    } = this.props.public

    console.log(maxOffset)

    return (
      <div className="page-fieldsMatching">
        <div className={ ['u-loading', 'iconfont', loading? '': 'f-dn'].join(' ')}></div>

        {/* 中断匹配 */}
        <Modal
          size="s"
          showModal={ showPromptModal }
          title="您是否中断匹配"
          onClose={ () => this.setState({showPromptModal: false}) }
          onSure={ this.cancel.bind(this) }
          >
          <p>
            尚未完成匹配，取消则无法继续进行联系人导入工作，确认取消吗？
          </p>
        </Modal>
        {/* 中断匹配 end*/}

        {/* 导入设置 */}
        <MATCHING_InportModal
          showModal={ showInputModal }
          fieldsArr={ fieldsArr }
          onClose={ () => this.setState({showInputModal: false}) }
          onSure={ this.addContact.bind(this) }
          >
        </MATCHING_InportModal>
        {/* 导入设置 end*/}

        <div className="top-nav">
          <FieldsMatchingBreadcrumb />
        </div>
        <div className="m-dataList__wrap" style={{padding: '0 20px'}}>
          {
            fieldsArr.length?
            <div className="m-listTable__head">
              {
                offsetDistance !== 0 ?
                <Icon className="arrLeft" type="arrow-circle-left"
                  onClick={ this.setOffset.bind(this, 'left') }
                  />
                : null
              }
              {
                offsetDistance < maxOffset?
                <Icon className="arrRight" type="arrow-circle-right"
                  onClick={ this.setOffset.bind(this, 'right') }
                  />
                : null
              }

              {/* 表头 */}
              <FieldsMatchingTableHead
                ref="head"
                itemWidth={ itemWidth }
                offsetDistance={ offsetDistance }
                item={ this.getHeadItem() }
                fieldsArr={ fieldsArr }
                onEachClick= { (index, value) => {
                  let arr = this.state.activeHead
                  arr[index] = value
                  this.setState({
                    activeHead: arr
                  })
                } }
              ></FieldsMatchingTableHead>
              {/* 表头 end*/}
            </div>
            :null
          }
          <div  className="m-listTable__content">
            {
              (activeHead.length && _localCSV != undefined)?
              this.getListItem()
              :null
            }
          </div>
          <div className="ul-footer">
            <Button
              onClick={ () => this.setState({showPromptModal: true}) }
              >
              取消
            </Button>
            <Button
              color="main"
              onClick={ () => this.setState({showInputModal: true}) }
              >
              下一步
            </Button>
          </div>
        </div>


      </div>
    )
  }

}

export default FieldsMatchingView
