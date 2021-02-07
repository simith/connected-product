import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Auth } from "aws-amplify";
import { withStyles } from "@material-ui/core/styles";
import { Button, Toolbar } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { withAuthenticator } from '@aws-amplify/ui-react'
import VideoDetail from './components/VideoDetail';

import {
  Route, Switch, withRouter
} from "react-router-dom";
import VideoList from "./components/VideoList";


import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import PermanentDrawerLeft from "./components/PermanentDrawerLeft";
import Channels from "./components/Channels";
import Settings from "./components/Settings";



const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#2bba2b'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  toolbar: theme.mixins.toolbar
});


class VideoApp extends React.Component {


  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props,);
    this.handleAuthStateChange = this.handleAuthStateChange.bind(this);
    this.state = { signedInState: "signIn" };
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    console.log("in render");
     const { classes } = this.props;
    return (
      <div>
      <CssBaseline />
      <AppBar position="sticky" className={classes.appBar} color={"inherit"}>
        <Toolbar>
        <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
              <font color="white"><b>Connected Product Admin</b></font>
            </Typography>
          <Button color="inherit" onClick={this.handleLogout}>
            Logout {this.state.username}
          </Button>
        </Toolbar>
      </AppBar>
     
      <Switch>
          <Route path="/"  component={PermanentDrawerLeft} ></Route>
          
          <Route path={`/detail/:id`}  component={VideoDetail} ></Route>
          <Route path="/settings"  component={Settings} ></Route>
          
         
       </Switch>
   
       </div>
     
    );
  }

  handleAuthStateChange(authState, authData) {
    console.log(this);
    console.log(authState);

    if (authState === "signedIn") {
      this.setState({ signedInState: { authState } });
      //this.props.history.push("/test");
    } else if (authState === "signIn") {
      this.setState({ signedInState: { authState } });
      //this.props.history.push("/logout");
    }
    //
  }

  async handleLogout() {
    await Auth.signOut().then(() => {
      if (this.props.onStateChange) {
        console.log("props" + JSON.stringify(this.props));
        console.log("Calling onStateChange with signIn");
        this.props.onStateChange("signIn", null);
      }
    });
    console.log(" Signing out now..");
  }

  getUserInfo() {}

  test() {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => console.log(user))
      .catch(err => console.log(err));
  }

  logout() {
    Auth.signOut({ global: false });
    alert("Log out");
    console.log("Signing out user, route to logout screen now.");
  }
}
export default withAuthenticator(withStyles(styles)(withRouter(VideoApp)));
