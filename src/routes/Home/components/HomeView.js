import React from 'react'
import { Button, Icon, ButtonGroup } from '../../../component/UI'

function alerts() {
  alert('略略略')
}
export const HomeView = () => (
  <div>
    <h4>Hello React and Redux!</h4>
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
          按钮
        </Button>

        <Button
          type="radius-total"
          color="main"
          outline
          >
          <Icon type="search"/>
          <span>按钮</span>
          <Icon type="search"/>
        </Button>

        <Button
          type="radius-total"
          color="secondary"
          outline
          >
          按钮
        </Button>
      </ButtonGroup>

    </div>

  </div>
)

export default HomeView
