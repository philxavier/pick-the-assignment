import React, { Component } from "react";
import { connect } from "react-redux";
import { handleBossRateChange } from "../../../../store/actions/CheckBoxForBossAction.jsx";

class CheckboxForBoss extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="optionsWrapper" className="floatBlock">
        <label id="labelWrapper">
          <input
            id="bossOption"
            name="paymentType"
            type="checkbox"
            onClick={() => {
              this.props.handleBossRateChange(this.props.rate);
            }}
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
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CheckboxForBoss);
