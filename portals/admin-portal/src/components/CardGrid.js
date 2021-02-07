import React, { Component } from "react";
import Dashboard from './Dashboard';
import Blank from './Blank';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";

import {Route,Link, BrowserRouter as Router,Switch} from 'react-router-dom'

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",

    color: "red"
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  },
  card: {
    maxWidth: 300
  },
  media: {
    width: 300,
    height: 200,
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class CardGrid extends React.Component {
  constructor(props) {
    super(props);
    console.log("Props here: "+props);
    const thingData = [{"thingName":"simith","thingTypeName":"Yoga for life"},{"thingName":"simith","thingTypeName":"Yoga for life"},{"thingName":"simith","thingTypeName":"Yoga for life"}];
    const { videos } = this.props;
    console.log("Cardgrid:" + JSON.stringify(videos) );
    const { classes } = props;
    this.state = {
      things: videos
    };

    this.getGrids = this.getGrids.bind(this);
  }

  getGrids() {
    const { classes } = this.props;
    const listItems = this.state.things.map((item, i) => (
      <Grid item>
        <Link to={`/detail/${item.id}`}>
        <Card className={classes.card} item>
          <CardActionArea>
            <CardMedia className={classes.media}
              image={item.posterUrl}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="primary"
              >
                {item.title}
              </Typography>
              <Typography component="p">{item.title}</Typography>
              <Typography component="p">{item.date}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Link>
      </Grid>
    ));
    return (
      <div>
       
        <Grid container spacing={4} direction="row"  justify="space-evenly" style={{paddingTop:'30px'}}>
          {listItems}

        </Grid>
       
      </div>
    );
  }

  render() {
    return (
      <div> {!!this.state.things ? this.getGrids() : " No things found"} </div>
    );
  }
}

export default withStyles(styles)(CardGrid);
