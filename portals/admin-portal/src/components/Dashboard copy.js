import React, { Component } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { withRouter, Redirect } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import App from "../App";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import CardGrid from "./CardGrid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'My chart'
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6]
    }
  ]
};
const styles = {
  loader: {
    left: 500,
    marginLeft: -4
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      things: null
    };

    const { classes } = props;
  }

  render() {
    const that = this;
    console.log("Dashboard:" + "render method called");
    return (
      <div>
        {!!this.state.things ? (
          <CardGrid data={this.state.things} />
        ) : (
          <div>
            <CircularProgress />
            <div> Loading Dashboad...</div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    

   
  }

  componentWillUnmount() {
    //console.log("componentWillUnmount");
  }
}

export default withStyles(styles)(Dashboard);
