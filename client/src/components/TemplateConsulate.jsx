import React, { Component } from "react";
import EmbassyImg from "./EmbassyImg.jsx";
import { Popup } from "semantic-ui-react";

export default class TemplateConsulate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      classPost,
      nameOfCity,
      boss,
      cost,
      src,
      photos,
      type,
      ...rest
    } = this.props;

    return (
      <div>
        <Popup
          content="Add users to your feed"
          trigger={
            <EmbassyImg
              photos={photos}
              nameOfCity={nameOfCity}
              classPost={classPost}
              boss={boss}
              cost={cost}
              src={src}
              type={type}
              {...rest}
            />
          }
        />
      </div>
    );
  }
}
