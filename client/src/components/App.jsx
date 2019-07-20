import React, { Component } from "react";
import SimpleMap from "./SimpleMap.jsx";
import SearchBar from "./OtherComponents/SearchBar.jsx";
import SideBar from "../components/OtherComponents/SideBar.jsx";
import { connect } from "react-redux";
import { resetPostFromSearchbar } from "../../../store/actions/AppAction.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSearchFromSearchBar(newCenter, zoom) {
    this.setState({
      center: newCenter,
      zoom: zoom
    });
  }

  render() {
    let { currentRates, classOfPost, type } = this.props.filters;
    return (
      <div id="container">
        <SearchBar handleSearchFromSearchBar={this.handleSearchFromSearchBar} />
        <SideBar />
        <SimpleMap />
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
