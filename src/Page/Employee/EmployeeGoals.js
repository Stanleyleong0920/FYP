import EmployeePage from './EmployeePage'
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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createFeedbackFromGoals, checkDeadLine, employeehandleAcknowledged, employeehandleSubmit} from '../../graphql/mutations'
import { API, graphqlOperation, Auth} from 'aws-amplify'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import { listUsers, listGoals, getGoal } from '../../graphql/queries'
import {v4 as uuid} from "uuid"; 
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title:{
    marginTop: '10px'
  }
}));

export default function EmployeeGoals(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [goals,setGoals] = useState([])
  const [asGoals, setAsGoals]=useState([])
  const [see, setSee] = useState(false)
  const [id,setId] = useState([])
  const [alert, setAlert] = useState({
    messageBody: '',
    title: 'success',
    show: false
  })
  const [user,setUser]=useState({
    goals:''
  })
  const [fblist, setFbList] = useState([])
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [editFb, setEditFb] = useState({
    feedback:""
  })
  const [comments, setComments] = useState({
    comments:""
  })
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [open5, setOpen5] = useState(false)

  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setId([])
    setUser({goals:""})
  };

  const handleClickOpen2 = (id) => {
    setId(id)
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
    setId([])
  };

  const handleClickOpen4 = (id) => {
    setOpen4(true);
    setId(id)
  };
  const handleClose4 = () => {
    setOpen4(false);
    setId([])
    setEditFb({feedback:""})
  };

  const handleClickOpen5 = (id) => {
    setOpen5(true);
    async function fetchData() {
      let res = await API.graphql(graphqlOperation(getGoal, {GoalID: id}))
      let resp = res.data.getGoal.Feedback.items
      console.log(resp)
      if(resp)
        resp = resp.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
        setFbList(resp)
    }
    fetchData()
    setId(id)
  };
  const handleClose5 = () => {
    setOpen5(false);
    setId([])
    setFbList([])
  };

  const [age, setAge] = useState('')
  const handleChange = (event) => {
    setAge(event.target.value);
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
      fetchGoals(res.data.listUsers.items[0].EmployeeID)
      fetchAssigningGoals(res.data.listUsers.items[0].EmployeeID)
    }
  }

  async function fetchGoals(id){
    let res = await API.graphql(
      graphqlOperation(listGoals, { filter: { EmployeeID: { eq: id }, Status: {eq: "Pending for employee to be acknowledged"}}})
    )
    if (res.data.listGoals.items.length > 0){
      setGoals(res.data.listGoals.items)
      checkDeadline(res.data.listGoals.items)
    }
  }

  async function fetchAssigningGoals(id){
    let res = await API.graphql(
      graphqlOperation(listGoals, { filter: { EmployeeID: { eq: id }, Status: {eq: "Assigning"}}})
    )
    if (res.data.listGoals.items.length > 0){
      setAsGoals(res.data.listGoals.items)
      checkDeadline(res.data.listGoals.items)
      setSee(true)
    }
    else{
      setSee(false)
    }
  }

  async function checkDeadline(items){
    try{
      const data = []
      var i;
      for(i = 0; i < items.length; i++){
        data.push(items[i].GoalID)
      }
      let params = {
        goalId: data
      }
      let res = await API.graphql(graphqlOperation(checkDeadLine, params))
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function handleAddFeedback(){
    try{
      if(editFb.feedback && editFb.feedback.length > 5){
        let params = {
          GoalFeedbackID: uuid(),
          feedbackFromGoalsGoalId: id,
          Sender: list.Name,
          Feedback: editFb.feedback
        }
        let res = await API.graphql(graphqlOperation(createFeedbackFromGoals, {input:params}))
        if(res.data.createFeedbackFromGoals.GoalFeedbackID){
          setAlert({show:true, title:"success", messageBody:"Added Feedback Successfully!"})
        }
        else{
          setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Please filled up all fields!/The length of feedback is not enough!"})
      }
      setId([])
      setEditFb({feedback:""})
      setOpen4(false)
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function handleAcknowledged(){
    try{
      let params={
        goalId:id 
      }
      let res = await API.graphql(graphqlOperation(employeehandleAcknowledged, params))
      if(res.data.employeehandleAcknowledged.statusCode === 200){
        setAlert({show:true, title:"success", messageBody:"Acknowledged goal Successfully!"})
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
      }
      setId([])
      setOpen(false)
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function handleSubmitStatus(){
    try{
      if(age && comments.comments && comments.comments.length > 5){
        let params={
          goalId: id,
          comments: comments.comments,
          status: age
        }
        let res = await API.graphql(graphqlOperation(employeehandleSubmit, params))
        if(res.data.employeehandleSubmit.statusCode === 200){
          setAlert({show:true, title:"success", messageBody:"Submitted Status Successfully!"})
        }
        else{
          setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Please filled up all fields!/The length of the comment is not enough!"})
      }
      setOpen2(false)
      setComments({comments:""})
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
    Goals from the Managers
    </Typography>
    <br></br>
    <br></br>
    {alert.show ?<Alert severity={alert.title === 'success' ? "success" : "error"}>
    <AlertTitle><strong>{alert.title}</strong></AlertTitle>
    <strong>{alert.messageBody}</strong>
    </Alert> : null}
    {see === true ? <div>
    <br></br>
    <br></br>
    <Typography component="h1" variant="h6">
    Goals that are in Progress
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Manager Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Goal Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Due Date</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {asGoals.map((as)=>(
            <StyledTableRow key={as.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(as.GoalID)}>
              Submit
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open2}
              onClose={handleClose2}
              aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">Submit</DialogTitle>
            <DialogContent>
            <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Goal Status</InputLabel>
              <Select
                className={classes.selection}
                value={age}
                onChange={handleChange}
              >
                <option aria-label="None" value="" />
                <option value={"Success"}>Success</option>
                <option value={"Failed"}>Failed</option>
              </Select>
            </FormControl>
            </Grid>
            <TextField
              id="outlined-multiline-static"
              label="Comments"
              multiline
              rows={5}
              value={comments.comments}
              onChange={(e) => setComments({...comments,comments:e.target.value})}
              fullWidth
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmitStatus()} color="primary">
                Submit
              </Button>
            </DialogActions>
            </Dialog>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen4(as.GoalID)}>
              Add Feedback
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open4}
              onClose={handleClose4}
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
              <Button onClick={handleClose4} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleAddFeedback()} color="primary">
                Submit
              </Button>
            </DialogActions>
            </Dialog>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen5(as.GoalID)}>
                View Feedback
              </Button>
              <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open5}
                onClose={handleClose5}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">View Feedback</DialogTitle>
              <DialogContent>
              <TableContainer component={Paper} className={classes.bottom}>
              <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                    <StyledTableCell align="left"style={{width:100}}>Feedback</StyledTableCell>
                    <StyledTableCell align="left"style={{width:100}}>Sender</StyledTableCell>
                    <StyledTableCell align="left"style={{width:100}}>Date/Time</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {fblist.map((f) => (
                      <StyledTableRow key={f.id}>
                        <StyledTableCell align="left"style={{width:100}}>{f.Feedback}</StyledTableCell>
                        <StyledTableCell align="left"style={{width:100}}>{f.Sender}</StyledTableCell>
                        <StyledTableCell align="left"style={{width:100}}>{f.createdAt}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                      </TableBody>
                      </Table>
                      </TableContainer>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose5} color="primary">
                  Cancel
                </Button>
              </DialogActions>
              </Dialog>
              </StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{as.ManagerName}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{as.GoalDescription}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{as.DueDate}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{as.Status}</StyledTableCell>
              </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>: null}
    <Typography component="h1" variant="h6">
    Pending Goals From Manager
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Manager Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Goal Description</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>Due Date</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {goals.map((goal)=>(
            <StyledTableRow key={goal.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(goal.GoalID)}>
              Acknowledge
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to acknowledge the goal that is set by the manager?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleAcknowledged()} color="primary" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen4(goal.GoalID)}>
              Add Feedback
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open4}
              onClose={handleClose4}
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
              <Button onClick={handleClose4} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleAddFeedback()} color="primary">
                Submit
              </Button>
            </DialogActions>
            </Dialog>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen5(goal.GoalID)}>
                View Feedback
              </Button>
              <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open5}
                onClose={handleClose5}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">View Feedback</DialogTitle>
              <DialogContent>
              <TableContainer component={Paper} className={classes.bottom}>
              <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                    <StyledTableCell align="left"style={{width:100}}>Feedback</StyledTableCell>
                    <StyledTableCell align="left"style={{width:100}}>Sender</StyledTableCell>
                    <StyledTableCell align="left"style={{width:100}}>Date/Time</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {fblist.map((f) => (
                      <StyledTableRow key={list.id}>
                        <StyledTableCell align="left"style={{width:100}}>{f.Feedback}</StyledTableCell>
                        <StyledTableCell align="left"style={{width:100}}>{f.Sender}</StyledTableCell>
                        <StyledTableCell align="left"style={{width:100}}>{f.createdAt}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                      </TableBody>
                      </Table>
                      </TableContainer>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose5} color="primary">
                  Cancel
                </Button>
              </DialogActions>
              </Dialog>
              </StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{goal.ManagerName}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{goal.GoalDescription}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{goal.DueDate}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{goal.Status}</StyledTableCell>
              </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>
  )
}
