import React, { Component, PropTypes } from 'react'

import {
  Checkbox,
  Modal,
  Notification,
  ProcessBar,
  Icon
 } from 'UI'

 class ExportModal extends Component{
   constructor(props) {
     super(props)
     this.state = {
       activeKeywordArr: [],
       // 是否显示 导出联系人
       showExportPromptModal: false,
       // 显示导出进度条
       showProcess: false,
       // 开始导出
       startExport: false,
       // 导出是否完成
       exportSuccess: false,
       // 下载地址
       exportDownUrl: '',
     }
   }
   // 选择字段名
   checkKeyword( name, selProps, status ) {
     const {
       activeKeywordArr
     } = this.state

     let resetKeywordArr = activeKeywordArr
     let hasChild = activeKeywordArr.some( (item) => item === name )

     if( status && !hasChild ) {
       resetKeywordArr.push(name)
     } else if ( !status && hasChild ) {
       resetKeywordArr = activeKeywordArr.filter( (item) => item != name )
     }
     console.log(resetKeywordArr)
     this.setState({
       showProcess: (resetKeywordArr.length > 0),
       activeKeywordArr: resetKeywordArr
     })
   }
   // 导出联系人预处理
   exportPrev() {
     const _this = this
     const {
       activeLiArr
     } = this.props
     const {
       activeKeywordArr
     } = this.state
     console.log(12312)
     if ( activeKeywordArr.length === 0 ) {
       return
     }
     this.setState({
       showProcess: true
     }, () => {
       _this.props.onExportPrev(
         {
           csv_head: activeKeywordArr,
           list_ids: activeLiArr
         },
         // 同步
         () => {
           console.log(1)
           _this.setState({
             startExport: true
           })
         },
         // 同步成功
         (data) => {
           console.log(2)
           _this.setState({
             exportSuccess: true,
             exportDownUrl: data.csv_url
           })
           Notification.init({
             iconType: 'check-circle',
             content: '导出完毕'
           })
         },
         // 异步
         () => {
           console.log(3)
           _this.setState({
             showExportPromptModal: true
           })
           _this.closeExportModal()
         }
       )
     })

   }
   // 关闭 预导出框
   closeExportModal() {
     this.props.onCloseExportPrev()
     this.setState({
       // 显示导出进度条
       showProcess: false,
       // 开始导出
       startExport: false,
       // 导出是否完成
       exportSuccess: false,
       // 选中关键字
       activeKeywordArr: [],
       // 下载地址
       exportDownUrl: '',
     })
   }
   // 导出确定按钮
   exportSure() {
     const {
       startExport,
       exportSuccess,
       exportDownUrl
     } = this.state
     if( !startExport ) {
       $(this.refs.progressBar).removeClass('f-dn')
       setTimeout( () => {
         this.exportPrev()
       }, 0)
     } else {
       console.log('下载')
       window.open( exportDownUrl )
     }
   }
   render() {
     const {
       activeKeywordArr,
       showProcess,
       startExport,
       exportSuccess,
       showExportPromptModal
     } = this.state
     const {
       showExportModal,
       onCloseExportPrev,
       fieldsArr
     } = this.props
     return (
       <div>
         {/* 导出联系人 异步 */}
         <Modal
           className="exportPromptModal"
           title="导出联系人"
           showModal={ showExportPromptModal }
           onClose={ () => this.setState({ showExportPromptModal: false}) }
           onSure={ () => this.setState({ showExportPromptModal: false}) }
           >
           <p>导出联系人数量较大，系统需要较长的时间进行导出处理。</p>
           <p>我们会在导出完毕后，以下载链接的形式，通过邮件发送到您的邮箱。</p>
         </Modal>
         {/* 导出联系人 异步  end*/}
         {/* 导出预处理 */}
         <Modal
           className="exportModal"
           title="导出联系人"
           showModal={ showExportModal }
           onClose={ this.closeExportModal.bind(this) }
           onSure={ this.exportSure.bind(this) }
           sureText={ exportSuccess? '下载' : '确定' }
           sureDisabled={ !exportSuccess && (activeKeywordArr.length === 0 || startExport ) }
           >
           <div className="u-row f-cb">
             <div className="u-col-3">
               导出字段
             </div>
             <div className="u-col-19">
               <ul className="f-cb">
                 {
                   fieldsArr.map( (item, index) => {
                     return (
                       <li className="item" key={ '_keyword' + index } >
                         <Checkbox
                           distance="5"
                           onChange={ this.checkKeyword.bind(this, item.name) }
                           >
                           { item.name }
                         </Checkbox>
                       </li>
                     )
                   })
                 }
               </ul>
             </div>
           </div>
           <div className="u-row progressBar f-cb f-dn" ref="progressBar">
             <div className="u-col-3">
               导出准备
             </div>
             <div className="u-col-19">
               <ProcessBar
                 text={ exportSuccess? '导出完成': '正在导出' }
                 percent={
                   exportSuccess? 100
                   : startExport? 90
                   : 0
                 }
                 >
                 <Icon type="remove-o" />
               </ProcessBar>
             </div>
           </div>

         </Modal>
         {/* 导出预处理 end*/}
       </div>
     )
   }
 }
 export default ExportModal
