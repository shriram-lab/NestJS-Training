import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default class TextComponent extends Component {
  render() {
    const {
      TextHeader,
      PlaceHolder,
      Textarea,
      onHandleText,
      Name,
      value
    } = this.props;
    return (
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="inputGroup-sizing-default"
              style={{ width: "100px" }}
            >
              {TextHeader}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder={PlaceHolder}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            as={Textarea}
            onChange={onHandleText}
            name={Name}
            value={value}
          />
        </InputGroup>
      </div>
    );
  }
}
