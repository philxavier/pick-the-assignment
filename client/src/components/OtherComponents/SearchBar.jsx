import { Icon, Input } from "semantic-ui-react";
import React, { Component } from "react";
import { World } from "styled-icons/boxicons-regular/World";
import Axios from "axios";
import { connect } from "react-redux";
import {
  fetchPosts,
  changeValue,
  includeValue,
  changeMapParams,
  clearSidebarConfig
} from "../../../../store/actions/SearchbarAction.jsx";
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
              <li key={ind}>
                <span
                  //THIS IS HOW WE INCLUDE THE SELECTED POST ON THE SEARCHBAR
                  onClick={e => {
                    this.props.includeValue(e.target.id);
                    //HERE WE CLOSE THE SUGGESTION LIST BY PASSING AN EMPTY STRING TO FETCHPOSTS
                    this.props.fetchPosts("");
                  }}
                  id={ele.name}
                  className="listed-item"
                >
                  {ele.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  handleSearch() {
    let searchTerm = this.props.barValue;
    Axios.get(`/findPost/${searchTerm}`)
      .then(result => {
        let cord1 = result.data[0].lat;
        let cord2 = result.data[0].lng;
        let newCenter = { lat: cord1, lng: cord2 };
        let zoom = 4;
        var currentPost = result.data[0];
        this.props.changeMapParams(newCenter, zoom, currentPost);
        this.props.clearSidebarConfig();
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
    console.log("props in searchbar", this.props);
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
                  this.props.clearSidebarConfig();
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
                //If user clicks outside, we close the suggestion list THROUGH
                //OUTSIDECLICKHANDLER
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
    },
    includeValue: nameOfPost => {
      dispatch(includeValue(nameOfPost));
    },
    changeMapParams: (coords, zoom, currentPost) => {
      dispatch(changeMapParams(coords, zoom, currentPost));
    },
    clearSidebarConfig: () => {
      dispatch(clearSidebarConfig());
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
