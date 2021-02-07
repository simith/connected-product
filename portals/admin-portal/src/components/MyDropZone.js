import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {   withRouter } from "react-router-dom";
import {useState} from 'react'
import Storage from "@aws-amplify/storage";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { LinearProgress, CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import Grid from '@material-ui/core/Grid'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

function onDrop(e){



}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function postData(url, data = {}) {
  // Default options are marked with *
  console.log("Sending request: "+ url);
  console.log("Data is: "+ JSON.stringify(data));
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

 function MyDropzone(props) {

  const [videoSrc,setVideoSrc] = useState("");
  const [videoFile, setVodeoFile] = useState("");
  const [progress, setProgress] = useState(0); 
  const [account_id, setAccountId] = useState(props.match.params.id); 
  const [fileUploadInProgress, setFileUploadInProgress] = useState(false);
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  //alert(JSON.stringify(props)); 
  //alert('Id is : {id}');

  function _handleTitleFieldChange(e) {
    setTitle(e.target.value);
  }
  //checkbox
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  function _handleTitleDescriptionFieldChange(e) {
    setDesc(e.target.value);
  }

  async function onFileUploadClicked(){

    var filename = uuidv4() + '-'+videoFile.name;
   
   

    setFileUploadInProgress(true);
    var stored = await Storage.put(filename,videoFile, {
      
      contentType: videoFile.type,
      level: 'public',
      customPrefix: {
       public: account_id+"/raw/"
      },
      progressCallback(progress) {
          setProgress((progress.loaded * 100)/progress.total);
    },
  });

  var url = 'https://ukgz1msik7.execute-api.us-west-2.amazonaws.com/prod/videos?account_id='+account_id;
      var data = {};
      data['filename']=filename;
      data['playlist-item-id'] = uuidv4();
      data['account-id'] = account_id
      data['playlist-item-title'] = title;
      data['playlist-item-desc'] = desc;

      var transcode_req_resp = await postData(url,data);
      console.log(transcode_req_resp);
      setFileUploadInProgress(false);
      setVideoSrc("");
      setVodeoFile("");
      setState({checkedA: false});
      console.log('Stored is : '+ JSON.stringify(stored));
  }

  const onDrop = useCallback(async acceptedFiles =>  {
    // Do something with the files
    //alert(JSON.stringify(acceptedFiles));
   
    var fileURL = URL.createObjectURL(acceptedFiles[0]);
    var filename = uuidv4() + '-'+acceptedFiles[0].name;
    setVideoSrc(fileURL);
    setVodeoFile(acceptedFiles[0]);
    setProgress(0)    
  }, []);
  

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Grid container >
    <Grid item xs={6}  style={{marginLeft: '10px', marginTop: '20px'}}>
    <div {...getRootProps()} padding="10px">
      <div><h3>Upload Video</h3></div>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <div height='400' width="100%"  >Drop the files here ...</div> :
          <div>
          <video height="350" width="100%" controls="controls" poster="image" preload="true" src={videoSrc} autoplay="autoplay" />
          
        </div>
      }
    </div>
    </Grid>
    <Grid item xs={5} style={{backgroundColor: '#f7f7f7',marginLeft: '10px', marginTop: '20px'}}>
    <div><h3>Video details</h3></div>
    <form>
    <TextField
          id="standard-full-width"
          label="Title of Video"
          style={{ margin: 8 }}
          placeholder="Enter title"
          helperText=""
          fullWidth
          margin="normal"
          value = {title}
          onChange = {_handleTitleFieldChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
       
       <TextField placeholder="Enter description"
                  label="Description of Video"
                  multiline
                  fullWidth
                  style={{ margin: 8 }}
                  rows={2}
                  rowsMax={4}
                  margin="normal"
                  value = {desc}
                  onChange = {_handleTitleDescriptionFieldChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
        />
      <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Make video public"
      />
      </FormGroup>
        
        <Box textAlign='center'>
        <Button variant="contained"  color="primary" onClick={onFileUploadClicked}>
          Start Upload
        </Button>
        </Box>
        {fileUploadInProgress === true && 
         <div>
         <LinearProgress variant="determinate" value={progress} style={{marginTop: '20px'}}/>
        <div>{Math.round(progress)} %</div>
         </div>
         }
         
        
    </form>
    </Grid>
    </Grid>
  )
}

export default withAuthenticator(withRouter(MyDropzone))