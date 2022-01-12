import ManagerPage from './ManagerPage'
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
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  title:{
    marginTop: '10px'
  }
}));

export default function ManagerGoals(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [requests,setRequests] = useState([])
  const [reason,setReason] = useState({})
  const [apRequests,setApRequests] = useState([])
  const [dcRequests,setDcRequests] = useState([])
  const [see, setSee] = useState(false)
  const [view, setView] = useState(false)
  const [id,setId] = useState([])
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
    setOpen(false);
    setId([])
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
    setOpen2(false);
    setId([])
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
      fetchApprovedRequests(res.data.listUsers.items[0].EmployeeID, res.data.listUsers.items[0].Department)
      fetchDeclinedRequests(res.data.listUsers.items[0].EmployeeID, res.data.listUsers.items[0].Department)
      fetchHandledRequests(res.data.listUsers.items[0].EmployeeID)
    }
  }
  
  async function fetchApprovedRequests(id,dep){
    let res = await API.graphql(
      graphqlOperation(listRequestss, { filter: { RequesterID: { eq: id }, RequesterDepartment: {eq: dep}, Status: {eq:"Request Approved"}}})
    )
    if (res.data.listRequestss.items.length > 0){
      setApRequests(res.data.listRequestss.items)
      setView(true)
    }
    else{
      setView(false)
    }
  }

  async function fetchDeclinedRequests(id,dep){
    let res = await API.graphql(
      graphqlOperation(listRequestss, { filter: { RequesterID: { eq: id }, RequesterDepartment: {eq: dep}, Status: {eq:"Request Declined"}}})
    )
    if (res.data.listRequestss.items.length > 0){
      setDcRequests(res.data.listRequestss.items)
      setSee(true)
    }
    else{
      setSee(false)
    }
  }
  async function fetchHandledRequests(id){
    let res = await API.graphql(
      graphqlOperation(listRequestss, { filter: { ManagerID: {eq:id}}})
    )
    if (res.data.listRequestss.items.length > 0){
      setRequests(res.data.listRequestss.items)
    }
  }

  return(
    <div>
    <ManagerPage></ManagerPage>
    <Typography component="h1" variant="h4" className={classes.title}>
    View Requests
    </Typography>
    {view === true ? <div>
    <Typography component="h1" variant="h6">
    Approved Requests
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Request Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
              {apRequests.map((ap)=>(
                <StyledTableRow key = {ap.id}>
                <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(ap.RequestID)}>
                 View
               </Button>
               <Dialog
                 fullWidth={fullWidth}
                 maxWidth={maxWidth}
                 open={open2}
                 onClose={handleClose2}
                 aria-labelledby="max-width-dialog-title"
               >
               <DialogTitle id="max-width-dialog-title">Request Info</DialogTitle>
               <DialogContent>
               <TableContainer component={Paper} className={classes.bottom}>
               <Table className={classes.table} aria-label="simple table">
                   <TableHead>
                   <TableRow>
                   <StyledTableCell align="left"style={{width:100}}>Approved Admin</StyledTableCell>
                   <StyledTableCell align="left"style={{width:100}}>Admin's Reason</StyledTableCell>
                   </TableRow>
                   </TableHead>
                   <TableBody>
                   <StyledTableRow key={ap.id}>   
                   <StyledTableCell align="left"style={{width:100}}>{reason.AdminName}</StyledTableCell>
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
                   <StyledTableCell align="left"style={{width:100}}>{ap.Description}</StyledTableCell>
                   <StyledTableCell align="left"style={{width:100}}>{ap.Status}</StyledTableCell>
                   </StyledTableRow>
              ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div> : null}
    {see === true ? <div>
    <Typography component="h1" variant="h6">
    Declined Requests
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Request Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {dcRequests.map((dc) => (
            <StyledTableRow key = {dc.id}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(dc.RequestID)}>
              View
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">Request Info</DialogTitle>
            <DialogContent>
            <TableContainer component={Paper} className={classes.bottom}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                <StyledTableCell align="left"style={{width:100}}>Declined Admin</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>Admin's Reason</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <StyledTableRow key={dc.id}>   
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
                <StyledTableCell align="left"style={{width:100}}>{dc.Description}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{dc.Status}</StyledTableCell>
                </StyledTableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>:null}
    <Typography component="h1" variant="h6">
    Handled Requests
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Request Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Requester</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request)=>(
                <StyledTableRow key = {request.id}>
                <StyledTableCell align="left" style={{width:100}}>{request.Description}</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>{request.RequesterName}</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>{request.Status}</StyledTableCell>
                </StyledTableRow>
            ))}
           </TableBody>
            </Table>
            </TableContainer>
    </div>
  )
}