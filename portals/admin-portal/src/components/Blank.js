import React, { Component } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { withRouter } from "react-router-dom";

class Blank extends React.Component {
  render() {
    return <div> Dashboard here </div>;
  }
}

export default withRouter(Blank);
