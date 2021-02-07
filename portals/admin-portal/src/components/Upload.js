import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Upload extends React.Component {
  render() {
    return <div>
      <div>
    <video width="700" height="450" controls="controls" poster="image" preload="true">
      <source src="where the video is" type="video/mov"/>
      <source src="where the video is" type="video/mp4" />
      <source src="where the video is" type="video/oog" />
      Your browser does not support the video tag.
    </video>
    <input type="file" id="file"  />
 </div></div>;
  }
}

export default withRouter(Upload);
