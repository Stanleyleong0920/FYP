import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';
import { API, graphqlOperation } from 'aws-amplify'
import { signUp } from '../graphql/mutations'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selection:{
    width:'320%'
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [user, setUser] = useState({
    email:'',
    password:'',
    fullName:'',
    address:'',
    confirmPassword:''
  });
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


  const [alert, setAlert] = useState({
    messageBody: '',
    title:"success",
    show: false
  })

  async function handleCreate() {
    var Salary = 0
    try{
      if ((age && user.password.length > 7 && user.confirmPassword.length > 7 && user.fullName.length > 10 && user.address.length > 10) 
      || (age && aged && user.password.length > 7 && user.confirmPassword.length > 7 && user.fullName.length > 10 && user.address.length > 10) 
      || (age && aged && salary && user.password.length > 7 && user.confirmPassword.length > 7 && user.fullName.length > 10 && user.address.length > 10)) {
        if(salary !== 0){
          Salary = salary
        }
        if(user.email.includes("mail") && user.email.includes(".com") && user.email.includes("@")){
          let params = {
            username: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            address: user.address,
            fullName: user.fullName,
            department: aged,
            salary: Salary,
            identity: age
          }
          if (params.password !== params.confirmPassword){
            setAlert({show:true,title: "error",messageBody:"Password fields not the same!"})
            setTimeout(() => {  setAlert({show:false}) }, 1000);
          }
          else{
            const res = await API.graphql(graphqlOperation(signUp, params))
            if (res.data.signUp.statusCode === 200) {
              setAlert({show:true,title: "success",messageBody:"Successfully add user!"})
              setTimeout(() => {  handleClear() }, 1000);
            }
            else if (res.data.signUp.statusCode === 401){
              setAlert({show:true,title: "error",messageBody:"Email is duplicated!"})
              setTimeout(() => {  setAlert({show:false}) }, 1000);
            }
          } 
        }
        else{
          setAlert({show:true,title: "error",messageBody:"Email format is invalid!"})
          setTimeout(() => {  setAlert({show:false}) }, 1000);
        }
      } else {
      setAlert({show:true,title: "error",messageBody:"Please fill up all fields with required word length! Address and Full name must be more than 10 characters, Password must be more than 7 characters!"})
      setTimeout(() => {  setAlert({show:false}) }, 1000);
    }
  } catch (err) {
      console.log('Error: ', err)
  }
}

  async function handleClear(){
    setUser({
      email:'',
      password:'',
      fullName:'',
      address:'',
      confirmPassword:''
    })
    setAge('')
    setAged('')
    setSalary(0)
    setAlert({show:false})
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add user
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Full Name"
                label="Full Name"
                name="Full Name"
                autoComplete="Full Name"
                helperText={user.fullName? 'Full Name is required' : null}
                value={user.fullName}
                onChange={(e) => setUser({...user,fullName:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={user.email? 'Email is required' : null}
                value={user.email}
                onChange={(e) => setUser({...user,email:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Address"
                label="Address"
                type="Address"
                id="Address"
                autoComplete="Address"
                helperText={user.address? 'Address is required' : null}
                value={user.address}
                onChange={(e) => setUser({...user,address:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={user.password? 'Password is required' : null}
                value={user.password}
                onChange={(e) => setUser({...user,password:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Confirm Password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={user.confirmPassword? 'Confirm Password is required' : null}
                value={user.confirmPassword}
                onChange={(e) => setUser({...user,confirmPassword:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Employee/Manager/Admin</InputLabel>
              <Select
                className={classes.selection}
                value={age}
                onChange={handleChange}
              >
                <option aria-label="None" value="" />
                <option value={"Employee"}>Employee</option>
                <option value={"Manager"}>Manager</option>
                <option value={"Admin"}>Admin</option>
              </Select>
            </FormControl>
            </Grid>
            {age === "Employee" || age === "Manager" ? <Grid item xs={12}>
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
            </FormControl> 
            </Grid>: <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                className={classes.selection}
                value={aged}
                onChange={handledChange}
              >
                <option aria-label="None" value="" />
                <option value={"Admin"}>Admin</option>
              </Select>
            </FormControl> 
            </Grid>}
            {age !== "Admin" ? age === "Employee" ? <Grid item xs={12}>
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
            </FormControl> 
            </Grid>:<Grid item xs={12}> 
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
            </FormControl>
            </Grid>
             : null}
          </Grid> 
          <div>
          {alert.show ? <Alert severity={alert.title === "success" ? "success" : "error"}>
                    <AlertTitle><strong>{alert.title}</strong></AlertTitle>
                    <strong>{alert.messageBody}</strong>
                    </Alert> : null}
                    </div>
        <Grid container spacing={0}>
          <Button
            onClick = {()=>handleClear()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Clear
          </Button>
          <Button
            onClick = {()=>handleCreate()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add User
          </Button>
          </Grid>
          <Grid item>
            <Link href="/view-managers" variant="body2">
              {"Back to Admin Page"}
            </Link>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}