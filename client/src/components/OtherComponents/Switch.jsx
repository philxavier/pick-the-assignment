import React, { Component } from "react";
import Switch from "react-switch";
 
class SwitchExample extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.props.handleSwitchClassChange(this.props.textValue)
    this.setState({ checked });
  }
 
  render() {
    return (
      <label>
        <Switch 
          height={20}
          width={50}
          onChange={this.handleChange} 
          checked={this.state.checked} 
          onColor="#E9520D"
        />
      </label>
    );
  }
}

export default SwitchExample;