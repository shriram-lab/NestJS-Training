import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export default class CardComponent extends Component {
  render() {
    const { header, children, footer, styleCard } = this.props;
    return (
      <div>
        <Card
          style={{
            marginBottom: "24px",
            borderBottom: "none"
          }}
        >
          <Card.Header>{header}</Card.Header>
          <Card.Body style={styleCard}>{children}</Card.Body>
        </Card>
      </div>
    );
  }
}
