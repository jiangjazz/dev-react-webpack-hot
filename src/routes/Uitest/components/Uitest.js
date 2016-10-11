import React from 'react'
import {
  Button,
  Tooltips,
  Modal,
  Notification,
  Alert,
  Radio,
  Checkbox,
  Icon
 } from '../../../component/UI'

let logo =  require('../../../statics/logo.png')

export const Uitest = () => (
  <div className="UItest">
    <h4>UI展示区域!</h4>
    <div className="demo" style={{paddingTop: '100px', paddingBottom: '30px'}}>
      <Tooltips
      content="提示"
      placement="left"
      alignCenter={true}>
        <Button type="main">位置:左</Button>
      </Tooltips>
      <Button type="default">
        <Icon type="search" />位置:左
      </Button>
      {' '}
      <Tooltips
      content="提示"
      placement="top"
      alignCenter={true}>
        <Button type="main">位置:上</Button>
      </Tooltips>
      {' '}
      <Tooltips
      content="提示"
      placement="bottom"
      alignCenter={true}>
        <Button type="main">位置:下</Button>
      </Tooltips>
      {' '}
      <Tooltips
      content="提示"
      placement="right"
      alignCenter={true}>
        <Button type="main">位置:右</Button>
      </Tooltips>
    </div>
    <Button type="main" onClick={ () => {
      Notification.init({
        iconType: 'check',
        content: '提示的内容',
        defaultTime: 4
      })
    } }>通知框</Button>
    <br />
    <br />
    <Button type="main" onClick={ () => {
      Alert.init({
        type: 'warning',
        content: '提示的内容'
      })
    } }>
      警示栏
    </Button>
    <br />
    <br />
    <Radio value="radio" name="radio">
      选项内容
    </Radio>{' '}
    <Radio value="radio" name="radio" checked={ true }>
      选项内容
    </Radio>{' '}
    <Radio value="radio" name="radio2" disabled={ true }>
      选项内容
    </Radio>{' '}
    <Radio value="radio" name="radio2" checked={ true } disabled={ true }>
      选项内容
    </Radio>
    <br />
    <br />
    <Checkbox value="radio" name="checkbox">
      选项内容
    </Checkbox>{' '}
    <Checkbox value="radio" name="checkbox" checked={ true }>
      选项内容
    </Checkbox>{' '}
    <Checkbox value="radio" name="checkbox" disabled={ true }>
      选项内容
    </Checkbox>{' '}
    <Checkbox value="radio" name="checkbox" checked={ true } disabled={ true }>
      选项内容
    </Checkbox>{' '}
    <Checkbox value="radio" name="checkbox" lock={ true }>
      选项内容
    </Checkbox>
    <Modal
      title="导出联系人"
      showModal={ false }
      size='m'
      onSure={()=>{console.log(0)}}
      onClose={()=>{console.log(0)}}>
      <p>导出联系人数量较大，系统需要较长的时间进行导出处理。</p><br />
      <p>我们会在导出完毕后，以下载链接的形式，通过邮件发送到您的邮箱。</p>
    </Modal>
  </div>
)

export default Uitest
