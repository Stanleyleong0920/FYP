import AdminPage from './AdminPage'
import React, { useState, useEffect } from 'react';
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
import { listUsers } from '../../customQueries'
import { API, graphqlOperation, Auth} from 'aws-amplify'
import Button from '@material-ui/core/Button';
import { listRequestss,getRequests } from '../../graphql/queries'

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
  selection:{
    width: "320%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title:{
    marginTop: '100px'
  }
}));

export default function EmployeeRequests(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [lists,setLists] = useState([])
  const [requests, setRequests] = useState([])
  const [decRequests, setDecRequests] = useState([])
  const [see, setSee] = useState(false)
  const [id,setId] = useState([])
  const [reason,setReason] = useState({})
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const handleClickOpen = (id) => {
    setId(id)
    async function fetchRequest(id){
      let res = await API.graphql(
        graphqlOperation(getRequests, {RequestID: id})
      )
      if (res.data.getRequests){
        setReason(res.data.getRequests)
      }
    }
    fetchRequest(id)
    setOpen(true);
  };
  const handleClose = () => {
    setId([])
    setReason({})
    setOpen(false);
  };

  const handleClickOpen2 = (id) => {
    setId(id)
    async function fetchRequest(id){
      let res = await API.graphql(
        graphqlOperation(getRequests, {RequestID: id})
      )
      if (res.data.getRequests){
        setReason(res.data.getRequests)
      }
    }
    fetchRequest(id)
    setOpen2(true);
  };
  const handleClose2 = () => {
    setId([])
    setReason({})
    setOpen2(false);
  };

  useEffect(()=>{
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
      fetchApprovedRequests()
      fetchDeclinedRequests()
    }
  }

  async function fetchUser(dep){
    let res = await API.graphql(
      graphqlOperation(listUsers, { filter: { Identity: { eq: 'Manager' }, Department: {eq: dep} }})
    )
    if (res.data.listUsers.items){
      setLists(res.data.listUsers.items)
    }
  }

  async function fetchApprovedRequests(id, dep){
    let res = await API.graphql(
      graphqlOperation(listRequestss, { filter: { RequesterIdentity:{eq:"Manager"}, Status: {eq:"Request Approved"} }})
    )
    if (res.data.listRequestss.items.length > 0){
      setRequests(res.data.listRequestss.items)
    }
  }

  async function fetchDeclinedRequests(id, dep){
    let res = await API.graphql(
      graphqlOperation(listRequestss, { filter: { RequesterIdentity:{eq:"Manager"}, Status: {eq:"Request Declined"} }})
    )
    if (res.data.listRequestss.items.length > 0){
      setDecRequests(res.data.listRequestss.items)
      setSee(true)
    }
    else{
      setSee(false)
    }
  }

  return(
    <div>
    <AdminPage></AdminPage>
    <Typography component="h1" variant="h4" className={classes.title}>
    View Approved/Declined Requests From Managers
    </Typography>
    {see === true ? <div>
     <br></br>
     <br></br>
    <Typography component="h1" variant="h6">
    Declined Requests
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Request Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester Department</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester Identity</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {decRequests.map((request) => (
            <StyledTableRow key = {request.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(request.RequestID)}>
              View
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open2}
              onClose={handleClose2}
              aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">Request</DialogTitle>
            <DialogContent>
            <TableContainer component={Paper} className={classes.bottom}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                <StyledTableCell align="left"style={{width:100}}>Manager</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Approved/Declined by Manager</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Manager's Reason</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Admin</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Approved/Declined by Admin</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Admin's Reason</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <StyledTableRow key={reason.id}>   
                <StyledTableCell align="left"style={{width:100}}>{reason.ManagerName}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{reason.ApprovedByManager ? "Approved": "Declined"}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{reason.ManagerReason}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{reason.ApprovedByManager ? reason.AdminName : "Auto Rejected"}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{reason.ApprovedByAdmin ? "Approved" : "Declined"}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{reason.AdminReason}</StyledTableCell>
                </StyledTableRow>
                </TableBody>
                </Table>
                </TableContainer>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose2} color="primary">
                Cancel
              </Button>
            </DialogActions>
            </Dialog>
            </StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{request.Description}</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{request.RequesterName}</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{request.RequesterDepartment}</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{request.RequesterIdentity}</StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>
    : null}
    <Typography component="h1" variant="h6">
    Approved Requests
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Request Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester Department</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester Identity</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {requests.map((request) => (
            <StyledTableRow key = {request.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(request.RequestID)}>
              View
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">Request</DialogTitle>
            <DialogContent>
            <TableContainer component={Paper} className={classes.bottom}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                <StyledTableCell align="left"style={{width:100}}>Approved Manager</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Manager's Reason</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Approved Admin</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Admin's Reason</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <StyledTableRow key={request.id}>   
                <StyledTableCell align="left"style={{width:100}}>{reason.ManagerName}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{reason.ManagerReason}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{reason.AdminName}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{reason.AdminReason}</StyledTableCell>
                </StyledTableRow>
                </TableBody>
                </Table>
                </TableContainer>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
            </Dialog>
            </StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{request.Description}</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{request.RequesterName}</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{request.RequesterDepartment}</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{request.RequesterIdentity}</StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>
      )
  }