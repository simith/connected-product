import Amplify, { Auth, Storage } from 'aws-amplify';
//import awsExports from "./aws-exports";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoApp from './VideoApp';
import * as serviceWorker from './serviceWorker';
import {  BrowserRouter } from "react-router-dom";


//Amplify.configure(awsExports);
Amplify.configure({
  Auth: {
      identityPoolId: 'us-west-2:e8e7037a-3921-41bb-a3d2-2edeeaff0081', //REQUIRED - Amazon Cognito Identity Pool ID
      region: 'us-west-2', // REQUIRED - Amazon Cognito Region
      userPoolId: 'us-west-2_POwkgoCMW', //OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: '3var7fcdp1t955vhdg97ll9l2a', //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
      AWSS3: {
          bucket: 'accounts-service-customerresourcesraw0e9b8cf0-1ve3f2uit8qob', //REQUIRED -  Amazon S3 bucket name
          region: 'us-west-2', 
          identityPoolId: 'us-west-2:e8e7037a-3921-41bb-a3d2-2edeeaff0081'//OPTIONAL -  Amazon service region
      }
  }
});


ReactDOM.render(
  <BrowserRouter>
  <VideoApp onStateChanged='stateChanged'/>
  </BrowserRouter>
,
  document.getElementById("root")
);

function stateChanged(){alert("here");}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
