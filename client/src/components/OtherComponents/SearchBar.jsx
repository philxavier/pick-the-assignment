import { Icon, Input } from "semantic-ui-react";
import React, { Component } from "react";
import { World } from "styled-icons/boxicons-regular/World";
import Axios from "axios";
import { connect } from "react-redux";
import {
  fetchPosts,
  changeValue
} from "../../../../store/actions/SearchBarAction.jsx";
import OutsideClickHandler from "react-outside-click-handler";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleBarChange = this.handleBarChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  renderSuggestions() {
    let { fetchedPosts } = this.props;
    return (
      <div className="suggestion-list">
        <ul className="list-container">
          {fetchedPosts.map((ele, ind) => {
            return (
              <li className="listed-item" key={ind} className="listed-item">
                {ele.name}
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
    console.log(this.props.fetchedPosts);

    let { barValue } = this.props;
    return (
      <div className="searchbar">
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
          {this.props.fetchedPosts.length ? (
            <OutsideClickHandler
              onOutsideClick={() => {
                //dispatch action that sets fetchedPosts to []
                //If user clicks outside, we close the suggestion list
                this.props.fetchPosts("");
              }}
            >
              {this.renderSuggestions()}
            </OutsideClickHandler>
          ) : null}
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
