import React from 'react'
import {
  Button,
  ButtonGroup,
  Tooltips,
  Modal,
  Notification,
  Alert,
  Radio,
  Checkbox,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  InputGroup,
  InputNumber,
  Select,
  SelectItem,
  SelectMulti,
  SelectWithInput,
  Datetimepicker
 } from 'UI'

let logo =  require('../../../statics/logo.png')

let type = 'radius-total'
//radius-total
let comStyle = {
  width: '1000px',
  margin: 'auto',
  marginBottom: '20px',
}

let titleStyle = {
  fontSize: '25px',
  lineHeight: '25px',
  padding: '15px 0'
}
let containerStyle = {
  overflowY: 'scroll',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}
let codeTip = {
  padding: '20px 0'
}
let ModalShow_1 = false

function alerts() {
  alert('略略略')
}
const liDates = [
  {
    // href: 'https://www.baidu.com',
    text: '百度',
    onClick () {
      console.log(1)
    }
  },
  {
    // href: 'https://www.baidu.com',
    text: 'aaa',
    onClick () {
      console.log(2)
    }
  },
  {
    // href: 'https://www.baidu.com',
    text: 'abss',
    onClick () {
      console.log(3)
    }
  },
  {
    // href: 'https://www.baidu.com',
    text: 'iojsaa',
    onClick () {
      console.log(4)
    }
  }
]



