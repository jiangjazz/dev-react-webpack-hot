import React, { Component, PropTypes } from 'react'

import {
  Radio,
  Modal
 } from 'UI'

 class ADDCONTACT_InportModal extends Component{
   constructor(props) {
     super(props)
     this.state = {
       is_unique_length: 0,
       // 合并方式 1 合并  2 覆盖
       status: 1
     }
   }
   // 获取唯一字段的个数
   get_is_unique_length() {
     const {
       fieldsArr
     } = this.props
     return fieldsArr.filter( (item) => item.is_unique == 1 ).length
   }
   close() {
     this.props.onClose()
   }
   sure() {
     this.props.onSure(this.state.status)
   }
   render() {
     const {

     } = this.state
     const {
       showModal,
       fieldsArr
     } = this.props
     const {
       status
     } = this.state
     return (

          <Modal
            className="inportModal"
            title="导入设置"
            showModal={ showModal }
            onClose={ this.close.bind(this) }
            onSure={ this.sure.bind(this) }
            >
            <div className="row">
              {
                this.get_is_unique_length() == 2
                ?'当邮件和手机字段相同时'
                :'当邮件和手机及其他'+ (this.get_is_unique_length()-2) +'个字段       相同时'
              }

            </div>
            <div className="row">
              <Radio
                distance="10"
                name="inportType"
                onChange={ () => this.setState({ status: 2}) }
                >
                覆盖
              </Radio>
              <p>保留最新联系人所有字段，包括空值字段</p>
            </div>
            <div className="row">
              <Radio
                distance="10"
                name="inportType"
                onChange={ () => this.setState({ status: 1}) }
                defaultChecked
                >
                合并
              </Radio>
              <p>保留最新字段，空值使用次新字段，合并会使原有联系人数减少</p>
            </div>

          </Modal>
     )
   }
 }
 export default ADDCONTACT_InportModal
