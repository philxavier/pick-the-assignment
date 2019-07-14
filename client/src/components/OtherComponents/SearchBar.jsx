import { Icon, Input } from "semantic-ui-react";
import React, { Component } from "react";
import namesOfCities from "../../../../database-mongo/postsString";
import { World } from "styled-icons/boxicons-regular/World";
import Axios from "axios";
import { thisExpression } from "@babel/types";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barValue: "",
      namesOfCities: namesOfCities.namesOfCities,
      suggestions: [],
      activeSuggestions: false
    };

    this.handleBarChange = this.handleBarChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidUpdate(prevprops) {
    if (this.props.clearBar !== prevprops.clearBar) {
      this.setState({
        barValue: ""
      });
    }
  }

  renderSuggestions() {
    let { suggestions } = this.state;
    return (
      <div className="suggestion-list">
        <ul>
          {suggestions.map((ele, ind) => {
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

  clearBar() {}

  handleSearch() {
    var targetPost = this.state.barValue;
    Axios.get(`./findPost/${targetPost}`)
      .then(result => {
        this.props.handleSearchFromSearchBar(result);
      })
      .catch(err => {
        console.log("there was an error", err);
      });
  }

  createSuggestionList(value) {
    if (!value) {
      this.setState({
        suggestions: []
      });
      return;
    }

    const regex = new RegExp(`^${value}`, "i");
    const suggestions = this.state.namesOfCities
      .sort()
      .filter(v => regex.test(v));
    this.setState({
      activeSuggestions: !this.activeSuggestions,
      suggestions: suggestions
    });
    // this.renderSuggestions();
  }

  handleBarChange(e) {
    let value = e.target.value;
    this.setState({
      barValue: value
    });

    this.createSuggestionList(value);
  }

  render() {
    return (
      <div className="search-bar">
        <div className="input-bar">
          <Input
            value={this.state.barValue}
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
              this.handleBarChange(e);
            }}
          />
          {this.state.activeSuggestions ? this.renderSuggestions() : null}
        </div>
      </div>
    );
  }
}
