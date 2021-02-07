import React, { Component } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { withRouter, Redirect } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import App from "../App";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import CardGrid from "./CardGrid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Grid from '@material-ui/core/Grid';

const options1 = {
  chart: {
      type: 'bar'
  },
  title: {
      text: 'Devices by Region'
  },
  subtitle: {
      text: 'Device Analytics'
  },
  xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
          text: null
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Views (millions)',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
      valueSuffix: ' millions'
  },
  plotOptions: {
      bar: {
          dataLabels: {
              enabled: true
          }
      }
  },
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
  },
  credits: {
      enabled: false
  },
  series: [{
      name: 'Month Jan',
      data: [107, 31, 635, 203, 2]
  }, {
      name: 'Month Feb',
      data: [133, 156, 947, 408, 6]
  }, {
      name: 'Month Mar',
      data: [814, 841, 3714, 727, 31]
  }, {
      name: 'Month Apr',
      data: [1216, 1001, 4436, 738, 40]
  }]
};

const options2 = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Devices by Product line'
  },credits: {
    enabled: false
},
  series: [
    {
      data: [{'name': 'Smart Lamp', y: 1},{'name': 'Smart oven', y: 15},{'name': 'Air purifier', y: 3},{'name':'Air Conditioner', y: 7}]
    }
  ]
};

const options3 = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Messages by Device model'
  },credits: {
    enabled: false
},
  series: [
    {
      data: [{'name': 'Smart Lamp', y: 10},{'name': 'Smart oven', y: 25},{'name': 'Air purifier', y: 15},{'name':'Air Conditioner', y: 70}]

    }
  ]
};

const styles = {
  loader: {
    left: 500,
    marginLeft: -4
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      things: null
    };

    const { classes } = props;
  }

  render() {
    const that = this;
    console.log("Dashboard:" + "render method called");
    return (
        <div style={{flexGrow: '1'}}>
        <Grid container spacing={2} padding={2} >
        <Grid item xs={4}>
       <HighchartsReact highcharts={Highcharts} options={options1} containerProps={{ style: { height: "300px" } }}/>
       </Grid>
       <Grid item  xs={4}>
       <HighchartsReact highcharts={Highcharts} options={options2} containerProps={{ style: { height: "300px" } }}/>
       </Grid>
       <Grid item  xs={4}>
       <HighchartsReact highcharts={Highcharts} options={options3} containerProps={{ style: { height: "300px" } }}/>
       </Grid>
       </Grid>
       </div>
      
    );
  }

  componentDidMount() {
    

   
  }

  componentWillUnmount() {
    //console.log("componentWillUnmount");
  }
}

export default withStyles(styles)(Dashboard);
