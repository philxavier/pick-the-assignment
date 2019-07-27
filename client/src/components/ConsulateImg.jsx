import React, { Component, useState, useEffect } from "react";
import ModalForConsulate from "./OtherComponents/ModalForConsulate.jsx";

export default class consulateImg extends Component {
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
      placeHolder: !this.state.placeHolder,
      disabled: false
    });
  }

  render() {
    let { src, nameOfCity, boss, cost, classPost, photos } = this.props;
    return (
      <div>
        <div
          ref={this.myRef}
          id="imgContainer"
          className="consulateStyle grow"
          onMouseEnter={this.handleMouseEnter}
        >
          {this.state.placeHolder ? (
            <div>
              <ModalForConsulate
                onMouseOver={this.handleMouseOver}
                photos={photos}
                src={src}
                nameOfCity={nameOfCity}
                boss={boss}
                cost={cost}
                classPost={classPost}
                handleMouseLeave={this.handleMouseLeave}
                setDisabledToTrue={this.setDisabledToTrue}
              />
            </div>
          ) : null}

          <img
            id="consulateImg"
            onClick={this.handleClick}
            src="https://s3-us-west-1.amazonaws.com/mvp-sprint/Consulate.png"
            alt=""
            height="27"
            width="22"
          />
        </div>
      </div>
    );
  }
}
