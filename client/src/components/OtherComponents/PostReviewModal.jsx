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
      currentRating: null,
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
          header="How about the rating?"
          content="Let's see how  this place would rate in your opinion."
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
    let sumOfRatings = this.state.retrievedRate.reduce((accum, ele) => {
      return accum + ele.currentRating;
    }, 0);

    sumOfRatings = (sumOfRatings / this.state.retrievedRate.length).toFixed(1);

    return sumOfRatings;
  }

  validateDataForSubmition() {
    let { textAreaContent, date1, date2, currentRating } = this.state;

    if (!currentRating) {
      this.setState({
        ratingNotCompleteOnSubmit: true
      });
      setTimeout(() => {
        this.setState({
          ratingNotCompleteOnSubmit: false
        });
      }, 3500);
      return;
    }

    if (!date1 || !date2) {
      this.setState({
        dateNotCompleteOnSubmit: true
      });
      setTimeout(() => {
        this.setState({
          dateNotCompleteOnSubmit: false
        });
      }, 3500);
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
      }, 3500);
      return;
    }

    return true;
  }

  handleSubmit() {
    if (this.validateDataForSubmition() === true) {
      this.setState({
        showSuccessMessage: true
      });
    }

    let fullReview = {
      currentRating: this.state.currentRating,
      date1: this.state.date1,
      date2: this.state.date2,
      textAreaContent: this.state.textAreaContent,
      type: "e",
      postName: this.props.infos.nameOfCity
    };

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

  handleRate(e, { rating, maxRating }) {
    this.setState({
      currentRating: rating
    });
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
            <h2>Current evaluation is:</h2>
            {this.props.reviews.length !== 0 ? (
              <div>
                <Header as="h2">
                  {typeof this.state.retrievedRate === "string"
                    ? this.state.retrievedRate
                    : this.calculatedAverage()}
                  <div>
                    <Header.Content>Stars</Header.Content>
                    <Header.Subheader>
                      Total of {this.props.reviews.length} reviews
                    </Header.Subheader>
                  </div>
                </Header>
              </div>
            ) : (
              <Header>There are no reviews yet</Header>
            )}
          </div>
          {!this.state.showSuccessMessage ? (
            <Modal.Description>
              <div>
                <Header>How would you rate this Post</Header>
                <Rating
                  clearable
                  size="huge"
                  icon="star"
                  defaultRating={0}
                  maxRating={5}
                  onRate={this.handleRate}
                />

                {this.state.ratingNotCompleteOnSubmit ? (
                  <div>{this.revealWarningForRating()}</div>
                ) : null}
              </div>

              <Header>What period of time did you work here?</Header>
              <div>
                <div>
                  <Calendar retrieveDates={this.retrieveDates} />
                </div>
              </div>
              {this.state.dateNotCompleteOnSubmit
                ? this.revealWarningForDate()
                : null}
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
            </Modal.Description>
          ) : (
            this.revealSuccessSubmissionMessage()
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit} color="green">
            Submit <Icon name="chevron right" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ReviewModal;
