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
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';
import { Route, Link, Switch } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import CircularProgress from "@material-ui/core/CircularProgress";

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
    this.state = {playlistLoaded: false}
    this.state = {id: props.match.params};
    this.state = {currentVideoSrc: ''}
    this.state = { selected: null };
    
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

    console.log(apiUrl);
  }

  setVideoSrc(item,i){
    console.log(item);
    this.setState({currentVideoSrc: item['url']})
    this.updateSelected(i)
    
  }

  updateSelected(selectedIndex) {
    this.setState({ selected: selectedIndex });
  
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
                  onClick={e => this.setVideoSrc(item,i)} selected={this.state.selected === 0}
                  >
          <ListItemAvatar>
          <Avatar src={item['thumbnail-url']}/>
        </ListItemAvatar>
      <ListItemText >{item['title']}</ListItemText>
      </MenuItem>

      );
      
    }); 

    return (
  <div style={{"marginLeft":"10px"}}>
  <div class="row" >
  <h2>{this.state.playlist.info.name}</h2>
    <Divider></Divider>
  </div>
  <Grid container spacing={3}>
  <Grid item xs={6}>
  <Paper style={{maxHeight: 400, overflow: 'auto'}}>
  <List component="nav" style={{"width" : "98%"}} aria-label="contacts">
  {itemsHtml}
</List>
</Paper>
</Grid>
<Grid item xs={6} style={{"marginTop":"10px"}}>
<video key={this.state.currentVideoSrc} width="500" height="400" controls="controls" poster="image" preload="true"  autoplay="true" >
<source src={this.state.currentVideoSrc} type="application/x-mpegURL"/>
</video>
</Grid>
</Grid>
</div>
);


  }

}
export default withAuthenticator(withRouter(Playlist));
