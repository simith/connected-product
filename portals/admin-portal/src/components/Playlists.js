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
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import StarIcon from '@material-ui/icons/Star';
import { Route, Link, Switch } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';


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

class Playlists extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.state = {playlists: []};
   

  }

  
  
  async componentDidMount(){
  
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
  
   
   const apiUrl = 'https://ukgz1msik7.execute-api.us-west-2.amazonaws.com/prod/playlists?account_id='+this.state.accountId;
   fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      this.setState({playlists : data});
      console.log('This is your data', data)});

    
  }

  render() {

    
    var itemsHtml= this.state.playlists.map((item, i) => {
      return (
        <ListItem button key={item['id']} component={Link} to={"/playlists/" + item['id']}  style={{"backgroundColor": "#ebebeb", "marginTop":"5px"}}>
          <ListItemAvatar>
          <Avatar src='https://cdn.iconscout.com/icon/free/png-256/video-interface-file-data-playlist-play-music-1-13271.png' />
        </ListItemAvatar>
     
      <ListItemText >{item['name']}</ListItemText>
    </ListItem>
   

      );
    });

    return (<div style={{"marginLeft":"10px"}}>
      <div class="row" >
      <h2>Your Playlists ({this.state.playlists.length})</h2>
      <Divider></Divider>
      </div>
    <div class="row"  >
    <List component="nav" style={{"width" : "900px"}} aria-label="contacts">
      
    {itemsHtml}
  </List></div></div>);
  }
}
export default withAuthenticator(withRouter(Playlists));
