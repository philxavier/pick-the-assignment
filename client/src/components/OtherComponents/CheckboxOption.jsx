import React, { Component } from "react";
import { connect } from "react-redux";
import { handleTypeChange } from "../../../../store/actions/CheckBoxOptionAction.jsx";
import { resetPostFromSearchbar } from "../../../../store/actions/AppAction.jsx";
import { reRenderMap } from "../../../../store/actions/SimpleMapAction.jsx";
class CheckboxOption extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(postReference) {
    let firstLetter = postReference[0].toLowerCase();
    this.props.handleTypeChange(firstLetter);
    this.props.reRenderMap();
  }

  render() {
    return (
      <div className="checkBoxContainer">
        <li className="radioClass">
          <input
            id="checkbox"
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
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CheckboxOption);
