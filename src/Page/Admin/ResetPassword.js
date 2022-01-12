import AdminPage from './AdminPage'
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'right',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function ResetPassword(){
    async function handleCreate() {
        // if (user.email && user.password) {
        //   try {
        //     let params = {
        //       username: user.email,
        //       password: user.password
        //     }
        //     const res = await API.graphql(graphqlOperation(signUp, params))
        //     if (res.data.signUp[0].statusCode === 200) {
        //       setTimeout(() => {
        //         props.history.push('/')
        //       }, 500)
        //     } else {
    
        //     }
        //   } catch (err) {
        //     console.log('Error: ', err)
        //   }
        // } else {
    
        // }
      }
    const classes = useStyles();
    return(
        <div>
        <AdminPage></AdminPage>
        Change Password
        <Grid Container className = "paper">
            <TextField label = "Old Password" id = "standard-size-small" size="small"></TextField><br></br>
            <TextField label = "New Password" id = "standard-size-small" size="small"></TextField><br></br>
            <TextField label = "Confirm Password" id = "standard-size-small" size="small"></TextField><br></br>
            <Button
            onClick = {handleCreate}
            variant="contained"
            color="primary"
            className={classes.submit}>
            Confirm
          </Button>
        </Grid>
        </div>
    )
}
