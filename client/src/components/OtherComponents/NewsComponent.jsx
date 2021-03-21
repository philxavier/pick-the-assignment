import { Icon } from "semantic-ui-react";
import React from "react";

export default function NewsComponent() {
  return (
    <div className="newsComponent">
      <Icon.Group size="huge">
        <Icon size="big" name="circle outline" />
        <Icon name="newspaper outline" />
      </Icon.Group>
    </div>
  );
}
