import React, { Component } from "react";
import EmbassyImg from "./EmbassyImg.jsx";

export default class TemplateEmbassy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      classPost,
      src,
      nameOfCity,
      boss,
      cost,
      photos,
      reviews,
      type
    } = this.props;
    return (
      <div>
        <EmbassyImg
          photos={photos}
          reviews={reviews}
          nameOfCity={nameOfCity}
          classPost={classPost}
          boss={boss}
          cost={cost}
          src={src}
          type={type}
        />
      </div>
    );
  }
}
