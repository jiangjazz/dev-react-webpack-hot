import React, { Component } from 'react'
import { render } from 'react-dom'

import './scss/style.scss'

console.log(_ENV)
render(
  <div>
    <i className="icon-sprite icon-search">
    {1 * 2 * 3}
    </i>
  </div>,
  document.querySelector("#app")
);
