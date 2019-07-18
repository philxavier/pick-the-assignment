import React, { Component } from "react";
import SimpleMap from "./SimpleMap.jsx";
import SearchBar from "./OtherComponents/SearchBar.jsx";
import SideBar from "../components/OtherComponents/SideBar.jsx";
import HelperFuncs from "../../../HelperFuncs.js";
import { connect } from "react-redux";
import { resetPostFromSearchbar } from "../../../store/actions/AppAction.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    // this.handleSwitchClassChange = this.handleSwitchClassChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleBossRateChange = this.handleBossRateChange.bind(this);
    this.handleSearchFromSearchBar = this.handleSearchFromSearchBar.bind(this);
  }

  handleTypeChange(inputType) {
    //let's see if that class of post is inside this.state.filters.type
    //if it is, let's remove it, if not, let's include it

    let newTypeOfPost = this.props.filters.type.slice();

    HelperFuncs.buildNewTypeOfPost(newTypeOfPost, inputType);

    this.setState({
      filters: {
        type: newTypeOfPost,
        classOfPost: this.props.filters.classOfPost,
        currentRates: this.props.filters.currentRates
      }
    });
  }

  handleBossRateChange(inputRate) {
    //let's filter the results based on the rates currently selected;
    let newRatesArr = this.props.filters.currentRates.slice();

    HelperFuncs.buildNewRates(newRatesArr, inputRate);

    this.setState({
      filters: {
        type: this.props.filters.type,
        classOfPost: this.props.filters.classOfPost,
        currentRates: newRatesArr
      }
    });
  }

  handleSearchFromSearchBar(newCenter, zoom) {
    this.setState({
      center: newCenter,
      zoom: zoom
    });
  }

  render() {
    let { currentRates, classOfPost, type } = this.props.filters;
    console.log("aaaaaaaaaaaaaaaaaaaaap", this.props);
    return (
      <div id="container">
        <SearchBar handleSearchFromSearchBar={this.handleSearchFromSearchBar} />
        <SideBar
          handleSwitchClassChange={this.props.handleSwitchClassChange}
          handleTypeChange={this.handleTypeChange}
          handleBossRateChange={this.handleBossRateChange}
        />
        <SimpleMap
          postFromSearchbar={this.props.postFromSearchbar}
          type={type}
          classOfPost={classOfPost}
          currentRates={currentRates}
          center={this.props.center}
          zoom={this.props.zoom}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    center: state.center,
    zoom: state.zoom,
    postFromSearchbar: state.postFromSearchbar,
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPostFromSearchBar: () => {
      dispatch(resetPostFromSearchbar());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
