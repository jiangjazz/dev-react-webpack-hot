import React, { Component, PropTypes } from 'react'

import Upload from 'rc-upload'

import {
  Checkbox,
  Modal,
  SelectWithInput,
  Notification,
  Input,
  Button,
  ProcessBar,
  Icon,
  Radio
 } from 'UI'

class AddContactGroupModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      // 是否显示上传进度条
      showProcessBar: false,
      // 开始上传
      startUpload: false,
      // 是否上传成功
      uploadSuccess: false,
      // 编码类型
      encode: 'utf-8',
      // 新增组名
      name: '',
      // 上传返还数据
      res: null
    }
  }
  // 上传配置
  uploaderProps = {
    action: 'http://upload.dev.dmayun.com/index.php?access-token=d652dbc7b0bf4f079764c82c106f1b2b',
    name: 'upload_file',
    multiple: true,
    onProgress(step, file) {
      console.log('onProgress', Math.round(step.percent), file.name);
    }
  }
  close() {
    this.props.onClose()
    this.setState({
      // 是否显示上传进度条
      showProcessBar: false,
      // 开始上传
      startUpload: false,
      // 是否上传成功
      uploadSuccess: false,
      // 编码类型
      encode: 'utf-8',
      name: '',
      res: null
    })
  }
  addBySelf() {
    const {
      encode,
      name
    } = this.state
    const {
      list_id,
      onAddSelf
    } = this.props
    this.props.Set_Local_ADDCONTACTS({
      from: 'addGroup',
      character_set: encode,
      name: name.trim(),
      type: 2
    })
    onAddSelf()
  }
  sure() {
    const {
      res,
      name
    } = this.state
    if(res != null) {
      this.props.Set_LocalCSV(res, {
        from: 'addGroup',
        character_set: res.encode,
        name: name.trim(),
        type: 1,
        type_data: res.data.url
      })
      this.props.onSure()
    }
  }
  // 上传失败
  uploadFails() {
    this.setState({
      showProcessBar: false,
      startUpload: false,
      uploadSuccess: false
    })
    Notification.init({
      iconType: 'exclamation-triangle',
      content: '上传文件失败，必须上传csv类型文件'
    })
  }
  // 获取输入的组名
  setName(e) {
    this.setState({
      name: e.target.value
    })
  }
  // 敬请期待
  tksForWait() {
    Notification.init({
      iconType: 'smile',
      content: '敬请期待'
    })
  }
  render() {
    const {
      showAddContactModal
    } = this.props
    const {
      showProcessBar,
      startUpload,
      uploadSuccess,
      encode,
      name
    } = this.state

    return (
      <Modal
        className="addContactGroupModal"
        title="添加联系人组"
        size="l"
        showModal={ showAddContactModal }
        showFooter={ showProcessBar }
        sureText="下一步"
        sureDisabled={ !uploadSuccess || name == '' }
        onClose={ this.close.bind(this) }
        onSure={ this.sure.bind(this) }
        >
        <div className="u-row namRow">
          <div className="u-col-4">
            名称
          </div>
          <div className="u-col-20">
            <Input value={ name } onChange={ this.setName.bind(this) }/>
          </div>
        </div>
        <div className="u-row namRow">
          <div className="u-col-4">
            编码类型
          </div>
          <div className="u-col-3">
            <Radio
              name="type" distance="5" defaultChecked
              onChange={ () => { this.setState({encode: 'utf-8'}) } }
              >
              utf-8
            </Radio>
          </div>
          <div className="u-col-3">
            <Radio
              name="type" distance="5"
              onChange={ () => { this.setState({encode: 'gb312'}) } }
              >
              gb312
            </Radio>
          </div>
        </div>

        <div className="u-row actRow">
          <div className="u-col-4">
            导入联系人
          </div>
          <div className="u-col-20">
            <Button color="main" type="radius-half" size="larger" outline
              >
              <Upload
                data={
                  {
                    'encode': this.state.encode,
                    'row-count': 5,
                    'projectId': 'test'
                  }
                }
                beforeUpload={ (file) => {
                  console.log('before')
                  this.setState({
                    showProcessBar: true
                  })
                  console.log('beforeUpload', file.name)
                } }
                onStart={ (res) => {
                  console.log('onStart', res.name);
                  this.setState({
                    startUpload: true
                  })
                } }
                onSuccess={ (res) => {
                  console.log('%c上传API链接上服务器咯', 'background: lightgreen;')
                  console.log(res)
                  if ( res.success ) {
                    this.setState({
                      uploadSuccess: true,
                      res: res
                    })
                  } else {
                    this.uploadFails()
                  }
                } }
                onError={ (res) => {
                  console.log('%c上传失败了', 'background: red;')
                  console.log(res)
                  this.uploadFails()
                } }
                {...this.uploaderProps}
                >
                上传表格
              </Upload>
            </Button>

            <Button color="main" type="radius-half" size="larger" outline
              onClick={ this.addBySelf.bind(this) }
              disabled={ name.trim() == '' }
              >
              手动添加
            </Button>
            <Button color="main" type="radius-half" size="larger" outline
              onClick={ this.tksForWait }
              >
              从文本粘贴
            </Button>
            <Button color="main" type="radius-half" size="larger" outline
              onClick={ this.tksForWait }
              >
              第三方导入
            </Button>
          </div>
        </div>

        {
          showProcessBar?
          <div className="processBar">
            <ProcessBar
              text={ uploadSuccess? '导入成功': '正在导入' }
              percent={
                uploadSuccess? 100
                : startUpload? 90
                : 0
              }
              >
              <Icon type="remove-o" />
            </ProcessBar>
          </div>
          : null
        }
      </Modal>
    )
  }
}

export default AddContactGroupModal
