import React, { Component } from "react";
import ModalForMission from "./OtherComponents/ModalForMission.jsx";

export default class EmbassyImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: false,
      placeHolder: false
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    let result;

    if (!this.state.placeHolder) {
      result = true;
    } else {
      result = false;
    }

    if (result) {
      this.setState({
        placeHolder: result
      });
    }
  }

  handleMouseLeave() {
    this.setState({
      placeHolder: !this.state.placeHolder
    });
  }

  render() {
    let { src, nameOfCity, boss, cost, classPost, photos } = this.props;

    return (
      <div>
        <div
          id="imgContainer"
          className="consulateStyle grow"
          onMouseEnter={this.handleMouseEnter}
        >
          {this.state.placeHolder ? (
            <div>
              <ModalForMission
                // mouseEnterForModal={this.mouseEnterForModal}
                onClick={this.handleClick}
                photos={photos}
                src={src}
                nameOfCity={nameOfCity}
                boss={boss}
                cost={cost}
                classPost={classPost}
                handleMouseLeave={this.handleMouseLeave}
              />
            </div>
          ) : null}
          <img
            id="consulateImg"
            src="https://s3-us-west-1.amazonaws.com/mvp-sprint/Mission.png"
            alt=""
            height="27"
            width="22"
          />
        </div>
      </div>
    );
  }
}
