import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {withAuthenticator} from "@aws-amplify/ui-react"

class Settings extends React.Component {
  render() {
    return <div>Settings</div>;
  }
}

export default withAuthenticator(withRouter(Settings));
