import React, { Component } from "react";
import EmbassyImg from "./EmbassyImg.jsx";

export default class TemplateMission extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { classPost, photos, nameOfCity, boss, cost, src, type } = this.props;
    return (
      <div>
        <EmbassyImg
          photos={photos}
          nameOfCity={nameOfCity}
          type={type}
          classPost={classPost}
          boss={boss}
          cost={cost}
          src={src}
        />
      </div>
    );
  }
}
