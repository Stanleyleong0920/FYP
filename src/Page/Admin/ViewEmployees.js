import AdminPage from './AdminPage'
import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { listUsers } from '../../customQueries'
import { deleteUsers, editUsers } from '../../graphql/mutations'
import { API, graphqlOperation} from 'aws-amplify'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
  selection:{
    width:'200%'
  },
  title:{
    marginTop: '100px'
  }
}));

export default function ViewEmployees(){
  const classes = useStyles();
  const [lists,setLists] = useState([])
  const [id,setId] = useState([])
  const [alert, setAlert] = useState({
    messageBody: '',
    title: 'success',
    show: false
  })
  const [user,setUser]=useState({
    address:''
  })
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUser({
      address:''
    })
    setId([])
    setAge({})
    setAged({})
    setSalary(0)
  };

  const handleClickOpen2 = (id) => {
    setId(id)
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setId([])
  };

  const [age, setAge] = useState('')
  const [aged, setAged] = useState('')
  const [salary, setSalary] = useState(0)
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handledChange = (event) => {
    setAged(event.target.value);
  };
  const handleChanged = (event) => {
    setSalary(event.target.value);
  };


  useEffect(()=>{
    fetchUser();
  }, []) 
  
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
      setOpen2(false)
      let params={
        id: id
      }
      let res = await API.graphql(graphqlOperation(deleteUsers, params))
      if (res.data.deleteUsers.statusCode === 200){
        setAlert({show:true, title:"success", messageBody:"Delete Successful!"})
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
      }
      setTimeout(() => {  clearMessage() }, 1000);
    }catch(error){
      console.log('Error: ', error)
    }
  }

  async function handlePress(){
    try{
      setOpen(false)
      if(user.address && age && aged && salary && user.address.length > 10){
        let params={
          id: id,
          address: user.address,
          identity: age,
          department: aged,
          salary: salary
        }
        let res = await API.graphql(graphqlOperation(editUsers, params))
        if (res.data.editUsers.statusCode === 200){
          setAlert({show:true, title:"success", messageBody:"Edited Successful!"})
        }
        else{
          setAlert({show:true, title: "error", messageBody:"Invalid Input!"})
        }
      }
      else{
        setAlert({show:true, title: "error", messageBody:"Please fill up all fields/The length of the address is not enough!"})
      }
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
      <AdminPage></AdminPage>
      <Typography component="h1" variant="h4" className={classes.title}>
      View Employees
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
            <StyledTableCell align="left" style={{width:100}}>Salary</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>Reward Points</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {lists.map((list) => (
              <StyledTableRow key={list.id}>
                <StyledTableCell align="left" style={{width:100}}>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(list.EmployeeID)}>
                Edit
              </Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Profile</DialogTitle>
              <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Address"
                type="Address"
                value={user.address}
                onChange={(e) => setUser({...user,address:e.target.value})}
                fullWidth
              />
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Employee/Manager</InputLabel>
              <Select
                className={classes.selection}
                value={age}
                onChange={handleChange}
              >
                <option aria-label="None" value="" />
                <option value={"Employee"}>Employee</option>
                <option value={"Manager"}>Manager</option>
              </Select>
              </FormControl>
             <br></br>
              {age === "Employee" ? 
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                className={classes.selection}
                value={aged}
                onChange={handledChange}
              >
                <option aria-label="None" value="" />
                <option value={"Finance"}>Finance</option>
                <option value={"Marketing"}>Marketing</option>
                <option value={"Technical"}>Technical</option>
                <option value={"Production"}>Production</option>
                <option value={"Research and Development"}>Research and Development</option>
                <option value={"Purchasing"}>Purchasing</option>
              </Select>
              </FormControl> :
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Salary</InputLabel>
              <Select
                className={classes.selection}
                value={salary}
                onChange={handleChanged}
              >
                <option aria-label="None" value="" />
                <option value={5000}>5000</option>
                <option value={5500}>5500</option>
                <option value={6000}>6000</option>
                <option value={6500}>6500</option>
                <option value={7000}>7000</option>
                <option value={7500}>7500</option>
                <option value={8000}>8000</option>
                <option value={8500}>8500</option>
                <option value={9000}>9000</option>
                <option value={9500}>9500</option>
                <option value={10000}>10000</option>
              </Select>
            </FormControl>}
              <br></br> 
              {age === "Employee" || age === "Manager"? 
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Salary</InputLabel>
              <Select
                className={classes.selection}
                value={salary}
                onChange={handleChanged}
              >
                <option aria-label="None" value="" />
                <option value={1000}>1000</option>
                <option value={1500}>1500</option>
                <option value={2000}>2000</option>
                <option value={2500}>2500</option>
                <option value={3000}>3000</option>
                <option value={3500}>3500</option>
                <option value={4000}>4000</option>
                <option value={4500}>4500</option>
                <option value={5000}>5000</option>
                <option value={5500}>5500</option>
                <option value={6000}>6000</option>
              </Select>
            </FormControl> :null}
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
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(list.EmployeeID)}>
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
                    Are you sure you want to delete this profile?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose2} color="primary">
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
              <StyledTableCell align="left" style={{width:100}}>{list.Salary}</StyledTableCell>
              <StyledTableCell align="left" style={{width:100}}>{list.Rewards.items[0].RewardPoints}</StyledTableCell>
              </StyledTableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
      </div>
  )
}
