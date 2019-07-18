import React, { Component } from "react";
import Switch from "react-switch";
import { connect } from "react-redux";
import { handleSwitchClassChange } from "../../../../store/actions/AppAction.jsx";

class SwitchExample extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.handleSwitchClassChange(this.props.textValue);
    this.setState({
      checked: !this.state.checked
    });
  }

  // componentDidUpdate(prevprops) {
  //   if (this.props !== prevprops) {
  //     if (this.props.postFromSearchbar) {
  //       this.props.handleSwitchClassChange(this.props.textValue);
  //       this.setState({
  //         checked: false
  //       });
  //     }
  //   }
  // }

  render() {
    console.log(this.props);
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

const mapDispatchToProps = dispatch => {
  return {
    handleSwitchClassChange: inputClassOfPost => {
      dispatch(handleSwitchClassChange(inputClassOfPost));
    }
  };
};

const mapStateToProps = state => {
  return {
    postFromSearchbar: state.postFromSearchbar
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchExample);
