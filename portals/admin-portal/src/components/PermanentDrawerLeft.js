import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Jobs from "./Jobs";
import Playlists from "./Playlists";
import Playlist from './Playlist';
import Settings from "./Settings";
import Dashboard from "./Dashboard";
import { Route, Link, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import LoginScreen from "./LoginScreen";
import { Auth } from "aws-amplify";
import { withAuthenticator } from '@aws-amplify/ui-react'
import VideoList from "./VideoList";
import MyDropZone from "./MyDropZone";
import Articles from "./Articles";
const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#2bba2b'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 0.95

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  toolbar: theme.mixins.toolbar
});

class PermanentDrawerLeft extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      username: null,
      authState: "",
      selected: 0,
      id: ''
    };
    this.className = "PermanentDrawerLeft";
  }

  updateSelected(selectedItemIndex) {
    this.setState({ selected: selectedItemIndex });
  }

  render() {
    window.LOG_LEVEL = "DEBUG";
    console.log("PermanentDrawerLeft:" + "render method called");
    console.log("State is:" + this.state);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} color={"inherit"} elevation={0}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
            <font color="white"><b>Connected Product Admin</b></font>
            </Typography>
            <Button color="inherit" onClick={this.handleLogout}>
              <font color="white">Logout {this.state.username}</font>
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} /> <Divider />
          <List>
            <MenuItem
              onClick={() => this.updateSelected(0)}
              button
              key="Dashboard"
              component={Link}
              to="/dashboard"
              selected={this.state.selected === 0}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </MenuItem>
            <MenuItem
              onClick={() => this.updateSelected(2)}
              button
              key="Playlists"
              component={Link}
              to="/playlists"
              selected={this.state.selected === 2}
            >
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Provision" />
            </MenuItem>
            <MenuItem
              onClick={() => this.updateSelected(1)}
              button
              key="Firmware"
              component={Link}
              to={`/upload/${this.state.id}`}
              selected={this.state.selected === 1}
            >
              <ListItemIcon>
                <CloudUploadIcon />
              </ListItemIcon>
              <ListItemText primary="Deploy" />
            </MenuItem>
           
            <MenuItem
              onClick={() => this.updateSelected(3)}
              button
              key="Jobs"
              component={Link}
              to="/jobs"
              selected={this.state.selected === 3}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </MenuItem>
            
            <MenuItem
              onClick={() => this.updateSelected(5)}
              button
              key="Settings"
              component={Link}
              to="/settings"
              selected={this.state.selected === 5}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content} width={1}>
          
          <Switch>
            <Route exact component={Dashboard} path="/" />
            <Route exact component={VideoList} path="/videos"/>
            <Route exact component={Dashboard} path="/dashboard"/>
            <Route exact component={Playlists} path="/playlists"/>
            <Route exact component={Playlist} path="/playlists/:id"/>
            <Route exact component={Jobs} path="/jobs"/>
            <Route exact component={Articles} path="/articles"/>
            <Route exact component={Settings} path="/settings"/>
            <Route path='/upload/:id'  render= {() => <MyDropZone onSubmit={'signInWithEmail'} />}/>
            </Switch>
        </main>
      </div>
    );
  }

  async componentDidMount() {
    console.log(this.className + " componentDidMount called");
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user.attributes['email']);
      console.log("###USER is :"+ JSON.stringify(user));
      this.setState({ authState: "authenticated" });
      this.setState({ username: user.attributes['email']});
      this.setState({ id: user['username']});
    } catch (err) {
      console.log("Failed getting user authenticated" + err);
      this.setState({ authState: "unauthorized" });
    }
  }

  async handleLogout() {

    alert('handleLogout');
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

export default withAuthenticator((withStyles(styles)(PermanentDrawerLeft)));
