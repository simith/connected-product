import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridList from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import {withAuthenticator} from "@aws-amplify/ui-react"
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';
import { Route, Link, Switch } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import CircularProgress from "@material-ui/core/CircularProgress";
import VideoPlayer from './VideoPlayer'
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};


class Playlist extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.state = {playlist: {}};
    this.state = {url: "okokok"};
    this.state = {playlistLoaded: false}
    this.state = {id: props.match.params};
    this.state = {test: 'jkkjklkjlkjl'};
    this.state = { selected: 0 };
   
  }

  async componentDidMount(){
    const {id} = this.props.match.params
    var userInfo = {};
     var accountId;
    try{
      userInfo = await Auth.currentAuthenticatedUser()
      accountId = userInfo.attributes['sub'];
      console.log('User name: '+ accountId);
      this.setState({'accountId': accountId});
      
   }
   catch (err) {
    console.log("Failed getting user authenticated" + err);
  }
    
    const apiUrl = 'https://ukgz1msik7.execute-api.us-west-2.amazonaws.com/prod/playlists/'+id+'?account_id='+accountId;
    console.log(apiUrl); 
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      this.setState({playlist : data});
      console.log('This is your data', data);
      this.setState({playlistLoaded: true})
     
    });
    this.setState({'url': 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'});
    console.log(apiUrl);
    
  }

  setVideoSrc(item,i){
    this.setState({url: item['url']})
    this.setState({ selected: i });
  
  }

  updateSelected(selectedIndex) {
    this.setState({ selected: selectedIndex });
  }

  handleClick(){
    alert('<iframe width="560" height="315" src="https://www.codecmantra.com/player/index.html" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  }

  render() { 

    const { selected } = this.state;
    console.log('Selected is:' + selected);
    if(!this.state.playlistLoaded){
      return <div>
        
        <CircularProgress></CircularProgress>
        </div>
    }
    
    var playlistId = this.state.playlist.info['id']
    var itemsHtml= this.state.playlist.items.map((item, i) => {
      return (
        <MenuItem button key={item['id']}    
                  style={{"backgroundColor": "#ebebeb", "marginTop":"2px"}}
                  onClick={e => this.setVideoSrc(item,i)} selected={this.state.selected === i}
                  >
          <ListItemAvatar>
          <Avatar src={item['thumbnail-url']}/>
        </ListItemAvatar>
      <ListItemText >{item['title']} </ListItemText>
      </MenuItem>

      );
      
    }); 

    return (
  <div style={{"marginLeft":"4px"}}>
  <div class="row" >
  <h2>{this.state.playlist.info.name} ({this.state.playlist.items.length}) </h2>
    <Divider></Divider>
  </div>
  <Grid container spacing={3}>
  <Grid item xs={6}>
  <Paper style={{maxHeight: 400, overflow: 'auto'}}>
  <List component="nav" style={{"width" : "100%"}} aria-label="contacts">
  {itemsHtml}
</List>
</Paper>
</Grid>
<Grid item xs={6} style={{"marginTop":"10px"}}>  
<VideoPlayer src={this.state.url} key={this.state.url}></VideoPlayer>
<div style={{"marginTop":"10px"}}><Chip  label="Copy player embed link" onClick={this.handleClick} /></div>
</Grid>
</Grid>
</div>
);


  }

}
export default withAuthenticator(withRouter(Playlist));
