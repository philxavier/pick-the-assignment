import { Icon, Input } from "semantic-ui-react";
import React, { Component } from "react";
import { World } from "styled-icons/boxicons-regular/World";
import Axios from "axios";
import { connect } from "react-redux";
import {
  fetchPosts,
  changeValue
} from "../../../../store/actions/SearchBarAction.jsx";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleBarChange = this.handleBarChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  renderSuggestions() {
    let { fetchedPosts } = state;
    return (
      <div className="suggestion-list">
        <ul>
          {fetchedPosts.map((ele, ind) => {
            return (
              <li key={ind}>
                <span
                  id={ele}
                  ref={this.testRef}
                  onClick={e => {
                    var newBarValue = e.target.id;
                    this.setState({
                      barValue: newBarValue,
                      activeSuggestions: !this.state.activeSuggestions
                    });
                  }}
                  className="listed-item"
                >
                  {ele}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  handleSearch() {
    let searchTerm = this.state.barValue;
    Axios.get(`/findPost/${searchTerm}`)
      .then(result => {
        console.log("the data is here", result);
        let cord1 = result.data[0].lat;
        let cord2 = result.data[0].lng;
        let newCenter = { lat: cord1, lng: cord2 };
        let zoom = 5;
        this.props.handleSearchFromSearchBar(newCenter, zoom);
      })
      .catch(err => {
        console.log("there was an error", err);
      });
  }

  handleBarChange(e) {
    let newBarValue = e.target.value;
    this.setState({
      barValue: newBarValue
    });
  }

  render() {
    console.log(this.props);

    let { barValue } = this.props;
    return (
      <div id="searchbar">
        <div id="imageContainer">
          <World color="rgb(233, 82, 13)" size="40" />
          <h4 id="text-logo">Pick an Assignment</h4>
        </div>
        <div id="inputBar">
          <Input
            value={barValue}
            size="large"
            icon={
              <Icon
                onClick={() => {
                  this.handleSearch();
                }}
                name="search"
                inverted
                circular
                link
              />
            }
            placeholder="Search..."
            focus={true}
            onChange={e => {
              this.props.changeValue(e.target.value);
              this.props.fetchPosts(e.target.value);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeValue: value => {
      dispatch(changeValue(value));
    },
    fetchPosts: input => {
      dispatch(fetchPosts(input));
    }
  };
};

const mapStateToProps = state => {
  return {
    barValue: state.barValue,
    fetchedPosts: state.fetchedPosts
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
