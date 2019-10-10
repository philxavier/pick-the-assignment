import React from "react";
import axios from "axios";
import {
  Button,
  Header,
  Icon,
  Image,
  Modal,
  TextArea,
  Form,
  Rating,
  Statistic,
  Message
} from "semantic-ui-react";
import Calendar from "./Calendar.jsx";

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overallRating: null,
      cost: null,
      fun: null,
      workPlaceRating: null,
      safety: null,
      submited: false,
      textAreaContent: "",
      date1: null,
      date2: null,
      textAreaNotCompleteOnSubmit: false,
      dateNotCompleteOnSubmit: false,
      ratingNotCompleteOnSubmit: false,
      showSuccessMessage: false,
      retrievedRate: this.props.reviews
    };

    this.retrieveDates = this.retrieveDates.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.revealSuccessSubmissionMessage = this.revealSuccessSubmissionMessage.bind(
      this
    );
    this.calculatedAverage = this.calculatedAverage.bind(this);

    this.costRef = React.createRef();
    this.funRef = React.createRef();
    this.workPlaceRatingRef = React.createRef();
    this.safetyRef = React.createRef();
  }

  handleChange(e) {
    let content = e.target.value;

    this.setState({
      textAreaContent: content
    });
  }

  revealSuccessSubmissionMessage() {
    return (
      <Message
        icon="check"
        success
        header="Your review was successfully submited!"
        content="People will love to hear your opinion on this post"
      />
    );
  }

  revealWarningForTextArea() {
    return (
      <div style={{ marginTop: "2%", marginBottom: "2%" }}>
        <Message
          warning
          header="Written reviews are good!"
          content="Writte a little bit and tell us what you think"
        />
      </div>
    );
  }

  revealWarningForRating() {
    return (
      <div>
        <Message
          warning
          header="Don't forget to complete all the ratings!"
          content="Let's see how this place would rate in your opinion."
        />
      </div>
    );
  }

  resetOptions() {
    this.setState({
      currentRating: null,
      date1: null,
      date2: null,
      textAreaContent: "",
      submited: false
    });
  }

  revealWarningForDate() {
    return (
      <div style={{ marginTop: "2%" }}>
        <Message
          warning
          header="How about the date?"
          content="Don't forget to insert the date"
        />
      </div>
    );
  }

  calculatedAverage() {
    if (!this.state.retrievedRate) {
      return 0;
    }

    let sumOfRatings = this.state.retrievedRate.reduce((accum, ele) => {
      return accum + ele.currentRating;
    }, 0);

    sumOfRatings = (sumOfRatings / this.state.retrievedRate.length).toFixed(1);

    return sumOfRatings;
  }

  validateDataForSubmition() {
    let {
      textAreaContent,
      date1,
      date2,
      cost,
      safety,
      workPlaceRating,
      fun
    } = this.state;

    if (!date1 || !date2) {
      this.setState({
        dateNotCompleteOnSubmit: true
      });
      setTimeout(() => {
        this.setState({
          dateNotCompleteOnSubmit: false
        });
      }, 3000);
      return;
    }

    if (!cost || !safety || !workPlaceRating || !fun) {
      this.setState({
        ratingNotCompleteOnSubmit: true
      });
      setTimeout(() => {
        this.setState({
          ratingNotCompleteOnSubmit: false
        });
      }, 3000);
      return;
    }

    if (textAreaContent.length === 0) {
      this.setState({
        textAreaNotCompleteOnSubmit: true
      });
      setTimeout(() => {
        this.setState({
          textAreaNotCompleteOnSubmit: false
        });
      }, 3000);
      return;
    }

    return true;
  }

  handleSubmit() {
    if (this.validateDataForSubmition() === true) {
      this.setState({
        showSuccessMessage: true
      });
    } else {
      return;
    }

    let fullReview = {
      cost: this.state.cost,
      dates: [this.state.date1, this.state.date2],
      workPlaceRating: this.state.workPlaceRating,
      fun: this.state.fun,
      textAreaContent: this.state.textAreaContent,
      type: "e",
      postName: this.props.infos.nameOfCity,
      safety: this.state.safety
    };

    console.log("this is the review", fullReview);

    axios
      .post("/review", fullReview)
      .then(() => {
        let name = this.props.infos.nameOfCity;
        let type = "e";
        axios.get(`/review/${name}/${type}`).then(result => {
          let reviews = result.data[0].review;
          let newAverage = (
            reviews.reduce((accum, ele) => {
              return accum + ele.currentRating;
            }, 0) / reviews.length
          ).toFixed(1);
          this.setState({
            retrievedRate: newAverage
          });
        });
      })
      .catch(err => {
        console.log("there was an error posting", err);
      });
    //get rating for that post
    //update statistics

    this.setState({
      submited: true
    });
  }

  retrieveDates(date1, date2) {
    this.setState({
      date1: date1,
      date2: date2
    });
  }

  handleRate(e, { rating, maxRating, value }) {
    console.log("this is value", value);
    this.setState(
      {
        [value]: rating
      },
      () => {
        let { cost, fun, workPlaceRating, safety } = this.state;

        if (
          cost !== null &&
          fun !== null &&
          workPlaceRating !== null &&
          safety !== null
        ) {
          var average = cost + fun + workPlaceRating + safety;
          average = (average / 4).toFixed(1);

          this.setState({
            overallRating: average
          });
        }
      }
    );
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={() => {
          this.props.close();
          this.resetOptions();
        }}
        closeIcon
      >
        <Modal.Header>
          Review for Embassy of Brazil in {this.props.infos.nameOfCity}
        </Modal.Header>
        <Modal.Content image scrolling>
          <div style={{ textAlign: "center", marginRight: "2%" }}>
            <Image
              size="medium"
              src="https://mvp-sprint.s3-us-west-1.amazonaws.com/postReviewImg.gif"
              wrapped
            />
            <h2>Current evaluation is: </h2>
            {!this.props.reviews ? (
              <div>
                <Statistic color="yellow">
                  <Statistic.Value>
                    {typeof this.state.retrievedRate === "string"
                      ? this.state.retrievedRate
                      : this.calculatedAverage()}
                  </Statistic.Value>
                  <Statistic.Label>stars</Statistic.Label>
                </Statistic>

                <div>
                  <Header.Subheader>
                    {this.state.reviews ? this.state.reviews.cost.length : null}
                  </Header.Subheader>
                </div>
              </div>
            ) : (
              <Header>There are no reviews yet</Header>
            )}
          </div>
          {!this.state.showSuccessMessage ? (
            <Modal.Description>
              <div>
                <Header>What period of time did you work here?</Header>
                <div>
                  <div>
                    <Calendar retrieveDates={this.retrieveDates} />
                  </div>
                </div>

                <Header>How would you rate safety in this Post</Header>
                <Rating
                  ref={this.safetyRef}
                  value="safety"
                  clearable
                  size="huge"
                  icon="star"
                  defaultRating={0}
                  maxRating={5}
                  onRate={this.handleRate}
                />
              </div>
              <Header>
                Was it expensive or cheap?
                <Header.Subheader>
                  take into account the salary x cost of living relationship on
                  this one
                </Header.Subheader>
              </Header>
              <Rating
                ref={this.costRef}
                value="cost"
                clearable
                size="huge"
                icon="star"
                defaultRating={0}
                maxRating={5}
                onRate={this.handleRate}
              />

              <Header>How fun was this place? Cool city?</Header>
              <Rating
                ref={this.funRef}
                value="fun"
                clearable
                size="huge"
                icon="star"
                defaultRating={0}
                maxRating={5}
                onRate={this.handleRate}
              />

              <Header>
                How was the work?
                <Header.Subheader>
                  take into account work environment, personnel, and ammount of
                  work
                </Header.Subheader>
              </Header>
              <Rating
                ref={this.workPlaceRatingRef}
                value="workPlaceRating"
                clearable
                size="huge"
                icon="star"
                defaultRating={0}
                maxRating={5}
                onRate={this.handleRate}
              />

              <Header>Tell us a little about you experience here</Header>
              <Form>
                <TextArea
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  placeholder="Tell us more"
                />
              </Form>
              {this.state.textAreaNotCompleteOnSubmit
                ? this.revealWarningForTextArea()
                : null}
              <Header>
                <div style={{ marginBottom: "10px" }}>
                  The average evaluation you have given is:
                  {!this.state.overallRating ? (
                    <Header as="h4" color="red">
                      No reviews yet
                    </Header>
                  ) : (
                    <Statistic>
                      <Statistic.Value>
                        {this.state.overallRating}
                      </Statistic.Value>
                      <Statistic.Label> Stars</Statistic.Label>
                    </Statistic>
                  )}
                </div>
              </Header>
            </Modal.Description>
          ) : (
            this.revealSuccessSubmissionMessage()
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit} color="green">
            Submit <Icon name="chevron right" />
          </Button>
          {this.state.dateNotCompleteOnSubmit ? (
            <div style={{ textAlign: "left" }}>
              {this.revealWarningForDate()}
            </div>
          ) : null}
          {this.state.ratingNotCompleteOnSubmit ? (
            <div style={{ textAlign: "left" }}>
              {this.revealWarningForRating()}
            </div>
          ) : null}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ReviewModal;
