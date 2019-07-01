import React, { Component } from 'react'

export default class Button extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        text: ' '
    }
  }

  render() {
    return (
      <div className = "button-sidebar">
        {this.props.textValue}
      </div>
    )
  }
}
