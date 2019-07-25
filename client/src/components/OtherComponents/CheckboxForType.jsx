import React, { Component } from "react";
import { connect } from "react-redux";
import {
  handleTypeChange,
  changeCheckboxStatus
} from "../../../../store/actions/CheckBoxOptionAction.jsx";
import { resetPostFromSearchbar } from "../../../../store/actions/AppAction.jsx";
import { reRenderMap } from "../../../../store/actions/SimpleMapAction.jsx";
class CheckboxOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
  }

  handleChange(postReference) {
    debugger;
    let firstLetter = postReference[0].toLowerCase();
    this.props.handleTypeChange(firstLetter);
    this.props.reRenderMap();
    this.changeBoxStatus();
  }

  changeBoxStatus() {
    this.setState({
      status: !this.state.status
    });
  }

  componentDidUpdate(prevprops) {
    if (this.props !== prevprops) {
      if (this.props.clearSidebar === true) {
        this.setBoxStatusToFalse();
      }
    }
  }

  setBoxStatusToFalse = () => {
    this.setState({
      status: false
    });
  };

  render() {
    return (
      <div className="checkBoxContainer">
        <li className="radioClass">
          <input
            checked={this.state.status}
            // id="checkbox"
            type="checkbox"
            onChange={() => {
              //this.props.resetPostFromSearchbar();
              //ON CHANGE, WE NEED TO INCLUDE THIS CRITERIA FOR THE FILTERED POSTS ARRAY
              this.handleChange(this.props.typeOfPost);
            }}
            style={{ marginRight: "6px" }}
          />
          <label>{this.props.typeOfPost}</label>
        </li>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleTypeChange(inputType) {
      dispatch(handleTypeChange(inputType));
    },
    resetPostFromSearchbar() {
      dispatch(resetPostFromSearchbar());
    },
    reRenderMap() {
      dispatch(reRenderMap());
    },
    changeCheckboxStatus() {
      dispatch(changeCheckboxStatus());
    }
  };
};

const mapStateToProps = state => {
  return {
    postFromSearchBar: state.postFromSearchBar
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxOption);
