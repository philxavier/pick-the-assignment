import React, { Component } from "react";
import Switch from "react-switch";
import { connect } from "react-redux";
import { handleSwitchClassChange } from "../../../../store/actions/SwitchAction.jsx";
import { reRenderMap } from "../../../../store/actions/SimpleMapAction.jsx";

class SwitchExample extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.handleSwitchClassChange(this.props.textValue);
    this.props.reRenderMap();
    this.setState({
      checked: !this.state.checked
    });
  }

  componentDidUpdate(prevprops) {
    if (this.props !== prevprops) {
      if (this.props.clearSidebar) {
        this.setState({
          checked: false
        });
      }
    }
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

const mapDispatchToProps = dispatch => {
  return {
    handleSwitchClassChange: inputClassOfPost => {
      dispatch(handleSwitchClassChange(inputClassOfPost));
    },
    handleSwitchClassChange: inputClass => {
      dispatch(handleSwitchClassChange(inputClass));
    },
    reRenderMap: () => {
      dispatch(reRenderMap());
    }
  };
};

const mapStateToProps = state => {
  return {
    postFromSearchbar: state.postFromSearchbar,
    clearSidebar: state.clearSidebar
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchExample);
