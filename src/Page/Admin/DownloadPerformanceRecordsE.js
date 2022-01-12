import AdminPage from './AdminPage'
import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { listUsers } from '../../customQueries'
import { API, graphqlOperation } from 'aws-amplify'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { downloadPerformanceRecords } from '../../graphql/mutations'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e5e5e5",
    color: theme.palette.common.black,
    padding: "5px",
    fontSize: 17
   },
   body: {
    fontSize: 15,
    padding: "5px",
    overflowWrap: "break-word"
   }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      backgroundColor: theme.palette.action.hover,
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 10,
  },
  bottom: {
    color: 'red',
    width:'1000',
  },
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
  title:{
    marginTop: '100px'
  }
}));

export default function DownloadPerformanceRecordsE(){
  const classes = useStyles();
  const [lists, setLists] = useState([])
  const [id, setId] = useState([])
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState({
    messageBody: '',
    title: 'success',
    show: false
  })
  useEffect(()=>{
    fetchUser();
  }, []) 

  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId([])
  };

  async function fetchUser(){
    let res = await API.graphql(
      graphqlOperation(listUsers, { filter: { Identity: { eq: 'Employee' } }})
    )
    if (res.data.listUsers.items){
      setLists(res.data.listUsers.items)
    }
  }

  async function handleClick(){
    try{
      setOpen(false)
      let params={
        id: id
      }
      let res = await API.graphql(graphqlOperation(downloadPerformanceRecords, params))
      if(res.data.downloadPerformanceRecords.statusCode === 200){
        setAlert({show:true, title:"success", messageBody:"The performance records csv file is done, please check in the s3 bucket!"})
        setTimeout(() => {  clearMessage() }, 1000);
      }
      else if (res.data.downloadPerformanceRecords.statusCode === 201){
        setAlert({show:true, title:"error", messageBody:"This person does not have any performance records!"})
        setTimeout(() => {  setAlert({show:false}) }, 1000);
      }
      else{
        setAlert({show:true, title:"error", messageBody:"Invalid Input!"})
        setTimeout(() => {  setAlert({show:false}) }, 1000);
      }
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
      <AdminPage></AdminPage>
      <Typography component="h1" variant="h4" className={classes.title}>
      Download Performance Records (Employees)
      </Typography>
      {alert.show ?<Alert severity={alert.title === 'success' ? "success" : "error"}>
          <AlertTitle><strong>{alert.title}</strong></AlertTitle>
          <strong>{alert.messageBody}</strong>
          </Alert> : null}
      <TableContainer component={Paper} className={classes.bottom}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
        <TableRow>
        <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
        <StyledTableCell align="left"style={{width:100}}>ID</StyledTableCell>
        <StyledTableCell align="left"style={{width:100}}>Full Name</StyledTableCell>
        <StyledTableCell align="left"style={{width:100}}>Email</StyledTableCell>
        <StyledTableCell align="left"style={{width:100}}>Address</StyledTableCell>
        <StyledTableCell align="left"style={{width:100}}>Identity</StyledTableCell>
        <StyledTableCell align="left" style={{width:100}}>Department</StyledTableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {lists.map((list) => (
          <StyledTableRow key={list.id}>
            <StyledTableCell align="left" style={{width:100}}>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(list.EmployeeID)}>
          Download
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              Are you sure you want to download the performance records of this employee?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleClick()} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          </StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.EmployeeID}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Name}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Email}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Address}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Identity}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Department}</StyledTableCell>
          </StyledTableRow>
        ))}
        </TableBody>
        </Table>
        </TableContainer>
        
      </div>
  )
}
