import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import CardGrid from './CardGrid';
import { Auth } from "aws-amplify";
import videos from '../data/data.js'
import { withAuthenticator } from '@aws-amplify/ui-react'

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      username: null,
      authState: "",
      selected: 0
    };
    this.className = "VideoList";
  }

  updateSelected(selectedItemIndex) {
    this.setState({ selected: selectedItemIndex });
  }

  render() {

    console.log("render:" + JSON.stringify(videos));
    const videoJsOptions = {
      autoplay: true,
      controls: false,
      fluid: true,
      height: 500,
      textTrackSettings: false,
      sources: [{
        src: 'https://d1frlahxi046cj.cloudfront.net/yogi/zoom0/zoom_0.m3u8',
        type: 'application/x-mpegURL'
      }]
    };
    
   
    window.LOG_LEVEL = "DEBUG";
    console.log(this.className + "render method called");
    console.log("State is:" + this.state);
    const { classes } = this.props;
    return (
      <div>
      
      
       
        <CardGrid videos={videos} ></CardGrid>
        
        </div>
    );
  }

  async componentDidMount() {
    console.log(this.className + " componentDidMount called");
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user.username);
      this.setState({ authState: "authenticated" });
      this.setState({ username: user.username });
    } catch (err) {
      console.log("Failed getting user authenticated" + err);
      this.setState({ authState: "unauthorized" });
    }
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

  signOut = onStateChange => async () => {
    await Auth.signOut();
    onStateChange("signedOut");
  };
}

export default withAuthenticator(withStyles(styles)(VideoList));
