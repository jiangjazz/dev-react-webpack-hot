import React, { Component } from 'react'

import {
  Input,
  InputGroup,
  Button,
  ButtonGroup,
  Select,
  SelectItem,
  Tooltips,
  Icon,
  Checkbox,
  Notification,
  Modal
 } from 'UI'

import AddContactBreadcrumb from './otherComponents/breadcrumb'
import AddContactTableHead from './otherComponents/tableHead'
import AddContactList from './otherComponents/list'
import ADDCONTACT_InportModal from './otherComponents/inportModal'

class AddContactView extends Component{
  static contextTypes = {
      router: React.PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      addList: [],
      // 传输的部分参数
      ajaxSet: {},
      // 偏移量
      offsetDistance: 0,
      // 最大偏移量
      maxOffset: 1,
      // 单个单元格的宽度
      itemWidth: 150,
      /**
       * 导入模态框
       */
      // 导入模态框显示状态
      showInputModal: false,
      /**
       * 中断提示
       */
      showPromptModal: false
    }
  }
  // 新建一个lst
  newOneList(fieldsArr) {
    return Object.assign({_key_: Math.random()}, ...(fieldsArr.map(
        (item) => {return {[item.name]: ''}}
      ))
    )
  }
  /**
   * [newLists 增加行数]
   * @param {[type]} fieldsArr [字段列表]
   * @param {[type]} num       [增加数量]
   */
  newLists(fieldsArr = [], num=1, ...attr) {
    let {
      addList
    } = this.state
    for(let i = 0; i<num; i++){
      addList.push(this.newOneList(fieldsArr))
    }
    // addList = addList.concat( new Array(num).fill(listObj) )

    this.resizeMaxoffset()
    this.setState({
      addList
    })
  }
  // 删除一行
  removeList(index) {
    console.log('删除list'+ index)
    let {
      addList
    } = this.state
    console.log(addList)
    addList.splice(index, 1)
    console.log(addList)
    this.setState({
      addList
    })
  }
  // 重置state数据
  resetState(ajaxSet) {
    console.log(ajaxSet)
    if ( ajaxSet == undefined ) {
      this.context.router.push('/')
    }

    this.setState({
      ajaxSet
    })
  }
  // 左右移动
  setOffset(arrow) {
    const {
      offsetDistance,
      itemWidth
    } = this.state
    const {
      fieldsArr
    } = this.props.AddContact
    const step = $(this.refs.head.refs.offsetCt).width()
    let maxOffset = fieldsArr.length * itemWidth - step
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
      fieldsArr
    } = this.props.AddContact
    
    const step = $(this.refs.head.refs.offsetCt).width()
    let maxOffset = fieldsArr.length * itemWidth - step
    maxOffset = maxOffset<0? 0: maxOffset

    this.setState({
      maxOffset
    })
  }

  // 修改input数据触发修改数据
  modifyData(index, name, value) {
    const {
      addList
    } = this.state

    addList[index][name] = value
    this.setState({
      addList
    })
  }
  // 保存数据（完成添加工作）
  saveData(status) {
    const _this = this
    const {
      addList,
      ajaxSet
    } = this.state
    console.log(ajaxSet)
    if ( ajaxSet.from === 'addGroup') {
      this.props.addToGroup({
        type_data: addList,
        status,
        ...ajaxSet
      }, (res) => {
        Notification.init({
          iconType: 'check-circle',
          content: '导入成功',
          onClose () {
            _this.context.router.push('/')
          }
        })
        this.props.Remove_Local_ADDCONTACTS()
      })
    } else {
      this.props.addToSingle({
        type_data: addList,
        status,
        ...ajaxSet
      }, (res) => {
        Notification.init({
          iconType: 'check-circle',
          content: '导入成功',
          onClose () {
            _this.context.router.push('/')
          }
        })
        this.props.Remove_Local_ADDCONTACTS()
      })
    }
    console.log(12312312)
  }
  // 取消新增
  cancel() {
    console.log('取消')
    this.context.router.go('-1')
    this.props.Remove_Local_ADDCONTACTS()
  }
  // 初始化
  componentWillMount() {
    const _this = this
    $(window).on('resize', this.resizeMaxoffset.bind(this))

    this.props.getFields({}, this.newLists.bind(this))
    // 获取cookie Local数据
    this.props.Get_Local_ADDCONTACTS(
      // successFN
      this.resetState.bind(this)
    )
  }

  componentWillUnmount() {
    $(window).off('resize')
  }
  render() {
    const {
      addList,
      offsetDistance,
      itemWidth,
      showInputModal,
      showPromptModal,
      maxOffset
    } = this.state

    const {
      loading,
      _data,
      fieldsArr
    } = this.props.AddContact

    const {
      list_id,
      user_id
    } = this.props.params

    return (
      <div className="page-addContact">
        <div className={ ['u-loading', 'iconfont', loading? '': 'f-dn'].join(' ')}></div>

        {/* 中断匹配 */}
        <Modal
          size="s"
          showModal={ showPromptModal }
          title="您是否中断添加"
          onClose={ () => this.setState({showPromptModal: false}) }
          onSure={ this.cancel.bind(this) }
          >
          <p>
            尚未完成添加，取消则无法继续进行联系人添加工作，确认取消吗？
          </p>
        </Modal>
        {/* 中断匹配 end*/}

        {/* 导入设置 */}
        <ADDCONTACT_InportModal
          showModal={ showInputModal }
          fieldsArr={ fieldsArr }
          onClose={ () => this.setState({showInputModal: false}) }
          onSure={ this.saveData.bind(this) }
          />
        {/* 导入设置 end*/}

        <div className="top-nav">
          <AddContactBreadcrumb />
        </div>

        <div className="m-dataList__wrap" style={{padding: '0 20px 20px 20px'}}>
          <div className="m-dataList__wrap_ct">
            <div className="titleGroup">
              <span className="title">
                手动添加联系人
              </span>

              {
                  (fieldsArr.length != 0)?
                  <div className="act">
                    <Select
                      text="新增多行"
                      color="main"
                      position="bottomRight"
                      className="newMore_select"
                      >
                      {
                        [
                          {text: '新增5行', onClick: this.newLists.bind(this, fieldsArr, 5)},
                          {text: '新增10行', onClick: this.newLists.bind(this, fieldsArr, 10)},
                          {text: '新增30行', onClick: this.newLists.bind(this, fieldsArr, 30)},
                          {text: '新增50行', onClick: this.newLists.bind(this, fieldsArr, 50)}
                        ].map(( item, index ) => {
                          return (
                            <SelectItem key={ '_selItem'+ index }
                              onClick={ item.onClick }
                              text={ item.text }
                              />
                          )
                        })
                      }
                    </Select>
                    <Button
                      color="main"
                      type="radius-half"
                      size="small"
                      outline
                      onClick={ this.newLists.bind(this, fieldsArr, 1)}
                      >
                      新增一行
                    </Button>
                  </div>

                  : null
                }

            </div>
            <div className="otherData">
              共添加{ addList.length }位联系人
            </div>

            {
              (fieldsArr.length != 0)?
              <div className="m-table__head">
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
                  <AddContactTableHead
                    ref="head"
                    offsetDistance={ offsetDistance }
                    fieldsArr={ fieldsArr }
                    itemWidth={ itemWidth }
                    >
                  </AddContactTableHead>
                {/* 表头 end*/}
              </div>
              :null
            }
            {
              (fieldsArr.length != 0)
              ?<div  className="m-table__content">
                {
                  addList.map( (item, index) => {
                    return (
                      <AddContactList
                        key={ item._key_ }
                        index={ index }
                        offsetDistance={ offsetDistance }
                        fieldsArr={ fieldsArr }
                        itemWidth={ itemWidth }
                        modifyData={ this.modifyData.bind(this, index) }
                        >
                        <Icon type="remove-o"
                          onClick={ this.removeList.bind(this, index) }
                          />
                      </AddContactList>
                    )
                  })
                }
              </div>
              : null
            }
            {
              (fieldsArr.length != 0)?
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
              : null
            }
          </div>
        </div>

      </div>
    )
  }

}

export default AddContactView
