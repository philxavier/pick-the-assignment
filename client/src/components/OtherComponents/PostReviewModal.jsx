import React, { useState } from "react";
import { Button, Header, Icon, Image, Modal } from "semantic-ui-react";
import Calendar from "./Calendar.jsx";

const ReviewModal = props => (
  <Modal open={props.open} onClose={() => props.close()} closeIcon>
    <Modal.Header>Profile Picture</Modal.Header>
    <Modal.Content image scrolling>
      <Image
        size="medium"
        src="https://react.semantic-ui.com/images/wireframe/image.png"
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

export default ReviewModal;
