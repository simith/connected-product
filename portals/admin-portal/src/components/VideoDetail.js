import React, { Component } from "react";
import VideoPlayer from 'react-video-js-player';
import videos from '../data/data.js'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
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

class VideoDetail extends React.Component {

    state = {
        video: {
            src: "https://d1frlahxi046cj.cloudfront.net/yogi/zoom1/zoom_1.m3u8"
        }
    }

    player = {};

  constructor(props) {
    super(props);
    console.log("Video details Props: "+ JSON.stringify(props));
    this.props = props;
    console.log("Id is: " + this.props.match.params.id);
    this.state.video.src = this.getSrc();
  }

  getSrc(){
 
    for(var i=0;i<videos.length;i++){
        console.log(videos[i]['videoUrl']);
        if(videos[i]['id'] === this.props.match.params.id){
            return videos[i]['videoUrl'];
        }

    }

  }


  render() {

  
    console.log("render of VideoDetail");
    return (
        <div style={{ paddingTop: 5,margin: 40 }}>
            <VideoPlayer 
                    controls={true}
                    src={this.state.video.src}
                    poster={this.state.video.poster}
                    width="640"
                    height="360"
                    autoplay="false"
                    onReady={this.onPlayerReady.bind(this)}
                   ></VideoPlayer>
        </div>
    )
  }

  onPlayerReady(player){
    console.log("Player is ready: ", player);
    this.player = player;
    //this.player.fluid(true);
    

}
}
  
export default withAuthenticator(withRouter(withStyles(styles)(VideoDetail)));
