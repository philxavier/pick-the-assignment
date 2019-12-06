import React, { Component, useState } from "react";
import regeneratorRuntime from "regenerator-runtime";

import {
  getAndTransformStats,
  calculateBossRateAndIncludeInRatingsOfRatings
} from "../../../../HelperFuncs";
import axios from "axios";
import { connect } from "react-redux";
import { setSizeOfCurrentPostReviewArray } from "../../../../store/actions/ModalForEmbassyAction.jsx";
import { setCurrentPostRatingOfRatings } from "../../../../store/actions/PopUpAction.jsx";
import {
  Image,
  Popup,
  Rating,
  Header,
  Modal,
  Divider,
  Button,
  Progress
} from "semantic-ui-react";

import Gallery from "react-grid-gallery";
import PostReviewModal from "./PostReviewModal.jsx";
import BossReviewModal from "./BossReviewModal.jsx";

const PlaceHolder = ({ ...rest }) => {
  let [ratingForRatingComponent, setRatingForRatingComponent] = useState(0);
  let [rating, setRating] = useState(0);
  let [loading, setLoading] = useState(0);
  let [safetyReview, setSafetyReview] = useState(null);
  let [funReview, setFunReview] = useState(null);
  let [workPlaceRating, setWorkPlaceRatingReview] = useState(null);
  let [costReview, setCostReview] = useState(null);
  let [bossReview, setBossReview] = useState(null);

  let displayRightRating = () => {
    if (loading === 1 || loading === 0) {
      return null;
    } else {
      return (
        <div style={{ marginTop: "5px" }}>
          <Rating
            icon="star"
            defaultRating={ratingForRatingComponent}
            maxRating={5}
          />
        </div>
      );
    }
  };

  let displayRightTypeOfPost = () => {
    let type = props.type;
    if (type === "e") {
      return "Embassy";
    } else if (type.includes("c")) {
      return "Consulate";
    } else {
      return "Delegation";
    }
  };

  let displayStats = () => {
    if (loading === 0) {
      return <p>No reviews yet</p>;
    } else if (loading === 1) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "10% 90%"
            }}
          >
            <div style={{ display: "flex" }}>
              <span> {"\u{1F4B5}"}</span>
              <p></p>
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: "-16px"
                }}
              >
                <Progress
                  size="small"
                  percent={costReview}
                  color={chooseColor(costReview)}
                  label="Salary/Cost"
                  inverted
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "10% 90%"
            }}
          >
            <div style={{ display: "flex" }}>
              <span> {"\u{1F46E}"}</span>
              <p></p>
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: "-16px"
                }}
              >
                <Progress
                  size="small"
                  percent={safetyReview}
                  color={chooseColor(safetyReview)}
                  label="Safety"
                  inverted
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "10% 90%"
            }}
          >
            <div style={{ display: "flex" }}>
              <span> {"\u{1F60E}"}</span>
              <p></p>
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: "-16px"
                }}
              >
                <Progress
                  size="small"
                  percent={funReview}
                  color={chooseColor(funReview)}
                  label="Fun"
                  inverted
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "10% 90%"
            }}
          >
            <div style={{ display: "flex" }}>
              <span> {"\u{1F91D}"}</span>
              <p></p>
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: "-16px"
                }}
              >
                <Progress
                  size="small"
                  percent={workPlaceRating}
                  color={chooseColor(workPlaceRating)}
                  label="Workplace Environment"
                  inverted
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "10% 90%",
              marginBottom: "22px"
            }}
          >
            <div style={{ display: "flex" }}>
              <span> {"\u{1F454}"}</span>
              <p></p>
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: "-16px"
                }}
              >
                <Progress
                  size="small"
                  percent={bossReview}
                  color={chooseColor(bossReview)}
                  label="Boss"
                  inverted
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  let chooseColor = inputNumber => {
    if (inputNumber >= 30 && inputNumber < 70) return "yellow";
    else if (inputNumber >= 70) return "green";
    else return "red";
  };

  var props = Object.assign({}, { ...rest });
  return (
    <Popup
      offset="0, 50px"
      position="left center"
      onOpen={async () => {
        setLoading(1);
        let getReviews = async () => {
          let resp = await axios.get(
            `/review/${props.nameOfCity}/${props.type[0]}`
          );
          return resp;
        };
        const reviews = await getReviews();
        let reviewsArray = reviews.data[0].reviewsByUser;
        if (reviewsArray.length === 0) {
          setLoading(0);
          return Promise.reject("empty review array");
        } else {
          props.setSizeOfCurrentPostReviewArray(reviewsArray.length);
          let average = getAndTransformStats(reviewsArray);
          let getBossInfo = async () => {
            let bossInfo = await axios.get(
              `/boss/${props.nameOfCity}/${props.type[0]}`
            );
            return bossInfo;
          };

          let bossInfo = await getBossInfo();
          console.log("this is bossInfo", bossInfo);
          let averageOfAverages = calculateBossRateAndIncludeInRatingsOfRatings(
            bossInfo,
            average,
            setRatingForRatingComponent,
            setRating,
            setSafetyReview,
            setFunReview,
            setWorkPlaceRatingReview,
            setBossReview,
            setCostReview
          );
          setLoading(2);
          props.setCurrentPostRatingOfRatings(averageOfAverages);
        }
      }}
      inverted
      trigger={
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              position: "absolute",
              zIndex: "2",
              marginLeft: "-10px"
            }}
            {...rest}
          />
        </div>
      }
    >
      <Popup.Header>
        <div>
          <div style={{ display: "flex" }}>
            {displayRightTypeOfPost()} of Brazil in {props.nameOfCity}
            <div
              style={{
                flex: "4",
                marginTop: "20px",
                textAlign: "center",
                margin: "0 auto"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  fontSize: "11px",
                  flex: "1",
                  borderRadius: "50%",
                  border: "white 2px solid"
                }}
              >
                {rating}
                <br /> stars
              </div>
            </div>
          </div>
          <div>{rating ? displayRightRating() : null}</div>
        </div>
      </Popup.Header>
      <Divider inverted />
      <Popup.Content>{displayStats()}</Popup.Content>
    </Popup>
  );
};

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusPostReviewModal: false,
      statusBossReviewModal: false,
      reviews: null,
      alt: "https://s3-us-west-1.amazonaws.com/mvp-sprint/Default.png"
    };

    this.openPostReviewModal = this.openPostReviewModal.bind(this);
    this.closePostReviewModal = this.closePostReviewModal.bind(this);
    this.openBossReviewModal = this.openBossReviewModal.bind(this);
    this.closeBossReviewModal = this.closeBossReviewModal.bind(this);
  }

  openBossReviewModal() {
    this.setState({
      statusBossReviewModal: true
    });
  }

  displayRightTypeOfPost() {
    let type = this.props.type;
    if (type === "e") {
      return "Embassy";
    } else if (type.includes("c")) {
      return "Consulate";
    } else {
      return "Delegation";
    }
  }

  closeBossReviewModal() {
    this.setState({
      statusBossReviewModal: false
    });
  }

  openPostReviewModal() {
    this.setState({
      statusPostReviewModal: true
    });
  }

  closePostReviewModal() {
    this.setState({
      statusPostReviewModal: false
    });
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
          {this.displayRightTypeOfPost()} of Brazil in {this.props.nameOfCity}
        </Modal.Header>
        <Modal.Content image>
          <div>
            <div style={{ textAlign: "center" }}>
              <Image
                wrapped
                size="medium"
                onError={e => {
                  e.target.src =
                    "https://mvp-sprint.s3-us-west-1.amazonaws.com/Default.png";
                }}
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
                <Button
                  onClick={this.openBossReviewModal}
                  color="green"
                  size="mini"
                >
                  Leave a review for this boss
                </Button>
                <BossReviewModal
                  infos={{ ...this.props }}
                  open={this.state.statusBossReviewModal}
                  close={this.closeBossReviewModal}
                />

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
                <div>
                  <h4>Reviews from Chans</h4>
                  <Button
                    onClick={this.openPostReviewModal}
                    color="green"
                    size="mini"
                  >
                    Leave a review for this post
                  </Button>
                  <PostReviewModal
                    reviews={this.state.reviews}
                    infos={{ ...this.props }}
                    open={this.state.statusPostReviewModal}
                    close={this.closePostReviewModal}
                  />
                </div>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const MapDispatchToProps = dispatch => {
  return {
    setCurrentPostRatingOfRatings: rating => {
      dispatch(setCurrentPostRatingOfRatings(rating));
    },
    setSizeOfCurrentPostReviewArray: reviewsArrayLength => {
      dispatch(setSizeOfCurrentPostReviewArray(reviewsArrayLength));
    }
  };
};

const MapStateToProps = state => {
  return {
    currentPostRating: state.currentPostRating
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(ModalComponent);
