import EmployeePage from './EmployeePage'
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
import { listFeedbacks } from '../../graphql/queries'
import { addFeedback, editFeedback, dltFeedback } from '../../graphql/mutations'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { listUsers } from '../../customQueries'
import { API, graphqlOperation, Auth} from 'aws-amplify'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';

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
  title:{
    marginTop: '10px'
  }
}));

export default function Feedback(){
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [see, setSee] = useState(false)
  const [name, setName] = useState([])
  const [dep, setDep] = useState([])
  const [alert, setAlert] = useState({
    messageBody: '',
    title: "success",
    show: false
  })
  const [list,setList] = useState({})
  const [lists,setLists] = useState([])
  const [datas,setDatas] = useState([])
  const [id,setId] = useState("")
  const [feedback,setFeedback] = useState({
    feedback:""})
  const [editFb, setEditFb] = useState({
    feedback:""
  })
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');

  const handleClickOpen = (id, name,dep) => {
    setOpen(true);
    setId(id)
    setName(name)
    setDep(dep)
  };
  const handleClose = () => {
    setOpen(false);
    setFeedback({feedback:""})
    setId([])
    setName([])
    setDep([])
  };
  const handleClickOpen2 = (id) => {
    setOpen2(true);
    setId(id)
  };
  const handleClose2 = () => {
    setOpen2(false);
    setFeedback({feedback:""})
    setId([])
  };
  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setId(id)
  };
  const handleClose3 = () => {
    setOpen3(false);
    setId([])
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
      fetchUser(res.data.listUsers.items[0].EmployeeID)
      fetchFeedback(res.data.listUsers.items[0].EmployeeID)
    }
  }
  
  async function fetchUser(id){
    let res = await API.graphql(
      graphqlOperation(listUsers, { filter: { EmployeeID: { ne: id }, Identity: { eq: 'Employee' } }})
    )
    if (res.data.listUsers.items){
      setLists(res.data.listUsers.items)
    }
  }

  async function fetchFeedback(id) {
    let res = await API.graphql(
      graphqlOperation(listFeedbacks, {filter: { SenderID: { eq: id }}})
    )
    if (res.data.listFeedbacks.items.length > 0){
      setDatas(res.data.listFeedbacks.items)
      setSee(true)
    }
  }

  async function handleAdd(){
    try{
      setOpen(false)
      setFeedback({feedback:""})
      if(feedback.feedback && feedback.feedback.length > 5){
        let params={
          senderId: list.EmployeeID,
          senderName: list.Name,
          senderDep: list.Department,
          feedback: feedback.feedback,
          receiverId: id,
          receiverName: name,
          receiverDep: dep
        }
        let res = await API.graphql(graphqlOperation(addFeedback,params))
        if (res.data.addFeedback.statusCode === 200){
          setAlert({show:true, title:"success", messageBody:"Added Feedback Successfully!"})
        }
        else{
          setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title: "error", messageBody:"The length of feedback is not enough!"})
      }
      setId([])
      setName([])
      setDep([])
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function clearMessage(){
    window.location.reload(false)
    setAlert({show:false})
  }

  async function handleEdit(){
    try{
      setOpen2(false)
      setEditFb({feedback:""})
      if(editFb.feedback && editFb.feedback.length > 5){
        let params={
          feedbackId: id,
          feedback: editFb.feedback
        }
        let res = await API.graphql(graphqlOperation(editFeedback,params))
        if (res.data.editFeedback.statusCode === 200){
          setAlert({show:true, title:"success", messageBody:"Edited Feedback Successfully!"})
        }
        else{
          setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title: "error", messageBody:"The length of feedback is not enough!"})
      }
      setId([])
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function handleDelete(){
    try{
      setOpen3(false)
      let params = {
        feedbackId:id
      }
      let res = await API.graphql(graphqlOperation(dltFeedback,params))
      if (res.data.dltFeedback.statusCode === 200) {
        setAlert({show:true, title:"success", messageBody:"Deleted Feedback Successfully!"})
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
      }
      setId([])
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  return(
    <div>
    <EmployeePage></EmployeePage>
    <Typography component="h1" variant="h4" className={classes.title}>
    Writing Feedback to Other Employees
    </Typography>
    {alert.show ?<Alert severity={alert.title === "success" ? "success" : "error"}>
            <AlertTitle><strong>{alert.title}</strong></AlertTitle>
            <strong>{alert.messageBody}</strong>
            </Alert> : null}
    {see === true ? 
    <div>
    <Typography component="h1" variant="h6">
    Edit/Delete Feedback
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Feedback ID</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Receiver Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Feedback</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Date Time</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {datas.map((data)=> (
            <StyledTableRow key={data.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(data.FeedbackID)}>
              Edit
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">New Feedback</DialogTitle>
              <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Feedback"
                multiline
                rows={5}
                value={editFb.feedback}
                onChange={(e) => setEditFb({...editFb,feedback:e.target.value})}
                fullWidth
              />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleEdit()} color="primary">
                  Submit
                </Button>
              </DialogActions>
              </Dialog>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen3(data.FeedbackID)}>
              Delete
            </Button>
              <Dialog
              open={open3}
              onClose={handleClose3}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this feedback?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose3} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleDelete()} color="primary" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>
              </StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{data.FeedbackID}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{data.ReceiverName}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{data.Description}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{data.updatedAt}</StyledTableCell>
              </StyledTableRow>))}
              </TableBody>
              </Table>
              </TableContainer>
      </div> : null}
    <Typography component="h1" variant="h6">
    Add Feedback
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Email</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Department</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {lists.map((list)=> (
            <StyledTableRow key={list.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(list.EmployeeID,list.Name,list.Department)}>
              Write Feedback
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">Feedback</DialogTitle>
              <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Feedback"
                multiline
                rows={4}
                value={feedback.feedback}
                onChange={(e) => setFeedback({...feedback,feedback:e.target.value})}
                fullWidth
              />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleAdd()} color="primary">
                  Submit
                </Button>
              </DialogActions>
              </Dialog>
              </StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{list.Name}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{list.Email}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{list.Department}</StyledTableCell>
              </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>
  )
}
