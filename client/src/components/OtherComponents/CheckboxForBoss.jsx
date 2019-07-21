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

  render() {
    return (
      <div id="optionsWrapper" className="floatBlock">
        <label id="labelWrapper">
          <input
            checked={this.state.status}
            id="bossOption"
            name="paymentType"
            type="checkbox"
            onClick={() => {
              this.props.handleBossRateChange(this.props.rate);
              this.props.reRenderMap();
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
    },
    reRenderMap: () => {
      dispatch(reRenderMap());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CheckboxForBoss);
