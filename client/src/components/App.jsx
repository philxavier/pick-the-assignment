import React, { Component } from "react";

import NewsComponent from "../components/OtherComponents/NewsComponent.jsx";
import SideBar from "../components/OtherComponents/SideBar.jsx";
import SimpleMap from "./SimpleMap.jsx";
import { connect } from "react-redux";
import { resetPostFromSearchbar } from "../../../store/actions/AppAction.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSearchFromSearchBar(newCenter, zoom) {
    this.setState({
      center: newCenter,
      zoom: zoom,
    });
  }

  //HERE WE RENDER THE 3 MAIN COMPONENTS SIMPLE MAP, SIDE BAR AND SEARCH BAR
  render() {
    return (
      <div id="container">
        <SideBar />
        <SimpleMap handleSearchFromSearchBar={this.handleSearchFromSearchBar} />
        <NewsComponent />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    center: state.center,
    zoom: state.zoom,
    postFromSearchbar: state.postFromSearchbar,
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPostFromSearchBar: () => {
      dispatch(resetPostFromSearchbar());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
