import { slide as Menu } from "react-burger-menu";
import Switch from "./Switch.jsx";
import React from "react";
import Button from "./Button.jsx";
import { Icon, sta } from "semantic-ui-react";
import CheckBoxForType from "./CheckboxForType.jsx";
import CheckBoxForBoss from "./CheckboxForBoss.jsx";
import { connect } from "react-redux";
import {
  clearBossRate,
  clearClass,
  clearType
} from "../../../../store/actions/SideBarAction.jsx";
import { reRenderMap } from "../../../../store/actions/SimpleMapAction.jsx";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: false,
      type: false,
      rate: false
    };
  }

  componentDidUpdate() {
    if (!this.state.category) {
      this.props.clearClass();
      this.props.reRenderMap();
    }

    if (!this.state.type) {
      this.props.clearType();
      this.props.reRenderMap();
    }

    if (!this.state.rate) {
      this.props.clearBossRate();
      this.props.reRenderMap();
    }
  }

  showSettings(event) {
    event.preventDefault();
    this.props.reRenderMap();
  }

  changeCategory(e) {
    e.preventDefault();
    this.setState({
      category: !this.state.category
    });
  }

  changeType = e => {
    e.preventDefault();
    this.setState({
      type: !this.state.type
    });
  };

  changeRate = e => {
    e.preventDefault();
    this.setState({
      rate: !this.state.rate
    });
  };

  renderCategory() {
    var categories = ["a", "b", "c", "d"];
    return (
      <ul>
        {categories.map((ele, ind) => {
          return (
            <div className="container-switch-button2" key={ind}>
              <Button textValue={ele.toUpperCase()} />
              <Switch textValue={ele} />
            </div>
          );
        })}
      </ul>
    );
  }

  renderBossRating() {
    var rates = ["a", "b", "c", "d", "e", "f"];
    return (
      <ul>
        {rates.map((ele, ind) => {
          return (
            <div style={{ color: "white" }} key={ind}>
              <CheckBoxForBoss rate={ele.toUpperCase()} />
            </div>
          );
        })}
      </ul>
    );
  }

  renderType() {
    var categories = ["Embassy", "Consulate", "Other"];
    return (
      <ul>
        {categories.map((ele, ind) => {
          return (
            <div className="container-switch-button2" key={ind}>
              <CheckBoxForType typeOfPost={ele} />
            </div>
          );
        })}
      </ul>
    );
  }

  render() {
    let { category, type, rate } = this.state;
    return (
      <Menu>
        <div
          style={{
            display: "flex",
            color: "white",
            alignItems: "baseline",
            marginBottom: "3%"
          }}
        >
          <Icon name="filter" size="big" />

          <h2 style={{ color: "white" }}>Filters</h2>
        </div>

        <div
          onClick={e => {
            this.changeCategory(e);
          }}
          style={{ color: "white", cursor: "pointer" }}
        >
          <div style={{ color: "white" }} className="label-arrow">
            <div
              style={{
                display: "flex",
                alignItems: "baseline"
              }}
            >
              <Icon name="trophy" />
              <h4>Category</h4>
            </div>

            {category ? (
              <Icon name="arrow alternate circle down outline" />
            ) : (
              <Icon name="arrow alternate circle right outline" />
            )}
          </div>
        </div>
        <div className="ul-category-wrapper">
          {category ? this.renderCategory() : null}
        </div>
        <div
          onClick={e => {
            this.changeType(e);
          }}
          style={{ color: "white", cursor: "pointer" }}
        >
          <div style={{ color: "white" }} className="label-arrow">
            <div
              style={{
                display: "flex",
                alignItems: "baseline"
              }}
            >
              <Icon name="building" />
              <h4>Type</h4>
            </div>

            {type ? (
              <Icon name="arrow alternate circle down outline" />
            ) : (
              <Icon name="arrow alternate circle right outline" />
            )}
          </div>
        </div>
        <div className="ul-category-wrapper">
          {type ? this.renderType() : null}
        </div>
        <div
          onClick={e => {
            this.changeRate(e);
          }}
          style={{ color: "white", cursor: "pointer" }}
        >
          <div style={{ color: "white" }} className="label-arrow">
            <div
              style={{
                display: "flex",
                alignItems: "baseline"
              }}
            >
              <Icon name="user times" />
              <h4>Boss Rate</h4>
            </div>

            {rate ? (
              <Icon name="arrow alternate circle down outline" />
            ) : (
              <Icon name="arrow alternate circle right outline" />
            )}
          </div>
        </div>
        <div className="ul-category-wrapper">
          {rate ? this.renderBossRating() : null}
        </div>
      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearType: () => {
      dispatch(clearType());
    },

    clearClass: () => {
      dispatch(clearClass());
    },

    clearBossRate: () => {
      dispatch(clearBossRate());
    },

    reRenderMap: () => {
      dispatch(reRenderMap());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Sidebar);
