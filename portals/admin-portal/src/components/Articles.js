import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {withAuthenticator} from "@aws-amplify/ui-react"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from "@material-ui/core";

class Articles extends React.Component {
  render() {
    return (
      <div style={{marginTop: '30px',marginLeft: '10px',height: '200px'}}>
        <h2>New Article </h2>
      <CKEditor
      editor={ ClassicEditor }
      
      data="<p>Hello from CKEditor 5!</p>"
      />
      <Button variant="contained"  color="primary" style={{marginTop: '10px',marginLeft: '3px'}}>
          Save as Draft
      </Button>
      <Button variant="contained"  color="secondary" style={{marginTop: '10px',marginLeft: '3px'}}>
          Publish Article
      </Button>      
      </div>


    );
  }
}

export default withAuthenticator(withRouter(Articles));
