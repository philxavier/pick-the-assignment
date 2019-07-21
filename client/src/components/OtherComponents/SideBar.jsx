import React, { Component } from "react"; //Always need in JSX files
import SwitchExample from "./Switch.jsx";
import Button from "./Button.jsx";
import CheckboxOption from "./CheckboxOption.jsx";
import CheckboxForBoss from "./CheckboxForBoss.jsx";
import { resetPostFromSearchbar } from "../../../../store/actions/AppAction.jsx";
import { connect } from "react-redux";
import { clearSidebarConfig } from "../../../../store/actions/SearchbarAction.jsx";

// Create the HTML to return for the input
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfPost: ["Embassy", "Consulate", "Other"],
      bossRatings: ["A", "B", "C", "D", "E", "F"]
    };
  }

  render() {
    return (
      <div className="sidebar">
        <div id="sideBarText">
          <h3>Filters</h3>
        </div>
        <div id="categoria">
          <h4 id="categoriaTitle">Post Class</h4>
          <div id="containerButtonSwitch">
            <div id="containerSwitch">
              <SwitchExample
                textValue={"a"}
                handleSwitchClassChange={this.props.handleSwitchClassChange}
                clearSidebar={this.props.clearSidebar}
              />
            </div>
            <Button textValue="A" />
          </div>
          <div id="containerButtonSwitch">
            <div id="containerSwitch">
              <SwitchExample
                textValue={"b"}
                handleSwitchClassChange={this.props.handleSwitchClassChange}
                clearSidebar={this.props.clearSidebar}
              />
            </div>
            <Button textValue="B" />
          </div>
          <div id="containerButtonSwitch">
            <div id="containerSwitch">
              <SwitchExample
                textValue={"c"}
                handleSwitchClassChange={this.props.handleSwitchClassChange}
                clearSidebar={this.props.clearSidebar}
              />
            </div>
            <Button textValue="C" />
          </div>
          <div id="containerButtonSwitch">
            <div id="containerSwitch">
              <SwitchExample
                textValue={"d"}
                handleSwitchClassChange={this.props.handleSwitchClassChange}
                clearSidebar={this.props.clearSidebar}
              />
            </div>
            <Button textValue="D" />
          </div>
        </div>
        <div className="wrapper">
          <h4 id="typeOfPost">Type of Post</h4>
          <ul>
            {this.state.typeOfPost.map((ele, ind) => {
              return (
                <CheckboxOption
                  resetPostFromSearchbar={this.props.resetPostFromSearchbar}
                  handleTypeChange={this.props.handleTypeChange}
                  key={ind}
                  typeOfPost={ele}
                  clearSidebar={this.props.clearSidebar}
                />
              );
            })}
          </ul>
        </div>
        <div className="bossReview">
          <h4 id="bossReview">Boss Review</h4>
          <div
            id="boxContainers"
            name="paymentContainer"
            className="paymentOptions"
          >
            {this.state.bossRatings.map((ele, ind) => {
              return (
                <CheckboxForBoss
                  key={ind}
                  rate={ele}
                  handleBossRateChange={this.props.handleBossRateChange}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPostFromSearchbar: () => {
      dispatch(resetPostFromSearchbar());
    },
    clearSidebarConfig: () => {
      dispatch(clearSidebarConfig());
    }
  };
};

const mapStateToProps = state => {
  return {
    clearSidebar: state.clearSidebar,
    filter: state.filter,
    fullListOfPosts: state.fullListOfPosts
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
