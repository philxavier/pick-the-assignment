import React, { useState } from "react";
import { Button, Header, Icon, Image, Modal } from "semantic-ui-react";

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
        <Header>Modal Header</Header>
        <p>
          This is an example of expanded content that will cause the modal's
          dimmer to scroll
        </p>
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
