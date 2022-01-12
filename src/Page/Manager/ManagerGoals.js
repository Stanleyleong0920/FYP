import ManagerPage from './ManagerPage'
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
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
import { listUsers } from '../../customQueries'
import { addGoal, editGoal, dltGoal, createFeedbackFromGoals, checkDeadLine, handleAcknowledged, handleSubmitGoalRating } from '../../graphql/mutations'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import { listGoals, getGoal } from '../../graphql/queries'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers'
import {v4 as uuid} from "uuid"; 
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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
  const [lists,setLists] = useState([])
  const [goals,setGoals] = useState([])
  const [asGoals, setAsGoals]=useState([])
  const [cmGoals, setCmGoals]=useState([])
  const [see, setSee] = useState(false)
  const [look, setLook] = useState(false)
  const [view, setView] = useState(false)
  const [id,setId] = useState([])
  const [name,setName] = useState([])
  const [alert, setAlert] = useState({
    messageBody: '',
    title: 'success',
    show: false
  })
  const [user,setUser]=useState({
    goals:''
  })
  const [editGl,setEditGl]=useState({
    goals:''
  })
  const [review, setReview] = useState({
    punctuality: 0,
    responsibility: 0,
    hardworking: 0,
    personality: 0,
    activeness: 0,
    feedback: ""
  })
  const [status,setStatus] = useState({})
  const [fblist, setFbList] = useState([])
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [editFb, setEditFb] = useState({
    feedback:""
  })
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [open5, setOpen5] = useState(false)
  const [open6, setOpen6] = useState(false)
  const [open7, setOpen7] = useState(false)
  const handleClickOpen = (id,name) => {
    setId(id)
    setName(name)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setId([])
    setName([])
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

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setId(id)
  };
  const handleClose3 = () => {
    setOpen3(false);
    setId([])
  }

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

  const handleClickOpen6 = (id) => {
    setOpen6(true);
    async function fetchData() {
      let res = await API.graphql(graphqlOperation(getGoal, {GoalID: id}))
      if(res.data.getGoal){
        setStatus(res.data.getGoal)
      }
    }
    fetchData()
    setId(id)
  };
  const handleClose6 = () => {
    setOpen6(false);
    setId([])
    setStatus({})
  };

  const handleClickOpen7 = (id) => {
    setOpen7(true);
    setId(id)
  };
  const handleClose7 = () => {
    setOpen7(false);
    setReview({
      punctuality: 0,
      responsibility: 0,
      hardworking: 0,
      personality: 0,
      activeness: 0,
      feedback: ""
    })
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
      fetchUser(res.data.listUsers.items[0].Department)
      fetchGoals(res.data.listUsers.items[0].EmployeeID)
      fetchPendingGoals(res.data.listUsers.items[0].EmployeeID)
      fetchCompletedGoals(res.data.listUsers.items[0].EmployeeID)
    }
  }

  async function fetchUser(dep){
    let res = await API.graphql(
      graphqlOperation(listUsers, { filter: { Identity: { eq: 'Employee' }, Department: {eq: dep} }})
    )
    if (res.data.listUsers.items){
      setLists(res.data.listUsers.items)
    }
  }
  
  async function fetchGoals(id){
    let res = await API.graphql(
      graphqlOperation(listGoals, { filter: { ManagerID: { eq: id }, Status: {eq: "Pending for employee to be acknowledged"}}})
    )
    let resp = await API.graphql(
      graphqlOperation(listGoals, { filter: { ManagerID: { eq: id }, Status: {eq: "Assigning"}}})
    )
    if (res.data.listGoals.items.length > 0 || resp.data.listGoals.items.length > 0 ){
      setGoals(res.data.listGoals.items.concat(resp.data.listGoals.items))
      checkDeadline(res.data.listGoals.items)
      setSee(true)
    }
    else{
      setSee(false)
    }
  }

  async function fetchPendingGoals(id){
    let res = await API.graphql(
      graphqlOperation(listGoals, { filter: { ManagerID: { eq: id }, Status: {eq: "Pending for manager to review"}}})
    )
    if (res.data.listGoals.items.length > 0){
      setAsGoals(res.data.listGoals.items)
      setView(true)
    }
    else{
      setView(false)
    }
  }

  async function fetchCompletedGoals(id){
    let res = await API.graphql(
      graphqlOperation(listGoals, { filter: { ManagerID: { eq: id }, Status: { eq: "Completed"}}})
    )
    let resp = await API.graphql(
      graphqlOperation(listGoals, { filter: { ManagerID: { eq: id }, Status: { eq: "Failed"}}})
    )
    let respp = await API.graphql(
      graphqlOperation(listGoals, { filter: { ManagerID: { eq: id }, Status: { eq: "Deadline has reached"}}})
    )
    if (res.data.listGoals.items.length > 0 || resp.data.listGoals.items.length > 0 || respp.data.listGoals.items.length > 0 ){
      setCmGoals(res.data.listGoals.items.concat(resp.data.listGoals.items,respp.data.listGoals.items))
      setLook(true)
    }
    else{
      setLook(false)
    }
  }
  
  async function checkDeadline(items){
    try{
      var data = []
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

  async function handlePress(){
    try{
        if(user.goals && selectedDate && user.goals.length > 5){
        const day = String(selectedDate.getDate()).padStart(2, '0')
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
        const year = String(selectedDate.getFullYear())
        const time = String(selectedDate.getHours()).padStart(2, '0')
        + ":" + String(selectedDate.getMinutes()).padStart(2, '0') + ":" + String(selectedDate.getSeconds()).padStart(2, '0') + ".000Z"
        const duedate = year + "-" + month + "-" + day + "T" + time;
        let params = {
          managerId: list.EmployeeID,
          managerName: list.Name,
          department: list.Department,
          employeeID: id,
          employeeName: name,
          goalDescription: user.goals,
          status: "Pending for employee to be acknowledged",
          dueDate: duedate
        }
        let res = await API.graphql(graphqlOperation(addGoal,params))
        if(res.data.addGoal.statusCode === 200){
          setAlert({show:true, title:"success", messageBody:"Added goal Successfully!"})
        }
        else if (res.data.addGoal.statusCode === 300){
          setAlert({show:true, title: "error", messageBody:"Cannot be past time!"})
        }
        else{
          setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Please fill up all fields!/The length of goal description is not enough!"})
      }
    }catch(error){
      console.log('Error: ', error)
    }
    setId([])
    setName([])
    setOpen(false)
    setTimeout(() => {  clearMessage() }, 1000);
  }

  async function handleEdit(){
    try{
        if(editGl.goals && selectedDate && editGl.goals.length > 5){
          const day = String(selectedDate.getDate()).padStart(2, '0')
          const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
          const year = String(selectedDate.getFullYear())
          const time = String(selectedDate.getHours()).padStart(2, '0')
          + ":" + String(selectedDate.getMinutes()).padStart(2, '0') + ":" + String(selectedDate.getSeconds()).padStart(2, '0') + ".000Z"
          const duedate = year + "-" + month + "-" + day + "T" + time;
          let params = {
            goalId: id,
            description: editGl.goals,
            dueDate: duedate
          }
          let res = await API.graphql(
            graphqlOperation(editGoal, params)
          )
          if(res.data.editGoal.statusCode === 200){
            setAlert({show:true, title:"success", messageBody:"Edited goal Successfully!"})
          }
          else if (res.data.editGoal.statusCode === 300){
            setAlert({show:true, title: "error", messageBody:"Cannot be past time!"})
          }
          else{
            setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
          }
        }
        else{
          setAlert({show:true, title: "error", messageBody:"Please fill up all fields!/The length of goal description is not enough!"})
        }
      setId([])
      setOpen2(false)
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
    
  }

  async function handleDelete(){
    try{
      let params={
        goalId:id 
      }
      let res = await API.graphql(graphqlOperation(dltGoal, params))
      if(res.data.dltGoal.statusCode === 200){
        setAlert({show:true, title:"success", messageBody:"Deleted goal Successfully!"})
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
      }
      setId([])
      setOpen3(false)
      setTimeout(() => {  clearMessage() }, 1000);
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
        setAlert({show:true, title: "error", messageBody:"The length of feedback is not enough!"})
      }
      setId([])
      setEditFb({feedback:""})
      setOpen4(false)
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function handleAcknowledge(){
    try{
      let params={
        goalId:id 
      }
      let res = await API.graphql(graphqlOperation(handleAcknowledged, params))
      if(res.data.handleAcknowledged.statusCode === 200){
        setAlert({show:true, title:"success", messageBody:"Acknowledged goal Successfully!"})
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
      }
      setId([])
      setOpen6(false)
      setTimeout(() => {  clearMessage() }, 1000);}
    catch(error){
      console.log('Error: ', error)
    }
  }

  async function handleSubmitRating(){
    try{
      setOpen7(false)
      if (review.punctuality && review.responsibility && review.activeness && review.hardworking && review.personality 
      && review.feedback && review.feedback.length > 5){
        const day = String(new Date().getDate()).padStart(2, '0')
        const month = String(new Date().getMonth() + 1).padStart(2, '0')
        const year = String(new Date().getFullYear())
        const time = String(new Date().getHours()).padStart(2, '0')
        + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + String(new Date().getSeconds()).padStart(2, '0') + ".000Z"
        const duedate = year + "-" + month + "-" + day + "T" + time;
        let params={
          goalId: id,
          punctuality: review.punctuality,
          responsibility: review.responsibility,
          activeness: review.activeness,
          hardworking: review.hardworking,
          personality: review.personality,
          feedback: review.feedback,
          type: "Goal Rating",
          status:"Rating Completed",
          dueDate: duedate
        }
        let res = await API.graphql(graphqlOperation(handleSubmitGoalRating, params))
        if(res.data.handleSubmitGoalRating.statusCode === 200){
          setAlert({show:true, title:"success", messageBody:"Goal rating submitted successfully! Reward points will be added to the employee."})
        }
        else if (res.data.handleSubmitGoalRating.statusCode === 201){
          setAlert({show:true, title:"success", messageBody:"Goal rating submitted successfully! Reward points will not be added to the employee."})
        }
        else{
          setAlert({show:true, title:"error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Please fill up all fields!/The length of feedback is not enough!"})
      }
      setReview({
        punctuality: 0,
        responsibility: 0,
        hardworking: 0,
        personality: 0,
        activeness: 0,
        feedback: ""
      })
      setId([])
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
    <ManagerPage></ManagerPage>
    <Typography component="h1" variant="h4" className={classes.title}>
    Goals Setup to Employees
    </Typography>
    <br></br>
    <br></br>
    {alert.show ?<Alert severity={alert.title === 'success' ? "success" : "error"}>
    <AlertTitle><strong>{alert.title}</strong></AlertTitle>
    <strong>{alert.messageBody}</strong>
    </Alert> : null}
    {look === true ? <div>
      <br></br>
      <br></br>
    <Typography component="h1" variant="h6">
    Goals that are Completed/Failed/Deadline Has Reached (Without Ratings)
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Employee Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Goal Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Due Date</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {cmGoals.map((cm) => (
            <StyledTableRow key={cm.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen7(cm.GoalID)}>
              Give Ratings
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open7}
              onClose={handleClose7}
              aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">Review</DialogTitle>
            <DialogContent>
            <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Punctuality</Typography>
              <Rating 
              name="punctuality-10" 
              defaultValue={1} 
              max={10} 
              precision={0.5}
              value={review.punctuality}
              onChange={(e) => setReview({...review,punctuality:e.target.value})}
              />
            </Box> 
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Responsibility</Typography>
              <Rating 
              name="responsibility-10" 
              defaultValue={1} 
              max={10} 
              precision={0.5}
              value={review.responsibility}
              onChange={(e) => setReview({...review,responsibility:e.target.value})}
              />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Hardworking</Typography>
              <Rating 
              name="hardworking-10" 
              defaultValue={1} 
              max={10} 
              precision={0.5}
              value={review.hardworking}
              onChange={(e) => setReview({...review,hardworking:e.target.value})}
              />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Personality</Typography>
              <Rating 
              name="personality-10" 
              defaultValue={1} 
              max={10} 
              precision={0.5}
              value={review.personality}
              onChange={(e) => setReview({...review,personality:e.target.value})}
              />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Activeness</Typography>
              <Rating 
              name="activeness-10" 
              defaultValue={1} 
              max={10} 
              precision={0.5}
              value={review.activeness}
              onChange={(e) => setReview({...review,activeness:e.target.value})}
              />
            </Box>
            <TextField
                id="outlined-multiline-static"
                label="Feedback"
                multiline
                rows={2}
                value={review.feedback}
                onChange={(e) => setReview({...review,feedback:e.target.value})}
                fullWidth
            />
            *One time submission only. Cannot be edited or deleted.
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose7} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmitRating()} color="primary">
                Submit
              </Button>
            </DialogActions>
            </Dialog>
            </StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{cm.EmployeeName}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{cm.GoalDescription}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{cm.DueDate}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{cm.Status}</StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>: null}
    {view === true ? <div>
      <br></br>
      <br></br>
    <Typography component="h1" variant="h6">
    Pending Goals to be Reviewed
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Employee Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Goal Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Due date</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {asGoals.map((as) => (
            <StyledTableRow key={as.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen6(as.GoalID)}>
              Review
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open6}
              onClose={handleClose6}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">Review</DialogTitle>
            <DialogContent>
            <TableContainer component={Paper} className={classes.bottom}>
              <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                    <StyledTableCell align="left"style={{width:100}}>Status From Employee</StyledTableCell>
                    <StyledTableCell align="left"style={{width:100}}>Comments</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <StyledTableRow key={status.id}>
                      <StyledTableCell align="left" style={{width:100}}>{status.EmployeeStatus}</StyledTableCell>
                      <StyledTableCell align="left" style={{width:100}}>{status.EmployeeComments}</StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                    </Table>
                    </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose6} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleAcknowledge()} color="primary">
                Acknowledge
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
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(as.GoalID)}>
              Edit
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">Edit Goal/Task</DialogTitle>
              <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Goal/Task Description"
                multiline
                rows={5}
                value={editGl.goals}
                onChange={(e) => setEditGl({...editGl,goals:e.target.value})}
                fullWidth
              />
              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                value={selectedDate}
                onChange={handleDateChange}
                label="Due Date and Time"
                disablePast
                minDate={new Date()}
                format="yyyy/MM/dd hh:mm a"
              />
              </MuiPickersUtilsProvider>
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
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen3(as.GoalID)}>
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
                  Are you sure you want to delete this goal?
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
              <StyledTableCell align="left" style={{width:100}}>{as.EmployeeName}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{as.GoalDescription}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{as.DueDate}</StyledTableCell>
              </StyledTableRow> 
          ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>: null}
    {see === true ? <div>
      <br></br>
      <br></br>
    <Typography component="h1" variant="h6">
    Goals Management from Employees
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Employee Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Goal Description</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>Due Date</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {goals.map((goal)=> (
            <StyledTableRow key={goal.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(goal.GoalID)}>
              Edit
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">Edit Goal/Task</DialogTitle>
              <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Goal/Task Description"
                multiline
                rows={5}
                value={editGl.goals}
                onChange={(e) => setEditGl({...editGl,goals:e.target.value})}
                fullWidth
              /> 
              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                value={selectedDate}
                onChange={handleDateChange}
                label="Due Date and Time"
                disablePast
                minDate={new Date()}
                format="yyyy/MM/dd hh:mm a"
              />
              </MuiPickersUtilsProvider>
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
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen3(goal.GoalID)}>
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
                  Are you sure you want to delete this goal?
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
              <StyledTableCell align="left" style={{width:100}}>{goal.EmployeeName}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{goal.GoalDescription}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{goal.DueDate}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{goal.Status}</StyledTableCell>
              </StyledTableRow>))}
              </TableBody>
              </Table>
              </TableContainer>
      </div> : null}
      <Typography component="h1" variant="h6">
      Adding Goals
      </Typography>
      <TableContainer component={Paper} className={classes.bottom}>
      <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
            <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>ID</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Full Name</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {lists.map((list) => (
              <StyledTableRow key={list.id}>
                <StyledTableCell align="left" style={{width:100}}>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(list.EmployeeID, list.Name)}>
                Add a goal
              </Button>
              <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">New Job Goal/Task</DialogTitle>
              <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Goal/Task Description"
                multiline
                rows={5}
                value={user.goals}
                onChange={(e) => setUser({...user,goals:e.target.value})}
                fullWidth
              />
              <br></br>
              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                value={selectedDate}
                onChange={handleDateChange}
                label="Due Date and Time"
                disablePast
                minDate={new Date()}
                format="yyyy/MM/dd hh:mm a"
              />
              </MuiPickersUtilsProvider>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handlePress()} color="primary">
                  Submit
                </Button>
              </DialogActions>
              </Dialog>
              </StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{list.EmployeeID}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{list.Name}</StyledTableCell>
              </StyledTableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
    </div>
  )
}