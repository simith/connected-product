import React, { Component } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react'
import Button from "@material-ui/core/Button";

import { Amplify, Auth } from "aws-amplify";
import { Redirect } from "react-router";
import OttNavBar from "./components/OttNavBar";

class AuthenticateMe extends Component {
  render() {
    Auth.signOut();
    return (
      <div>
        <OttNavBar />
      </div>
    );
  }

  logout() {
    Auth.signOut({ global: false });
    alert("Log out");
    console.log("Signing out user, route to logout screen now.");
  }
}
export default withAuthenticator(AuthenticateMe);
