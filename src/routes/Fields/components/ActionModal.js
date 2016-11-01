import React, { Component } from 'react'
import _ from 'lodash'
import {
  Modal,
  Input,
  Radio,
  Tooltips,
  Icon,
  Select,
  SelectItem
} from 'UI'



class ActionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filedType: [
        {text: '文本', cate: 'string'},
        {text: '数字', cate: 'integer'},
        {text: '日期', cate: 'date'},
      ],
      addFieldConfig: {
        filedName: '',
        filedDec: '',
        filedType: '',
        is_unique: false
      },
      updateUni: null,
      updateStatus: null,
      errorOf: false,
      isCancelModalShow: false,
      changeUniqueModal: false
    }
  }

  render() {
    let _this = this
    let { show, actionType, closeModal, state, currentData } = this.props
    let { filedType, addFieldConfig, errorOf, isCancelModalShow, changeUniqueModal } = this.state
    let typeText = filedType[_.findIndex(filedType, {cate: currentData.type})]

    return (
      <div>
       {/** 主要操作模态框 **/}
        <Modal
          onSureLoding = { this.props.onSureLoding }
          showModal={ this.props.show }
          title="添加字段"
          cancelText={ actionType == 'see'? '关闭': '取消' }
          showSureButton={ actionType == 'see'? false : true }
          onClose={ this.onAddFileCancel.bind(this) }
          onSure={ this.onAddFileSure.bind(this) }
        >
          <div className="page-field-group">
            <div className="page-field-item u-row">
              <h4 className="page-field-item-name u-col-4">字段名</h4>
              <div className="u-col-20">
                <Input
                  disabled={ actionType != 'create' }
                  defaultValue={ currentData.name }
                  placeholder="请输入字段名称，仅支持英文字符"
                  error={ errorOf && !addFieldConfig.filedName? true : false && actionType == 'create'}
                  addClassName="page-field-item--mw"
                  onChange={ this.onAddFileTextChange.bind(this, 'filedName') }
                  onKeyUp={
                    (e) => {
                      let keyCode = [37,38,39,40,8,13]
                      if (keyCode.indexOf(e.keyCode) > -1 && e.ctrlKey) return false;

                      e.target.value = _.filter(e.target.value, (n) => {
                        return /[a-zA-Z]/g.test(n)
                      }).join('')
                    }
                  }
                  />
                  {
                    errorOf && !addFieldConfig.filedName && actionType == 'create'?
                    <p className="page-field--error">必填项，请输入字段名</p> : null
                  }
              </div>
            </div>
            <div className="page-field-item u-row">
              <h4 className="page-field-item-name u-col-4">描述</h4>
              <div className="u-col-20">
                <Input
                  ref="dec_input"
                  defaultValue={ currentData.desc }
                  disabled={ actionType === 'see' }
                  addClassName="page-field-item--mw"
                  error={ errorOf && !addFieldConfig.filedDec? true : false}
                  onChange={ this.onAddFileTextChange.bind(this, 'filedDec') }/>
                  {
                    errorOf && !addFieldConfig.filedDec?
                    <p className="page-field--error">请填写描述</p> : null
                  }
              </div>
            </div>
            <div className="page-field-item u-row">
              <h4 className="page-field-item-name u-col-4">类型</h4>
              <div className="u-col-20">
                {
                  actionType == 'create'?
                  <Select
                    replace
                    position="default"
                    text="选择类型"
                  >
                    {_.map(filedType, ( item, index ) =>
                      <SelectItem
                      key={ 'filedType_'+ index }
                      text={ item.text }
                      onClick={ _this.onAddFileTypeChange.bind(_this, item.cate) }
                      />)}
                  </Select> : <Input disabled={ true } defaultValue={ typeText? typeText.text : '' } />
                }

                {
                  errorOf && !addFieldConfig.filedType && actionType == 'create'?
                  <p className="page-field--error">请选择字段类型</p> : null
                }

              </div>
            </div>
            <div className="page-field-item page-field-item--tipBox u-row">
              <h4 className="page-field-item-name u-col-4">
                <Tooltips
                  alignCenter={ false }
                  content="将字段设定为唯一值，该字段和其他唯一值字段属于“和”的关系，是联系人进行“合并”和“覆盖”时的排重依据"
                  placement="bottom-start"
                >
                  <Icon type="question-circle-o" />
                </Tooltips>
                唯一值
              </h4>

              {
                actionType == 'create'?
                (<div className="page-field--label u-col-20">
                  <Radio
                    name="unique_1"
                    defaultChecked
                    distance={ 5 }
                    onChange={ this.onAddFileUnique.bind(this, false) }
                  >否
                  </Radio>
                  <Radio
                    name="unique_1"
                    distance={5}
                    onChange={ this.onAddFileUnique.bind(this, true) }
                  >是
                  </Radio>
                </div>):
                (actionType == 'edit'? <div className="page-field--label u-col-20" ref="filedBox" data-status={ !!currentData.is_unique }>
                  <Radio
                    name="unique_1"
                    defaultChecked={ !currentData.is_unique }
                    distance={ 5 }
                    onChange={ this.ShowEditUniModal.bind(this, false) }
                  >否</Radio>
                  <Radio
                    name="unique_1"
                    defaultChecked={ currentData.is_unique }
                    distance={5}
                    onChange={ this.ShowEditUniModal.bind(this, true) }
                    >是</Radio>
                </div> : currentData.is_unique == 0? '否':'是')
              }
            </div>
          </div>
        </Modal>

         {/** 唯一值改变模态框 **/}
        <Modal
          showModal={ isCancelModalShow }
          size="s"
          title="字段编辑尚未保存，确定取消编辑？"
          onSure={ this.onAlertSure.bind(this) }
          onClose={ this.onAlertCancel.bind(this) }
        >
        </Modal>

        <Modal
          showModal={ changeUniqueModal }
          title="修改唯一值"
          cancelText="上一步"
          onSure={ this.onEditUniSure.bind(this) }
          onClose={ this.onEditUniCancel.bind(this) }
        >
          <div className="page-filed-group page-field--uniqueBox">
            <p>修改唯一值，会对所有联系人数据进行一次整理，整理期间联系人将
被锁定不能使用，直到整理完毕。</p>
            <br />
            <p>整理过程中，当  联系人 相同时</p>
            <ul>
              <li className="page-field__labelItem">
                <Radio
                  onChange={ this.onEditFileStatus.bind(this,1) }
                  name="unique_2"
                  defaultChecked
                  distance={ 5 }
                >覆盖</Radio>
                <p>保留最新联系人所有字段，包括空值字段</p>
              </li>
              <li className="page-field__labelItem">
                <Radio
                  onChange={ this.onEditFileStatus.bind(this, 2) }
                  name="unique_2"
                  distance={ 5 }
                >合并</Radio>
              <p>合并联系人字段，保留最新字段，空值字段使用次新联系人字段</p>
              </li>
            </ul>
          </div>
        </Modal>
      </div>
    )
  }

  /**
  * 添加字段
  */

  onAddFileTextChange(type, e) {
    let val = e.target.value

    if (type == 'filedName') {
        let str = _.map(val, (n) => {
          return /[a-zA-Z]/.test(n)? n : ''
        })
        val = str.join('')
    }

    let action = {errorOf: false, addFieldConfig: {}}
    action.addFieldConfig[type] = val
    this.setState(_.merge(this.state, action))
  }

  onAddFileUnique(bl) {
    this.setState(
      {addFieldConfig: _.merge(this.state.addFieldConfig, {is_unique: bl})}
    )
  }

  onAddFileTypeChange(filedType) {
    this.setState(
      {addFieldConfig: _.merge(this.state.addFieldConfig, {filedType: filedType})}
    )
  }

  onAddFileSure() {
    let { actionType, currentData } = this.props
    let { addFieldConfig } = this.state

    //  type为 create 才检测
    let ckName = ['filedName', 'filedDec', 'filedType']
    let onoff = 0

    _.each(ckName, (val, i) => {
      this.state.addFieldConfig[val]? null : ++onoff
    })

    if ( (onoff > 0 && actionType == 'create') || (onoff == 3 && actionType == 'edit' && !this.refs.dec_input.refs.u_ipt.value) ) {
      this.setState({errorOf: true})
      return false;
    }

    switch(actionType) {
      case 'create':
      case 'edit':
        this.props.closeModal(false, this.onSureAddFiled.bind(this));
        break;
      case 'see':
        this.props.closeModal('showActionModal')
        break;
    }

  }

  onSureAddFiled() {
    const { actionType, currentData, setState} = this.props
    const { updateStatus, updateUni, addFieldConfig} = this.state

    if (actionType == 'create') {
      this.props.addFieldFunc(setState, addFieldConfig, this.props.resetPageData)
    } else {
      this.props.updateField(setState, {
        id: currentData.fld_id,
        status: updateStatus,
        desc: !!addFieldConfig.filedDec? addFieldConfig.filedDec : currentData.desc,
        unique: _.isNull(updateUni)? currentData.is_unique : updateUni
      })
    }
    setState({FiledAjaxState: true})
  }

  onAddFileCancel() {
    const { actionType, closeModal } = this.props
    if (actionType == 'see') {
      closeModal('showActionModal')
      return false;
    }
    this.setState({
      isCancelModalShow: true
    })
  }

  /**
  * 警告事件
  */
  onAlertCancel() {
    this.setState({
      isCancelModalShow: false
    })
  }
  onAlertSure() {
    this.props.closeModal('showActionModal')
    this.setState({
        isCancelModalShow: false,
        errorOf: false,
        addFieldConfig: {
        filedName: '',
        filedDec: '',
        filedType: '',
        is_unique: false
      }
    })
  }

  /**
  * 修改唯一的值
  */
  onEditUniCancel() {
    let el = this.refs.filedBox
    /*
    * jq 来改变
    */
    let defaultStatus = $(el).data('status')
    let ipt = $(el).find('input')

    !defaultStatus? ipt.eq(0).prop('checked', true) : ipt.eq(1).prop('checked', true)

    this.setState({
      changeUniqueModal: false,
      updateStatus: null,
      updateUni: this.props.currentData.is_unique
    })
  }
  onEditUniSure() {
    let { addFieldConfig } = this.state
    let el = this.refs.filedBox
    let ipt = $(el).find('input')

    this.setState({
      changeUniqueModal: false,
      updateUni: ipt.eq(0).prop('checked')? false : true,
      updateStatus: this.state.updateStatus? this.state.updateStatus : null
    })
  }
  onEditFileStatus(number) {
    this.setState({updateStatus: number})
  }
  ShowEditUniModal(bl) {
    this.setState({
      changeUniqueModal: true,
      updateUni: bl
    })
  }

}
export default ActionModal
