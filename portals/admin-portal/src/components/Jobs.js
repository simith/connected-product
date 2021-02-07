import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {withAuthenticator} from "@aws-amplify/ui-react"

class Jobs extends React.Component {
  render() {
    return <div>Jobs</div>;
  }
}

export default withAuthenticator(withRouter(Jobs));
