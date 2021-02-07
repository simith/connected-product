import React, { Component } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { withRouter } from "react-router-dom";
import OttNavBar from "./OttNavBar";

class LoginScreen extends React.Component {
  render() {
    console.log("Rendering now Loginscreen");
    return <OttNavBar />;
  }
}

export default LoginScreen;
