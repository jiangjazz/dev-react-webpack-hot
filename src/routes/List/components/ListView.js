import React, { Component } from 'react'

export const ListView = (props) =>{
  console.log(props)
  return (
    <div style={{textAlign: 'center'}}>
      <h4>Counter: {props.counter.count}</h4>
      <button onClick={props.increment}>increment</button>
      <h4>Fetch Data</h4>
      <button onClick={props.fetchList}>Get Data</button>
      <p>{!props.counter.fetched? 'Loding...': props.counter.data.data.data.data.title}</p>
    </div>
  )
}

export default ListView
