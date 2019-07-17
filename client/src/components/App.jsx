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
    this.state = {
      filters: {
        classOfPost: [],
        type: [],
        currentRates: []
      }
    };

    this.handleSwitchClassChange = this.handleSwitchClassChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleBossRateChange = this.handleBossRateChange.bind(this);
    this.handleSearchFromSearchBar = this.handleSearchFromSearchBar.bind(this);
  }

  handleSwitchClassChange(inputClassOfPost) {
    //let's see if that class of post is inside this.state.filters.classOfPost
    //if it is, let's remove it, if not, let's include it
    let newClassOfPost = this.state.filters.classOfPost.slice();

    HelperFuncs.buildNewClassOfPost(newClassOfPost, inputClassOfPost);

    this.setState(
      {
        filters: {
          classOfPost: newClassOfPost,
          type: this.state.filters.type,
          currentRates: this.state.filters.currentRates
        }
      },
      this.props.resetPostFromSearchBar()
    );
  }

  handleTypeChange(inputType) {
    //let's see if that class of post is inside this.state.filters.type
    //if it is, let's remove it, if not, let's include it

    let newTypeOfPost = this.state.filters.type.slice();

    HelperFuncs.buildNewTypeOfPost(newTypeOfPost, inputType);

    this.setState({
      filters: {
        type: newTypeOfPost,
        classOfPost: this.state.filters.classOfPost,
        currentRates: this.state.filters.currentRates
      }
    });
  }

  handleBossRateChange(inputRate) {
    //let's filter the results based on the rates currently selected;
    let newRatesArr = this.state.filters.currentRates.slice();

    HelperFuncs.buildNewRates(newRatesArr, inputRate);

    this.setState({
      filters: {
        type: this.state.filters.type,
        classOfPost: this.state.filters.classOfPost,
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
    let { currentRates, classOfPost, type } = this.state.filters;
    let { zoom, center } = this.state;
    console.log("aaaaaaaaaaaaaaaaaaaaap", this.props);
    return (
      <div id="container">
        <SearchBar handleSearchFromSearchBar={this.handleSearchFromSearchBar} />
        <SideBar
          handleSwitchClassChange={this.handleSwitchClassChange}
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
    postFromSearchbar: state.postFromSearchbar
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
