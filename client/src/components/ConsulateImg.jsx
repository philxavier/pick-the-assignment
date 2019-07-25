import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import { Header, Modal } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import Gallery from "react-grid-gallery";

const PlaceHolder = ({ ...rest }) => (
  <div
    style={{ width: "22px", height: "27px", position: "absolute", zIndex: "2" }}
    {...rest}
  />
);

const ModalComponent = props => (
  <Modal
    onClose={() => {
      props.handleMouseLeave();
    }}
    trigger={<PlaceHolder />}
    closeIcon
  >
    <Modal.Header>Consulate of Brazil in {props.nameOfCity}</Modal.Header>
    <Modal.Content image>
      <div>
        <div style={{ textAlign: "center" }}>
          <Image wrapped size="medium" src={props.src} bordered={true} />
        </div>
        <Divider />
        <div>
          <Gallery images={props.photos} backdropClosesModal={true} />
        </div>
      </div>
      <Modal.Description>
        <div
          style={{
            borderLeft: "solid 0.2px",
            height: "100%",
            width: "35em",
            overflowWrap: "break-word",
            overflowY: "visible",
            textAlign: "justify",
            marginLeft: "10px"
          }}
        >
          <div style={{ marginLeft: "12px" }}>
            <Header>General Description</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Dictumst vestibulum rhoncus est pellentesque elit ullamcorper.
              Vitae purus faucibus ornare suspendisse sed nisi lacus. Arcu felis
              bibendum ut tristique et egestas quis. Donec ultrices tincidunt
              arcu non sodales. Risus commodo viverra maecenas accumsan lacus
              vel facilisis. Fermentum dui faucibus in ornare. Suscipit
              adipiscing bibendum est ultricies integer quis auctor elit. Fames
              ac turpis egestas integer eget aliquet nibh. Sed adipiscing diam
              donec adipiscing tristique risus nec feugiat in. Integer malesuada
              nunc vel risus commodo viverra maecenas accumsan lacus. Mi proin
              sed libero enim sed faucibus turpis in. Fringilla phasellus
              faucibus scelerisque eleifend. Ullamcorper a lacus vestibulum sed
              arcu non odio euismod. Quis imperdiet massa tincidunt nunc.
            </p>
            <h4>Boss Information</h4>
            <ul style={{ listStyleType: "none" }}>
              <li>
                Boss Name: <b>{props.boss[0]}</b>
              </li>
              <li>
                What is his / her current evaluation: <b>{props.boss[1]}</b>
              </li>
            </ul>
            {console.log(props.cost)}
            <h4>
              Cost of Living info: (These indices are relative to New York City:
              100)
            </h4>
            {props.cost === undefined ? (
              <p>Information not available</p>
            ) : (
              <ul style={{ listStyleType: "none" }}>
                <li>
                  The Cost of living Index of {props.nameOfCity} is:{" "}
                  <b>{props.cost.costOfLivingIndex}</b>
                </li>
                <li>
                  The Rent Index of {props.nameOfCity} is{" "}
                  <b>{props.cost.rentIndex}</b>
                </li>
                <li>
                  The Groceries Index of {props.nameOfCity} is :{" "}
                  <b>{props.cost.groceriesIndex}</b>
                </li>
                <li>
                  The Restaurant Price Index of {props.nameOfCity} is{" "}
                  <b>{props.cost.restaurantPriceIndex}</b>
                </li>
                <li>
                  The Local Purchase Power Index of {props.nameOfCity} is{" "}
                  <b>{props.cost.localPurchasePowerIndex}</b>
                </li>
              </ul>
            )}
          </div>
        </div>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

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
          //  onMouseLeave = {this.handleMouseLeave}
        >
          {this.state.placeHolder ? (
            <ModalComponent
              photos={photos}
              src={src}
              nameOfCity={nameOfCity}
              boss={boss}
              cost={cost}
              classPost={classPost}
              handleMouseLeave={this.handleMouseLeave}
            />
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
