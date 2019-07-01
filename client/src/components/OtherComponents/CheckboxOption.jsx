import React, { Component } from 'react'

export default class CheckboxOption extends Component {

  constructor(props) {
    super(props)
  }

  handleChange(postReference) {
    let firstLetter = postReference[0].toLowerCase();
    this.props.handleTypeChange(firstLetter)
  }

  render() {
    return (
      <div className="checkBoxContainer">
        <li className="radioClass">
          <input 
            id="checkbox" type="checkbox" 
            onChange={() =>{this.handleChange(this.props.typeOfPost)}} 
            style={{marginRight: "6px"}}
          />
          <label>{this.props.typeOfPost}</label>
        </li>
      </div>
    )
  }
}

