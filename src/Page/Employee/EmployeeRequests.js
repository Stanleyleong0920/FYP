import EmployeePage from './EmployeePage'
import React, { useState, useEffect } from 'react';
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
import { requestSubmit, dltRequest } from '../../graphql/mutations'
import { API, graphqlOperation, Auth} from 'aws-amplify'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import { listRequestss } from '../../graphql/queries'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
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
  selection:{
    width: "320%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title:{
    marginTop: '10px'
  }
}));

export default function EmployeeRequests(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [lists,setLists] = useState([])
  const [requests, setRequests] = useState([])
  const [see, setSee] = useState(false)
  const [id,setId] = useState([])
  const [name,setName] = useState([])
  const [identity,setIdentity] = useState([])
  const [department,setDepartment] = useState([])
  const [alert, setAlert] = useState({
    messageBody: '',
    title: 'success',
    show: false
  })
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const handleClickOpen = (id,name,identity,department) => {
    setId(id)
    setName(name)
    setIdentity(identity)
    setDepartment(department)
    setOpen(true);
  };
  const handleClose = () => {
    setId([])
    setName([])
    setIdentity([])
    setDepartment([])
    setAge("")
    setAged("")
    setOpen(false);
  };

  const handleClickOpen2 = (id) => {
    setId(id)
    setOpen2(true);
  };
  const handleClose2 = () => {
    setId([])
    setOpen2(false);
  };

  const [age, setAge] = useState('')
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [aged, setAged] = useState('')
  const handleChanged = (event) => {
    setAged(event.target.value);
  };

  const [selectDate, setSelectDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectDate(date);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChanged = (date) => {
    setSelectedDate(date);
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
      fetchRequests(res.data.listUsers.items[0].EmployeeID,res.data.listUsers.items[0].Department)
    }
  }

  async function fetchRequests(id, dep){
    let res = await API.graphql(
      graphqlOperation(listRequestss, { filter: { RequesterID: { eq: id }, RequesterDepartment: {eq: dep}, Status: {eq:"Pending for manager to approve"} }})
    )
    let resp = await API.graphql(
      graphqlOperation(listRequestss, { filter: { RequesterID: { eq: id }, RequesterDepartment: {eq: dep}, Status: {eq:"Pending for admin to approve"} }})
    )
    if (res.data.listRequestss.items.length > 0 ||resp.data.listRequestss.items.length > 0){
      setRequests(res.data.listRequestss.items.concat(resp.data.listRequestss.items))
      setSee(true)
    }
    else{
      setSee(false)
    }
  }

  async function handleSubmit(){
    try{
      setOpen(false)
      if(age){
          var rewardPoints = 0
        var salary = 0
        var days = 0
        var startDate = ""
        var endDate = ""
        var type = ""
        if(age === "Increase Salary"){
          if (aged){
            salary = aged
            rewardPoints = aged * 5
            type = age
            let params = {
              requesterId: id,
              requesterName: name,
              requesterIdentity: identity,
              requesterDepartment: department,
              salary: salary,
              rewardPoints: rewardPoints,
              days: days,
              type: type,
              status: "Pending for manager to approve",
              startDate: startDate,
              endDate: endDate
            }
            handleSubmitRequest(params)
          }
          else{
            setAlert({show:true, title: "error", messageBody:"Please fill up all fields!"})
            setTimeout(()=>{setAlert({show:false})}, 2000)
          }
        }
        else if (age === "Take Leave"){
          if(selectedDate < selectDate){
            setAlert({show:true, title: "error", messageBody:"End Date cannot be earlier than Start Date!"})
            setTimeout(() => {  setAlert({show:false}) }, 1000);
            setAge('')
            setOpen(false)
          }
          else{
            const diffTime = Math.abs(selectedDate - selectDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            days = diffDays
            console.log(days)
            console.log(selectDate)
            console.log(selectedDate)
            rewardPoints = days * 500
            type = age
            startDate = String(selectDate.getDate()).padStart(2, '0') + "/" + String(selectDate.getMonth() + 1).padStart(2, '0') + "/" + String(selectDate.getFullYear())
            endDate = String(selectedDate.getDate()).padStart(2, '0') + "/" + String(selectedDate.getMonth() + 1).padStart(2, '0') + "/" + String(selectedDate.getFullYear())
            let params = {
              requesterId: id,
              requesterName: name,
              requesterIdentity: identity,
              requesterDepartment: department,
              salary: salary,
              type: type,
              rewardPoints: rewardPoints,
              days: days,
              status: "Pending for manager to approve",
              startDate: startDate,
              endDate: endDate
            }
            handleSubmitRequest(params)
          }
        }
      }
      else{
        setAlert({show:true, title:"error", messageBody:"Please fill up all fields!"})
        setTimeout(()=>{setAlert({show:false})}, 2000)
      }
    }
    catch(error){
      console.log('Error: ', error)
    }
  }

  async function handleSubmitRequest(params){
    try{
      let res = await API.graphql(graphqlOperation(requestSubmit, params))
      if (res.data.requestSubmit.statusCode === 200){
        setAlert({show:true, title:"success", messageBody:"Added Request Successfully!"})
      }
      else if(res.data.requestSubmit.statusCode === 201){
        setAlert({show:true, title:"error", messageBody:"Reward points not enough!"})
      }
      else if(res.data.requestSubmit.statusCode === 301){
        setAlert({show:true, title:"error", messageBody:"Taking leave of the start date must be more than 7 days from now!"})
      }
      else{
        setAlert({show:true, title:"error", messageBody:"Invalid Input!"})
      }
      setId([])
      setName([])
      setIdentity([])
      setDepartment([])
      setOpen(false)
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function handleDelete(){
    try{
      let params = {
        requestId: id
      }
      let res = await API.graphql(graphqlOperation(dltRequest, params))
      if(res.data.dltRequest.statusCode === 200){
        setAlert({show:true, title:"success", messageBody:"Deleted Request Successfully, the reward points are returned!"})
      }
      else{
        setAlert({show:true, title:"error", messageBody:"Invalid Input!"})
      }
      setId([])
      setOpen2(false)
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
    Requests Setup to Managers
    </Typography>
    {alert.show ?<Alert severity={alert.title === 'success' ? "success" : "error"}>
    <AlertTitle><strong>{alert.title}</strong></AlertTitle>
    <strong>{alert.messageBody}</strong>
    </Alert> : null}
    {see === true ? <div>
   <br></br>  
   <br></br>
    <Typography component="h1" variant="h6">
    Pending Requests
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Request Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Request Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {requests.map((request) => (
            <StyledTableRow key = {request.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(request.RequestID)}>
              Delete
            </Button>
            <Dialog
              open={open2}
              onClose={handleClose2}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this request? The reward points from the request will be returned when deleted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleDelete()} color="primary" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>
              </StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{request.Description}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{request.Status}</StyledTableCell>
              </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
    </div> :null}
    <Typography component="h1" variant="h6">
    Requests Setup
    </Typography>
    <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(list.EmployeeID,list.Name,list.Identity,list.Department)}>
              Add Requests
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
            <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Request Type</InputLabel>
              <Select
                className={classes.selection}
                value={age}
                onChange={handleChange}
              >
                <option aria-label="None" value="" />
                <option value={"Increase Salary"}>Increase Salary</option>
                <option value={"Take Leave"}>Take Leave</option>
              </Select>
            </FormControl>
            </Grid>
            <br></br>  
            <br></br>
            {age === "Increase Salary" ? <div>
            <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Salary</InputLabel>
              <Select
                className={classes.selection}
                value={aged}
                onChange={handleChanged}
              >
                <option aria-label="None" value="" />
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={300}>300</option>
                <option value={400}>400</option>
                <option value={500}>500</option>
              </Select>
            </FormControl>
            </Grid>
            </div>:null}
            {age === "Take Leave" ? <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  label="Start Date"
                  disablePast
                  value={selectDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="End Date"
                  format="MM/dd/yyyy"
                  disablePast
                  value={selectedDate}
                  onChange={handleDateChanged}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                </Grid>
                </MuiPickersUtilsProvider>
              </div>:null}
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} color="primary">
                Submit
              </Button>
            </DialogActions>
            </Dialog>
    </div>
  )
}
