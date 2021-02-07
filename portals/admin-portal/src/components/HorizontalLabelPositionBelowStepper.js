import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Grid,
  Paper
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flex: 1
  },
  paper: {
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return [
    "Select a file for Transcoding",
    "Select Workflow",
    "Submit Transcoding Job"
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown stepIndex";
  }
}

class HorizontalLabelPositionBelowStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      files: [],
      fileSource: "local",
      localFileSelected: false,
      localFileSrc: "",
      localFilesObject: null
    };
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleChange = event => {
    this.setState({ fileSource: event.target.value });
  };

  handleInputChange(files) {
    console.log(files);
    this.setState({
      localFileSrc: URL.createObjectURL(files[0]),
      localFileSelected: true,
      localFilesObject: files
    });
  }

  bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "n/a";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + " " + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root} style={{ flex: 4 }}>
        <div>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};

              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div style={{ flex: 2, backgroundColor: "white", minHeight: 400 }}>
          <Typography variant="h6" gutterBottom>
            Select File source for Transcoding
          </Typography>
          <Divider />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="position"
              name="position"
              onChange={this.handleChange}
              row
            >
              <FormControlLabel
                value="local"
                control={
                  <Radio
                    color="secondary"
                    checked={this.state.fileSource === "local"}
                  />
                }
                label="Local Disk"
                labelPlacement="start"
              />
              <FormControlLabel
                value="s3"
                control={
                  <Radio
                    color="secondary"
                    checked={this.state.fileSource === "s3"}
                  />
                }
                label="Amazon S3"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
          <Typography variant="h6" gutterBottom>
            Select your file(s)
          </Typography>
          <Divider />
          {this.state.fileSource === "local" && (
            <div>
              <input
                accept="video/*"
                type="file"
                onChange={e => this.handleInputChange(e.target.files)}
                id="icon-button-file"
              />
              {this.state.localFileSelected === true && (
                <div className={classes.root}>
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <video
                          width="400"
                          controls
                          key={this.state.localFileSrc}
                        >
                          <source
                            id="videoPlayer"
                            src={this.state.localFileSrc}
                          />
                        </video>
                      </Paper>
                    </Grid>{" "}
                    {/* Grid for Video player */}
                    <Grid item xs={6}>
                      <Typography variant="h6" gutterBottom>
                        <Paper
                          className={classes.paper}
                          style={{ textAlign: "left" }}
                        >
                          Video File details:
                          <table>
                            <tr>
                              <td>Name</td>
                              <td>{this.state.localFilesObject[0].name}</td>
                            </tr>
                            <tr>
                              <td>File Type</td>
                              <td>{this.state.localFilesObject[0].type}</td>
                            </tr>
                            <tr>
                              <td>Size</td>
                              <td>
                                {this.bytesToSize(
                                  this.state.localFilesObject[0].size
                                )}
                              </td>
                            </tr>
                          </table>
                        </Paper>
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          )}
          {this.state.fileSource === "s3" && <div>Will s3 you!</div>}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
