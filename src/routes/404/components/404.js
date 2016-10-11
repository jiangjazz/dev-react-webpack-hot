import React,{Component} from 'react'
import { withRouter } from 'react-router'

class PageNotFind extends Component {
  render() {
    const props = this.props
    return (
      <div className="container">
        <h1>Page Not Find!!!</h1>
        <a onClick={props.router.goBack}> Back </a>
      </div>
    )
  }
}

export default withRouter(PageNotFind)
