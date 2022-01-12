import EmployeePage from './EmployeePage'
import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listUsers } from '../../graphql/queries'
import { editUsers } from '../../graphql/mutations'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  title:{
    marginTop: '10px'
  }
}));

export default function ManageProfile(){
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState({
    messageBody: "",
    title: "success",
    show: false
  })
  const [user,setUser] = useState({
    address:''
  })
  const [list,setList] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUser({
      address:''
    })
  };

  useEffect(() => {
    async function user() {
      let response = await Auth.currentAuthenticatedUser({
        bypassCache: false
      })
      fetchData(response.username)
    }
    user()
  }, []) 

  async function fetchData(id) {
    let res = await API.graphql(
      graphqlOperation(listUsers, { filter: { Email: {eq: id}}})
    )
    if (res.data.listUsers.items[0]){
      setList(res.data.listUsers.items[0])
    }
  }

  async function handleSubmit(ID){
    try{
      if(user.address && user.address.length > 5){
        let params ={
          id: ID,
          address: user.address,
          identity: "",
          department: ""
        }
        let res = await API.graphql(graphqlOperation(editUsers,params))
        if (res.data.editUsers.statusCode === 200){
          setAlert({show:true, title:"success", messageBody:"Edited Successfully!"})
        }
        else{
          setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title: "error", messageBody:"The length of address is not enough!"})
      }
      setUser({
        address:''
      })
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function clearMessage(){
    window.location.reload(false)
    setAlert({show:false})
  }

  return(
    <div>
    <EmployeePage></EmployeePage>
      <Typography component="h1" variant="h4" className={classes.title}>
        Profile Management
      </Typography>
      {alert.show ?<Alert severity={alert.title === "success" ? "success" : "error"}>
            <AlertTitle><strong>{alert.title}</strong></AlertTitle>
            <strong>{alert.messageBody}</strong>
            </Alert> : null}
      <div className = {classes.paper, classes.root}>
     <br></br>
     <br></br>
      <Grid container spacing={2}>
      <Paper elevation={3} />
      <Typography component="h1" variant="h6">
        Username:{list.Email}
        <br></br>
        <br></br>
        Full Name: {list.Name}
        <br></br>
        <br></br>
        Address: {list.Address}
        <br></br>
        <br></br>
        Identity: {list.Identity}
        <br></br>
        <br></br>
        Department: {list.Department}
        <br></br>
        <br></br>
        Salary: {list.Salary}
        <br></br>
        <br></br>
        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={handleClickOpen}>
      Change Address
      </Button>
      </Typography>
      <br></br>
      <br></br>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Changing Address</DialogTitle>
      <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Address"
        type="Address"
        value={user.address}
        onChange={(e) => setUser({...user,address:e.target.value})}
        fullWidth
      />
      <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={() => handleSubmit(list.EmployeeID)} color="primary">
        Submit
      </Button>
    </DialogActions>
    </DialogContent>
    </Dialog>
    </Grid>
    </div>
    </div>
  )
}
