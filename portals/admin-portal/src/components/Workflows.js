import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import HorizontalLabelPositionBelowStepper from "./HorizontalLabelPositionBelowStepper.js";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Workflows extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = { authState: null };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <HorizontalLabelPositionBelowStepper />
      </div>
    );
  }

  async componentDidMount() {
    console.log("componentDidMount called");
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ authState: "authenticated" });
    } catch (err) {
      this.setState({ authState: "unauthorized" });
    }
  }
}

export default withStyles(styles)(Workflows);
