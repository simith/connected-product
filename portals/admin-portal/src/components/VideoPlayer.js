import React from 'react';
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {

  constructor(props){
    super(props);
    this.state = {src: this.props.src};
    this.state = {poster: this.props.poster};
    this.state = {playerReady: false};
    console.log('*******  Video Src: '+ this.props.src);
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady yaa maarey', this);
      this.setState({playerReady: true});
      
    });

    if (this.player) {
      this.player.src({
        type: 'application/x-mpegURL',
        src: this.props.src
      });
      this.player.poster()
    } 
    this.player.on('timeupdate', function () {
      console.log(this.currentTime());
    })


  }

  componentDidUpdate(prevProps){
   

    if(this.state.url != prevProps.src){
     this.setState({
      url: prevProps.src});
    
    if (this.player) {
      this.player.src({
        type: 'application/x-mpegURL',
        src: prevProps.src
      });
    } 
  }
}

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {

    if(this.state.playerReady){

    this.player.src({
      type: 'application/x-mpegURL',
      src: this.state.src
    });
  }
    return (
      <div>	
        <div data-vjs-player>
          <video controls preload="auto" ref={ node => this.videoNode = node } className="video-js vjs-16-9"></video>
        </div>
      </div>
    )
  }
}