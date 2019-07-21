import React, { Component } from "react";
import { connect } from "react-redux";
import { handleBossRateChange } from "../../../../store/actions/CheckBoxForBossAction.jsx";
import { reRenderMap } from "../../../../store/actions/SimpleMapAction.jsx";

class CheckboxForBoss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
  }

  handlechange = () => {
    this.props.handleBossRateChange(this.props.rate);
    this.props.reRenderMap();
    this.changeBoxStatus();
  };

  changeBoxStatus = () => {
    this.setState({
      status: !this.state.status
    });
  };

  setBoxStatusToFalse = () => {
    this.setState({
      status: false
    });
  };

  componentDidUpdate(prevprops) {
    if (this.props !== prevprops) {
      if (this.props.clearSidebar === true) {
        this.setBoxStatusToFalse();
      }
    }
  }

  render() {
    return (
      <div id="optionsWrapper" className="floatBlock">
        <label id="labelWrapper">
          <input
            checked={this.state.status}
            id="bossOption"
            name="paymentType"
            type="checkbox"
            onChange={this.handlechange}
          />
          <span>{this.props.rate}</span>
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleBossRateChange: inputRate => {
      dispatch(handleBossRateChange(inputRate));
    },
    reRenderMap: () => {
      dispatch(reRenderMap());
    }
  };
};

const mapStateToProps = state => {
  return {
    clearSidebar: state.clearSidebar
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxForBoss);
