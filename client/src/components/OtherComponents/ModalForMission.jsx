import React, { Component, useState, useEffect } from "react";
import {
  Image,
  Popup,
  Rating,
  Header,
  Modal,
  Divider
} from "semantic-ui-react";

import Gallery from "react-grid-gallery";

const PlaceHolder = ({ ...rest }) => {
  var props = Object.assign({}, { ...rest });
  return (
    <Popup
      inverted
      trigger={
        <div>
          <div
            style={{
              width: "22px",
              height: "27px",
              position: "absolute",
              zIndex: "2"
            }}
            {...rest}
          />
        </div>
      }
    >
      <Popup.Header>Delegacao do Brasil em {props.nameOfCity}</Popup.Header>
      <Popup.Content>
        <Rating icon="star" defaultRating={3} maxRating={4} />
      </Popup.Content>
    </Popup>
  );
};

export default class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Modal
        onClose={() => {
          this.props.handleMouseLeave();
        }}
        trigger={<PlaceHolder {...this.props} />}
        closeIcon
      >
        <Modal.Header>
          Delegacao do Brasil in {this.props.nameOfCity}
        </Modal.Header>
        <Modal.Content image>
          <div>
            <div style={{ textAlign: "center" }}>
              <Image
                wrapped
                size="medium"
                src={this.props.src}
                bordered={true}
              />
            </div>
            <Divider />
            <div>
              <Gallery images={this.props.photos} backdropClosesModal={true} />
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Dictumst vestibulum rhoncus est pellentesque elit ullamcorper.
                  Vitae purus faucibus ornare suspendisse sed nisi lacus. Arcu
                  felis bibendum ut tristique et egestas quis. Donec ultrices
                  tincidunt arcu non sodales. Risus commodo viverra maecenas
                  accumsan lacus vel facilisis. Fermentum dui faucibus in
                  ornare. Suscipit adipiscing bibendum est ultricies integer
                  quis auctor elit. Fames ac turpis egestas integer eget aliquet
                  nibh. Sed adipiscing diam donec adipiscing tristique risus nec
                  feugiat in. Integer malesuada nunc vel risus commodo viverra
                  maecenas accumsan lacus. Mi proin sed libero enim sed faucibus
                  turpis in. Fringilla phasellus faucibus scelerisque eleifend.
                  Ullamcorper a lacus vestibulum sed arcu non odio euismod. Quis
                  imperdiet massa tincidunt nunc.
                </p>
                <h4>Boss Information</h4>
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    Boss Name: <b>{this.props.boss[0]}</b>
                  </li>
                  <li>
                    What is his / her current evaluation:{" "}
                    <b>{this.props.boss[1]}</b>
                  </li>
                </ul>
                <h4>
                  Cost of Living info: (These indices are relative to New York
                  City: 100)
                </h4>
                {this.props.cost === undefined ? (
                  <p>Information not available</p>
                ) : (
                  <ul style={{ listStyleType: "none" }}>
                    <li>
                      The Cost of living Index of {this.props.nameOfCity} is:{" "}
                      <b>{this.props.cost.costOfLivingIndex}</b>
                    </li>
                    <li>
                      The Rent Index of {this.props.nameOfCity} is{" "}
                      <b>{this.props.cost.rentIndex}</b>
                    </li>
                    <li>
                      The Groceries Index of {this.props.nameOfCity} is :{" "}
                      <b>{this.props.cost.groceriesIndex}</b>
                    </li>
                    <li>
                      The Restaurant Price Index of {this.props.nameOfCity} is{" "}
                      <b>{this.props.cost.restaurantPriceIndex}</b>
                    </li>
                    <li>
                      The Local Purchase Power Index of {this.props.nameOfCity}{" "}
                      is <b>{this.props.cost.localPurchasePowerIndex}</b>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
