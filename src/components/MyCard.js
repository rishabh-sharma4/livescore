import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@material-ui/core";
import { Grade } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { getMatchDetail } from "../api/Api";
const MyCard=({match})=>{

  const [detail,setDetail]=useState({});
  const [open,setOpen]=useState(false);

  const handleClick=(id)=> {
    getMatchDetail(id)
      .then(data=>{
        console.log("Match data",data);
        setDetail(data);
        handleOpen();
    })
    .catch(error=>console.log(error));
  };

  const getMatchCard=()=>{
        return(
          <Card style={{marginTop: 20}}>
              <CardContent>
                  <Grid container justify="center" alignItems="center" spacing= {4}>
                      <Grid item>
        <Typography variant="h5">{match["team-1"]}</Typography>
                      </Grid>
                      <Grid item>
                         <img 
                           style={{width: 85}} 
                           src={require("../img/versus.png")} 
                           alt=""
                         />

                      </Grid>
                      <Grid item>
                          <Typography variant="h5">{match["team-2"]}</Typography>
                      </Grid>
                  </Grid>
                  
              <CardActions>
                <Grid container justify="center">
                  <Button onClick={()=>{
                    handleClick(match.unique_id);
                  }} 
                  item 
                  variant="outlined" color="primary">
                      Show Details
                  </Button>
                  <Button 
                  style={{marginLeft: 5}} 
                  item
                  variant="contained" 
                  color="primary"
                  >
                     Start Time {new Date(match.dateTimeGMT).toLocaleString()}
                  </Button>
                </Grid>
              </CardActions>
              </CardContent>
          </Card>
        );
  };

  const handleClose=()=>{
    setOpen(false);
  };

  const handleOpen=()=>{
    setOpen(true);
  };
  const getDialog=()=> (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Match Detail..."}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>{detail.stat}</Typography>
          <Typography>
            Match 
            <span style={{fontStyle:"italic", fontWeight:"bold"}} > 
              {detail.matchStarted? "Started": "Still not started"}
            </span>
          </Typography>

          <Typography>
            Score
            <span style={{fontStyle:"italic", fontWeight:"bold"}} > 
              {detail.score}
            </span>
          </Typography>

          <DialogActions>
             <Button onClick={handleClose} color="primary" autofocus>
               Close
             </Button> 
          </DialogActions>

        </DialogContentText>
      </DialogContent>
    </Dialog>
  
  );
    return <Fragment>
      {getMatchCard()}
      {getDialog()}
    </Fragment>;
      
    
};
export default MyCard;