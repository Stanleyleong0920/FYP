import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';
import Link from '@material-ui/core/Link';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { resetPassword, signIn } from '../graphql/mutations'

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
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgetPassword, setForgetPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deliver, setDeliver] = useState(false);
  const [number, setNumber] = useState('');
  const [alert, setAlert] = useState({
    messageBody: '',
    title: "error",
    show: false
  })
  const [mistake, setMistake] = useState({ cognito: null, blankfield: false })

  useEffect(() => {
    const additionalConfiguration = {
      aws_appsync_authenticationType: 'API_KEY'
    }
    Amplify.configure({ ...additionalConfiguration })
  }, [])

  function handleChangeUsername(event) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value)
  }

  function handleType(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (deliver === true) {
        settleForgotPassword()
      } else {
        settleLogin()
      }
    }
  }

  async function settleForgotPassword() {
    setAlert({title:'error',messageBody:'',show:false})
    setPassword('')
    setConfirmPassword('')
    setNumber('')
    if (username) {
      try {
        let params = {
          username: username.toLowerCase(),
          isSendCode: true
        }
        const res = await API.graphql(graphqlOperation(resetPassword, params))
        if (res.data.resetPassword.statusCode !== 200) {
          setMistake({ ...mistake, blankfield: false })
          if (res.data.resetPassword.statusCode === 400) {
            setAlert({title:'error',messageBody:'Exceeding Attempt Limits! Please try again after some time.',show:true})
          } else if (res.data.resetPassword.statusCode === 500) {
            setAlert({title:'error',messageBody:'Please call the administrator for guidance.',show:true})
          } else {
            setAlert({title:'error',messageBody:'User does not exist!',show:true})
          }
          setForgetPassword(false)
          setTimeout(()=>{setAlert({show:false})},1000)
        } else {
          setMistake({ ...mistake, blankfield: true })
          setAlert({title:'success',messageBody:'The temporary code has sent to your email. Please reset the password with the newest temporary code.',show:true})
          setTimeout(() => {
            setDeliver(false)
            setAlert({show:false})
            setForgetPassword(true)
          }, 2000)
        }
      } catch (error) {
        setAlert({title:'error',messageBody:error.message,show:true})
        let err = null
        !error.message ? (err = { title:'error',message: error }) : (err = error)
        setMistake({ ...mistake, cognito: err, blankfield: false })
      }
    } else {
      setMistake({ ...mistake, blankfield: false })
      setAlert({title:'error',messageBody:'Email fields are required to be filled in order to do the forgot password action.',show:true})
      setTimeout(()=>{setAlert({show:false})},1000)
    }
  }

  async function settleLogin(){
    setAlert({show:false})
    if (username && password) {
      try {
        if (forgetPassword === false) {
          const user = await Auth.signIn(username.toLowerCase(), password)
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            await Auth.completeNewPassword(user, password)
          }
          let params={
            email: user.username
          }
          const res = await API.graphql(graphqlOperation(signIn, params))
          if (res.data.signIn.statusCode === 200){
            setAlert({title:'success',messageBody:'Log In Successfully! Welcome Manager!',show:true})
            setTimeout(() => {  
              setAlert({show:false}) 
              props.history.push('/view-performanceM')}
              ,2000);
          }
          else if (res.data.signIn.statusCode === 201){
            setAlert({title:'success',messageBody:'Log In Successfully! Welcome Employee!',show:true})
            setTimeout(() => {  
              setAlert({show:false}) 
              props.history.push('/view-performanceE') }
              ,2000);
            
          }
          else if (res.data.signIn.statusCode === 202){
            setAlert({title:'success',messageBody:'Log In Successfully! Welcome Admin!',show:true})
            setTimeout(() => {  
              setAlert({show:false}) 
              props.history.push('/view-managers') }
              ,2000);
          } 
        } else {
          if (password.length < 7) {
            setMistake({ ...mistake, blankfield: false })
            setAlert({title:'error',messageBody:'Password must contains at least 8 characters.',show:true})
          } else {
            if(password !== confirmPassword){
              setAlert({title:'error',messageBody:'Password Fields not the same!',show:true})
            }
            else{
              let params = {
                username: username.toLowerCase(),
                password: password,
                code: number
              }
              const res = await API.graphql(graphqlOperation(resetPassword, params))
              if (res.data.resetPassword.statusCode === 200) {
                setForgetPassword(false)
                setPassword('')
                setTimeout(() => {
                  setMistake({ ...mistake, blankfield: true })
                  setAlert({title:'success',messageBody:'Success! Successful reset password.',show:true})
                  setTimeout(()=>{setAlert({show:false})},1000)
                }, 2000)
              } else {
                setMistake({ ...mistake, blankfield: false })
                setAlert({title:'error',messageBody:'The code may be outdated and invalid, please request another code again.',show:true})
                setTimeout(()=>{setAlert({show:false})},1000)
              }
            }
            setTimeout(()=>{setAlert({show:false})},1000)
          }
        }
      } catch (error) {
        setAlert({title:'error',messageBody:error.message,show:true})
        let err = null
        !error.message ? (err = { title:'error',message: error }) : (err = error)
        setMistake({ ...mistake, cognito: err, blankfield: false })
        if (error.code === 'PasswordResetRequiredException') {
          setForgetPassword(true)
          setNumber('')
          setPassword('')
        }
      }
    } else {
      setMistake({ ...mistake, blankfield: false })
      setAlert({title:'error',messageBody:'All fields are required to be filled.',show:true})
      setTimeout(()=>{setAlert({show:false})},1000)
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography display='inline' component="h1">
        Employee Performance Management System</Typography>
        <Typography display='inline' component="h1" variant="h5">
        {forgetPassword || deliver ? `Forgot Password` : `Login Screen`}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={username}
            onChange={handleChangeUsername}
            onKeyPress={handleType}
          />
          {forgetPassword === true ? (
              <TextField
                variant="outlined"
                margin="normal"
                label="Verification Code"
                fullWidth
                required
                autoFocus
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            ) : null}
          {deliver === false ? <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
            onKeyPress={handleType}
          /> : null}
          {forgetPassword === true ? <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="Confirm Password"
              value={confirmPassword}
              onKeyPress={handleType}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /> : null }
          {alert.show ?<Alert severity={alert.title === 'success' ? "success" : "error"}>
            <AlertTitle><strong>{alert.title}</strong></AlertTitle>
            <strong>{alert.messageBody}</strong>
            </Alert> : null}
          <Grid container>
              <Grid 
                justify="flex-end"
                item xs>
              <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={deliver === true ? settleForgotPassword : settleLogin}>
                  {deliver === true || forgetPassword === true ? 'Submit' : 'Sign in'}
              </Button>
              </Grid>
              <Grid>
                {deliver === true || forgetPassword === true ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.submit}
                      onClick={() =>
                        setDeliver(
                          false,
                          setUsername(''),
                          setPassword(''),
                          setNumber(''),
                          setAlert({show:false}),
                          setForgetPassword(false)
                        )
                      }>
                      {forgetPassword === true ? 'Cancel': 'Return to Login Screen'}
                    </Button>
                  ) : null}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
              {forgetPassword === true ? (
                  <Link href="#" variant="body2" onClick={settleForgotPassword}>
                    Resend the code?
                  </Link>
                ) : deliver === false ? (
                  <Link href="#" variant="body2" onClick={() => setDeliver(true, setAlert({show:false}), setUsername(''))}>
                    Forgot password?
                  </Link>
                ) : null}
                </Grid>
            </Grid>
          </form>
        </div>
    </Container>
  );
}