import AdminPage from './AdminPage'
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API, graphqlOperation, Auth} from 'aws-amplify'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import { listUsers, listRequestss } from '../../graphql/queries'
import { handleApproval } from '../../graphql/mutations'

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

export default function RequestsFromEmployees(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [requests,setRequests] = useState([])
  const [id,setId] = useState([])
  const [alert, setAlert] = useState({
    messageBody: '',
    title: 'success',
    show: false
  })
  const[reason,setReason] = useState({
    reason:""
  })
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setReason({reason:""})
    setId([])
    setOpen(false);
  };
  const handleClickOpen2 = (id) => {
    setId(id)
    setOpen2(true);
  };
  const handleClose2 = () => {
    setReason({reason:""})
    setId([])
    setOpen2(false);
  };

  useEffect(()=>{
    async function user() {
      let response = await Auth.currentAuthenticatedUser({
        bypassCache: false
      })
      fetchData(response.username)
      fetchEmployeeRequests()
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
  
  async function fetchEmployeeRequests(){
    let res = await API.graphql(
      graphqlOperation(listRequestss, { filter: { RequesterIdentity: { eq: "Employee" }, Status: {eq:"Pending for admin to approve"}}})
    )
    if (res.data.listRequestss.items.length > 0){
      setRequests(res.data.listRequestss.items)
    }
  }

  async function handleSubmit(status){
    try{ 
      var requestStatus = ""
      if(reason.reason && reason.reason.length > 5){
        console.log(status)
        if(status === true){
          requestStatus = "Request Approved" 
        }
        else{
          requestStatus = "Request Declined"
        }
        let params = {
          requestId: id,
          approverId: list.EmployeeID,
          approverName: list.Name,
          approverIdentity: list.Identity, 
          approvedReason: reason.reason,
          approvalStatus: requestStatus
        }
        let res = await API.graphql(graphqlOperation(handleApproval,params))
        if(res.data.handleApproval.statusCode === 200){
          setAlert({show:true, title:"success", messageBody:"The request is being handled!"})
        }
        else{
          setAlert({show:true, title:"error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title:"error", messageBody:"The length of the reason is not enough!"})
      }
      setId([])
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log("Error: ",error)
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
    Requests From Employees
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
          <StyledTableCell align="left"style={{width:100}}>Request Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester Department</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request)=>(
              <StyledTableRow key = {request.id}>
              <StyledTableCell align="left" style={{width:100}}>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(request.RequestID)}>
                Approve
              </Button>
              <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">Reason</DialogTitle>
              <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Reason"
                multiline
                rows={5}
                value={reason.reason}
                onChange={(e) => setReason({...reason,reason:e.target.value})}
                fullWidth
              />
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose2} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit(true)} color="primary">
                Submit
              </Button>
            </DialogActions>
            </Dialog>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(request.RequestID)}>
                Decline
              </Button>
              <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">Reason</DialogTitle>
              <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Reason"
                multiline
                rows={5}
                value={reason.reason}
                onChange={(e) => setReason({...reason,reason:e.target.value})}
                fullWidth
              />
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit(false)} color="primary">
                Submit
              </Button>
            </DialogActions>
            </Dialog>
              </StyledTableCell>
              <StyledTableCell align="left"style={{width:100}}>{request.Description}</StyledTableCell>
              <StyledTableCell align="left"style={{width:100}}>{request.RequesterName}</StyledTableCell>
              <StyledTableCell align="left"style={{width:100}}>{request.RequesterDepartment}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>
  )
}