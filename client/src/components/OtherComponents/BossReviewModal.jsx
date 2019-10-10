import React, { useState } from "react";
import { Button, Header, Icon, Image, Modal, Rating } from "semantic-ui-react";

const BossReviewModal = props => (
  <Modal open={props.open} onClose={() => props.close()} closeIcon>
    <Modal.Header>Review for {props.infos.boss[0]}</Modal.Header>
    <Modal.Content image scrolling>
      <Image
        size="medium"
        src="https://mvp-sprint.s3-us-west-1.amazonaws.com/michaelGif.gif
        "
        wrapped
      />

      <Modal.Description>
        <Header>How would you rate this Boss?</Header>
        <div style={{ display: "flex" }}>
          <Button color="green" active>
            A
          </Button>
          <Button active>B</Button>
          <Button active>C</Button>
          <Button active>D</Button>
          <Button active>E</Button>
          <Button active>F</Button>
        </div>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name="chevron right" />
      </Button>
    </Modal.Actions>
  </Modal>
);

export default BossReviewModal;
