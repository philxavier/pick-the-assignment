import React from "react";
import {
  Button,
  Header,
  Icon,
  Image,
  Modal,
  TextArea,
  Form,
  Rating,
  Statistic
} from "semantic-ui-react";
import Calendar from "./Calendar.jsx";

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRating: null,
      submited: false,
      textAreaContent: "",
      dates: []
    };
  }

  handleChange(e) {
    let content = e.target.value;

    this.setState({
      textAreaContent: content
    });
  }

  handleSubmit() {
    let textAreaContent = this.state.textAreaContent;

    this.setState({
      submited: true
    });
  }

  retrieveDates(date) {
    var newDates = this.state.newDates;
    newDates.push(date);
    this.setState({});
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
        onClose={() => this.props.close()}
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
            <Statistic color="yellow">
              <Statistic.Value>4.6</Statistic.Value>
              <Statistic.Label>stars</Statistic.Label>
            </Statistic>
          </div>

          <Modal.Description>
            <Header>How would you rate this Post</Header>
            <Rating
              size="huge"
              icon="star"
              defaultRating={0}
              maxRating={5}
              onRate={this.handleRate}
            />
            <Header>What period of time did you work here?</Header>
            <div>
              <div>
                <Calendar />
              </div>
            </div>
            <Header>Tell us a little about you experience here</Header>
            <Form>
              <TextArea
                onChange={e => {
                  this.handleChange(e);
                }}
                placeholder="Tell us more"
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClose={this.handleSubmit} color="green">
            Submit <Icon name="chevron right" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ReviewModal;
