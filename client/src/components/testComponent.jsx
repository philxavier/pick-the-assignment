import React, { Component } from 'react'

export default class testComponent extends Component {

  constructor(props) {
    super(props) 

  }

  handleClick() {
    alert('ooooooooooooooooooooooooooooooi')
  }

  render() {
    

    return (
      <div onClick={this.handleClick}>
        THIS IS A BIG TEST
      </div>
    )
  }
}