export const Uitest = () => (
  <div className="UItest" style={containerStyle}>

   {/*** input ***/}
    <div style={comStyle}>
      <h3 style={titleStyle}>时间控件</h3>
      <div style={{width: '202px',position: "relative"}}>
        <Datetimepicker mode="date" inputFormat="YYYY-MM-DD" onChange={ (date) => {
          console.log(date)
        }}/>
      </div>
      <h3 style={titleStyle}>输入框组</h3>
      <InputGroup type="search">
        <Input
        autoFocus
        onKeyUp={(event) => {
          console.log(event.keyCode)
        }}/>
        <Icon type="search" />
      </InputGroup>
      <InputNumber />
      <div style={codeTip}>
      {
        `<InputGroup type="search">
           <Input />
           <Icon type="search" />
         </InputGroup>`
      }
      </div>
      <InputGroup type="button">
        <Input placeholder="请选择"/>
        <div className="m-input-warp__append">
          <Button color="default" size="large">提交</Button>
        </div>
      </InputGroup>
      <div style={codeTip}>
      {
         `<InputGroup type="button">
           <Input placeholder="请选择"/>
           <div className="m-input-warp__append">
             <Button color="default" size="large">提交</Button>
           </div>
         </InputGroup>`
      }
      </div>
      <InputGroup type="button">
        <div className="m-input-warp__prepend">
          <Button color="default" size="large">
            <Icon type="remove-sign"></Icon>
          </Button>
        </div>
        <Input placeholder="请选择"/>
        <div className="m-input-warp__append">
          <Button color="default" size="large">
            <Icon type="remove-sign"></Icon>
            <span>提交</span>
          </Button>
        </div>
      </InputGroup>
      <div style={codeTip}>
      {
         `<InputGroup type="button">
           <div className="m-input-warp__prepend">
             <Button color="default" size="large">
               <Icon type="remove-sign"></Icon>
             </Button>
           </div>
           <Input placeholder="请选择"/>
           <div className="m-input-warp__append">
             <Button color="default" size="large">
               <Icon type="remove-sign"></Icon>
               <span>提交</span>
             </Button>
           </div>
         </InputGroup>`
      }
      </div>
      <InputGroup type="select">
        <Input placeholder="请选择"/>
        <div className="m-input-warp__append">
        {/* <Select
          position="bottomRight"
        >
          <SelectItem text="选项一"/>
        </Select> */}
        </div>
      </InputGroup>
      <div style={codeTip}>
      {
        `<InputGroup type="select">
          <Input placeholder="请选择"/>
          <div className="m-input-warp__append">
          <Select
            position="bottomRight"
          >
            <SelectItem text="选项一"/>
          </Select>
          </div>
        </InputGroup>`
      }
      </div>
      <InputGroup type="select">
        <div className="m-input-warp__prepend">
        {/* <Select
          position="bottomLeft"
        >
          <SelectItem text="选项一"/>
        </Select> */}
        </div>
        <Input placeholder="请选择"/>
      </InputGroup>
      <div style={codeTip}>
      {
        `<InputGroup type="select">
          <div className="m-input-warp__prepend">
          <Select
            position="bottomLeft"
          >
            <SelectItem text="选项一"/>
          </Select>
          </div>
          <Input placeholder="请选择"/>
        </InputGroup>
        <div style={codeTip}>`
      }
      </div>
    </div>
    <div style={comStyle}>
      <h3 style={titleStyle}>面包屑</h3>
      <Breadcrumb separator=">">
        <BreadcrumbItem link="/">联系人</BreadcrumbItem>
        <BreadcrumbItem>联系人组</BreadcrumbItem>
      </Breadcrumb>
      <div style={codeTip}>
      {
        `<Breadcrumb separator=">">
          <BreadcrumbItem link="/">联系人</BreadcrumbItem>
          <BreadcrumbItem>联系人组</BreadcrumbItem>
        </Breadcrumb> `
      }
      </div>
    </div>
    <Modal
      size="s"
      title="警示框"
      showModal={ false }
    >
    <p>这是一条警告框</p>
    </Modal>
    <div style={comStyle}>
      <h3 style={titleStyle}>模态框</h3>
      <Button onClick={ () => { ModalShow_1 = true } }>点击弹出</Button>
      <h3 style={titleStyle}>提示（Tip）</h3>
      <Tooltips
      content="提示"
      placement="top"
      alignCenter={true}>
        <Button color="main">位置:上</Button>
      </Tooltips>
      {' '}
      <Tooltips
      content="当前为锁定状态，原因是有其他用户正在编辑或者使用此联系人组发送，请稍后再试。"
      placement="top-start"
      alignCenter={ false }>
        <Button color="main">位置:上</Button>
      </Tooltips>
      {' '}
      <Tooltips
      content="loding状态"
      placement="top-start"
      alignCenter={ false }>
      <Button color="main" disabled>
        <Icon type="loading" />
        <span>加载中</span>
      </Button>
      </Tooltips>
    </div>
    <div style={comStyle}>
      <h3 style={titleStyle}>提示（通知）</h3>
      <Button color="main" onClick={ () => {
        Notification.init({
          iconType: 'check',
          content: '提示的内容',
          defaultTime: 4
        })
      } }>通知框</Button>
    </div>
    <div style={comStyle}>
      <h3 style={titleStyle}>提示（警示）</h3>
      <Button color="main" onClick={ () => {
        Alert.init({
          type: 'info',
          content: '提示的内容'
        })
      } }>
        警示栏(info)
      </Button>
      {' '}
      <Button color="main" onClick={ () => {
        Alert.init({
          type: 'warning',
          content: '提示的内容'
        })
      } }>
        警示栏(warning)
      </Button>
      {' '}
      <Button color="main" onClick={ () => {
        Alert.init({
          type: 'danger',
          content: '提示的内容'
        })
      } }>
        警示栏(danger)
      </Button>
      {' '}
      <Button color="main" onClick={ () => {
        Alert.init({
          type: 'success',
          content: '提示的内容'
        })
      } }>
        警示栏(success)
      </Button>
    </div>
    <div style={comStyle}>
      <h3 style={titleStyle}>单选</h3>
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
    </div>
    <div style={comStyle}>
      <h3 style={titleStyle}>多选</h3>
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
    </div>
    {/* <div className="m-nav__content">
      <div className="m-nav__wrap">
        <div className="m-nav__addr">
          <Breadcrumb separator=">">
            <BreadcrumbItem link="/">联系人</BreadcrumbItem>
            <BreadcrumbItem>过滤器</BreadcrumbItem>
          </Breadcrumb>
          <h3 className="m-nav__title">过滤器</h3>
        </div>

        <div className="m-nav__tools">
          <InputGroup type="search">
            <Input placeholder="搜索..." shape="round" addClassName="u-input--search" />
            <Icon type="search" />
          </InputGroup>

          <Button color="main" className="u-btn__plus">
            <Icon type="plus" />
            <span className="u-btn__plusText">添加</span>
          </Button>
        </div>
      </div>
      <div className="m-Navplug__wrap">
        <ButtonGroup className="u-btnGroup--PD">
          <Tooltips
          content="导出"
          placement="top"
          alignCenter={true}>
            <Button>
              <Icon type="cloud-upload" />
            </Button>
          </Tooltips>
          <Tooltips
          content="复制"
          placement="top"
          alignCenter={true}>
            <Button>
              <Icon type="copy" />
            </Button>
          </Tooltips>
          <Tooltips
          content="删除"
          placement="top"
          alignCenter={true}>
            <Button>
              <Icon type="trash-o" />
            </Button>
          </Tooltips>
        </ButtonGroup>
        <div className="m-Navplug__pageTotal">
          已加载4个/总共1000个
        </div>
      </div>
    </div> */}
    {/* <div className="m-dataList__wrap" style={{padding: '0 20px'}}>
      <div className="m-listTable__head">
        <ul className="u-row">
          <li className="u-col-3">
            <Checkbox distance={5}>全选</Checkbox>
          </li>
          <li className="u-col-4">
            过滤器名
            <Icon type="sort-alpha-asc" />
          </li>
          <li className="u-col-4">
            创建帐号
          </li>
          <li className="u-col-3">
            创建时间
          </li>
          <li className="u-col-3">
            最近更新
          </li>
          <li className="u-col-3">
            更新时间
          </li>
          <li className="u-col-4">
            {' '}
          </li>
        </ul>
      </div>
      <div  className="m-listTable__content">
        <ul className="u-row">
          <li className="u-col-3">
            <Checkbox />
          </li>
          <li className="u-col-4">
            这是过滤器的名字
          </li>
          <li className="u-col-4">
            创建账号
          </li>
          <li className="u-col-3">
            2016-8-6
          </li>
          <li className="u-col-3">
            更新账号
          </li>
          <li className="u-col-3">
            2016-8-6
          </li>
          <li className="u-col-4">
            <Icon type="remove-o" />
          </li>
        </ul>
        <ul className="u-row active">
          <li className="u-col-3">
            <Checkbox />
          </li>
          <li className="u-col-4">
            这是过滤器的名字
          </li>
          <li className="u-col-4">
            创建账号
          </li>
          <li className="u-col-3">
            2016-8-6
          </li>
          <li className="u-col-3">
            更新账号
          </li>
          <li className="u-col-3">
            2016-8-6
          </li>
          <li className="u-col-4">
            <Icon type="remove-o" />
          </li>
        </ul>
        <ul className="u-row">
          <li className="u-col-3">
            <Checkbox />
          </li>
          <li className="u-col-4">
            这是过滤器的名字
          </li>
          <li className="u-col-4">
            创建账号
          </li>
          <li className="u-col-3">
            2016-8-6
          </li>
          <li className="u-col-3">
            更新账号
          </li>
          <li className="u-col-3">
            2016-8-6
          </li>
          <li className="u-col-4">
            <Icon type="remove-o" />
          </li>
        </ul>
      </div>
    </div> */}

    {/* <h4>UI展示区域!</h4>
    <div className="demo" style={{paddingTop: '100px', paddingBottom: '30px'}}>
      <Breadcrumb separator=">">
        <BreadcrumbItem link="/">联系人</BreadcrumbItem>
        <BreadcrumbItem>联系人组</BreadcrumbItem>
      </Breadcrumb>
      <br />
      <Tooltips
      content="提示"
      placement="left"
      alignCenter={true}>
        <Button color="main">位置:左</Button>
      </Tooltips>
      <Button>
        <Icon type="search" />位置:左
      </Button>
      {' '}
      <Tooltips
      content="提示"
      placement="top"
      alignCenter={true}>
        <Button color="main">位置:上</Button>
      </Tooltips>
      {' '}
      <Tooltips
      content="当前为锁定状态，原因是有其他用户正在编辑或者使用此联系人组发送，请稍后再试。"
      placement="top-start"
      alignCenter={ false }>
        <Button color="main">位置:上</Button>
      </Tooltips>
      {' '}
      <Tooltips
      content="提示"
      placement="bottom"
      alignCenter={true}>
        <Button color="main">位置:下</Button>
      </Tooltips>
      {' '}
      <Tooltips
      content="提示"
      placement="right"
      alignCenter={true}>
        <Button color="main">位置:右</Button>
      </Tooltips>
    </div>
    <Button color="main" onClick={ () => {
      Notification.init({
        iconType: 'check',
        content: '提示的内容',
        defaultTime: 4
      })
    } }>通知框</Button>
    <br />
    <br />
    <Button color="main" onClick={ () => {
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
      showFooter={ true }
      onSure={()=>{console.log(0)}}
      onClose={()=>{console.log(0)}}>
      <p>导出联系人数量较大，系统需要较长的时间进行导出处理。</p><br />
      <p>我们会在导出完毕后，以下载链接的形式，通过邮件发送到您的邮箱。</p>
    </Modal> */}
    <div style={comStyle}>
      <h3 style={titleStyle}>按钮</h3>
      <div>
        <Button
          color="main"
          disabled>
          按钮
        </Button>
        <Button
          color="secondary">
          按钮
        </Button>
        <Button>
          按钮
        </Button>

        <Button
        type="radius-half"
        outline>
          按钮
        </Button>

        <Button
          color="main"
          outline
          >
          <Icon type="search"/>
          <span>按钮</span>
          <Icon type="search"/>
        </Button>

        <Button
          type="radius-half"
          outline
          >
          按钮
        </Button>

        <Button
          color="default"
          type="radius-total"
          outline
          >
          <Icon type="search"/>
        </Button>

        <Button
          href="/ui"
          color="main"
          type="no-border"
          >
          UI组件
        </Button>

        <Button
          color="main"
          type="no-border"
          outline
          onClick={ alerts }
          >
          你是个好人
        </Button>

        <Button
          href="/ui"
          outline
          size="small"
          >
          UI组件
        </Button>

        <Button
          href="/ui"
          outline
          size="large"
          >
          UI组件
        </Button>

        <Button
          href="/ui"
          outline
          size="larger"
          >
          UI组件
        </Button>

      </div>

      <div>
        <ButtonGroup>
          <Button
          outline>
            按钮
          </Button>

          <Button
            color="main"
            outline
            >
            <Icon type="search"/>
            <span>按钮</span>
            <Icon type="search"/>
          </Button>

          <Button
            color="secondary"
            outline
            >
            按钮
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button
          type="radius-half"
          outline>
            按钮
          </Button>

          <Button
            color="main"
            outline
            >
            <Icon type="search"/>
            <span>按钮</span>
            <Icon type="search"/>
          </Button>

          <Button
            color="secondary"
            outline
            >
            按钮
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button
            type="radius-total"
            outline>
            <Icon type="search"/>
          </Button>

          <Button
            type="radius-total"
            color="main"
            outline
            >
            <Icon type="search"/>
          </Button>

          <Button
            type="radius-total"
            color="secondary"
            outline
            >
            <Icon type="search"/>
          </Button>
        </ButtonGroup>

      </div>
    </div>

    <div style={comStyle}>
      <h3 style={titleStyle}>下拉框</h3>
      <div>
        <Select
          color="main"
        >
          {liDates.map(( item, index ) => <SelectItem key={ '_selItem'+ index } href={ item.href } text={ item.text }/>)}
        </Select>

        <Select
          position="bottomRight"
        >
          {liDates.map(( item, index ) => <SelectItem key={ '_selItem'+ index } href={ item.href } text={ item.text }/>)}
        </Select>

        <Select
          color="secondary"
          position="topLeft"
        >
          {liDates.map(( item, index ) => <SelectItem key={ '_selItem'+ index } href={ item.href } text={ item.text }/>)}
        </Select>

        <Select
          position="topRight"
          disabled
        >
          {liDates.map(( item, index ) => <SelectItem key={ '_selItem'+ index } href={ item.href } text={ item.text }/>)}
        </Select>

      </div>


          <div>
            <h4> 第三种下拉框</h4>
            <SelectMulti
              text="这是下拉菜单"
            >
            </SelectMulti>

            <SelectMulti
              type="type2"
              text="这是下拉菜单"
              liDates = { liDates }
            >
            </SelectMulti>

            <SelectMulti
              type="type2"
              text="这是下拉菜单"
              liDates = { liDates }
              filter="aa"
            >
              <Button
                type="no-border"
              >
                这里还有按钮
              </Button>
            </SelectMulti>

            <SelectMulti
              type="type2"
              text="选中可替换"
              liDates = { liDates }
              filter="aa"
              replace
            >
              <Button
                type="no-border"
              >
                这里还有按钮
              </Button>
            </SelectMulti>
          </div>

      <div>
        <Select
          color="main"
          type="type2"
        >
          {liDates.map(( item, index ) => <SelectItem key={ '_selItem'+ index } href={ item.href } text={ item.text }/>)}
        </Select>

        <Select
          position="bottomRight"
          type="type2"
        >
          {liDates.map(( item, index ) => <SelectItem key={ '_selItem'+ index } href={ item.href } text={ item.text }/>)}
        </Select>

        <Select
          color="secondary"
          position="topLeft"
          type="type2"
        >
          {liDates.map(( item, index ) => <SelectItem key={ '_selItem'+ index } href={ item.href } text={ item.text }/>)}
        </Select>

        <Select
          position="topRight"
          type="type2"
        >
          {liDates.map(( item, index ) => <SelectItem key={ '_selItem'+ index } href={ item.href } text={ item.text }/>)}
        </Select>

      </div>

      <div>
        <SelectWithInput
          actCt="一些其他东西"
          actClick={ () => console.log(999999) }
          >
          {liDates.map(( item, index ) => {
            return (
              <li key = { 'item' + index }>
                <a
                  href={ item.href? item.href: 'javascript:;' }
                  >
                  { item.text }
                </a>
              </li>
            )
          })}
        </SelectWithInput>
      </div>
    </div>
  </div>
)

export default Uitest
