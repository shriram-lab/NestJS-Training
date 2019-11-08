import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

export default function HocSpinnerComponent(WrapperComponent) {
  return class SpinnerComponent extends Component {
    render() {
      console.log(this.props)
      return (
        <div>
          <WrapperComponent {...this.props}>
            {this.props.notfound!=="" ?(<div>No Records</div>):(<Spinner animation="border" variant="danger" />)}
          </WrapperComponent>
        </div>
      );
    }
  };
}
