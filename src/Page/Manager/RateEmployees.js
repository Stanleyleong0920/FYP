import ManagerPage from './ManagerPage'
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
import { API, graphqlOperation, Auth} from 'aws-amplify'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import { listUsers } from '../../graphql/queries'
import { submitRating } from '../../graphql/mutations'
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
  title:{
    marginTop: '10px'
  }
}));

export default function RateEmployees(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [lists,setLists] = useState([])
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [id, setId] = useState([])
  const [name, setName] = useState([])
  const [identity, setIdentity] = useState([])
  const [department, setDepartment] = useState([])
  const [alert, setAlert] = useState({
    messageBody: '',
    title: 'success',
    show: false
  })
  const [review, setReview] = useState({
    punctuality: 0,
    responsibility: 0,
    hardworking: 0,
    personality: 0,
    activeness: 0,
    feedback: ""
  })
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');

  const handleClickOpen = (id,name,department,identity) => {
    setOpen(true);
    setId(id)
    setName(name)
    setDepartment(department)
    setIdentity(identity)
  };
  const handleClose = () => {
    setOpen(false);
    setId([])
    setName([])
    setDepartment([])
    setIdentity([])
    setReview({
      punctuality: 0,
      responsibility: 0,
      hardworking: 0,
      personality: 0,
      activeness: 0,
      feedback: ""
    })
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
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
      fetchEmployees(res.data.listUsers.items[0].Department)
    }
  }

  async function fetchEmployees(dep){
    let res = await API.graphql(
      graphqlOperation(listUsers, { filter: { Identity:{eq: "Employee"}, Department: { eq: dep }}})
    )
    if(res.data.listUsers.items.length > 0){
      setLists(res.data.listUsers.items)
    }
  }

  async function handleSubmitRating(){
    try{
      if (review.punctuality && review.responsibility && review.activeness && review.hardworking && review.personality 
        && review.feedback && review.feedback.length > 5){
          const day = String(new Date().getDate()).padStart(2, '0')
          const month = String(new Date().getMonth() + 1).padStart(2, '0')
          const year = String(new Date().getFullYear())
          const time = String(new Date().getHours()).padStart(2, '0')
          + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + String(new Date().getSeconds()).padStart(2, '0') + ".000Z"
          const duedate = year + "-" + month + "-" + day + "T" + time;
          let params = {
            raterId: list.EmployeeID,
            raterName: list.Name,
            raterIdentity: list.Identity,
            raterDepartment: list.Department,
            punctuality: review.punctuality,
            responsibility: review.responsibility,
            activeness: review.activeness,
            hardworking: review.hardworking,
            personality: review.personality,
            feedback: review.feedback,
            dueDate: duedate,
            receiverId: id,
            receiverName: name,
            receiverIdentity: identity,
            receiverDepartment: department,
            type: "Normal Rating"
          }
          let res = await API.graphql(graphqlOperation(submitRating, params))
          if(res.data.submitRating.statusCode === 200){
            setAlert({show:true, title:"success", messageBody:"Rating Submitted Successfully!"})
          }
          else if (res.data.submitRating.statusCode === 201){
            setAlert({show:true, title:"error", messageBody:"You have rated this employee this one week before! Please wait few days/one week to submit again!"})
            setTimeout(() => {  setAlert({show:false}) }, 1000);
          }
          else{
            setAlert({show:true, title:"error", messageBody:"Invalid Input!"})
            setTimeout(() => {  setAlert({show:false}) }, 1000);
          }
        setOpen2(false)
        setOpen(false)
        setReview({
          punctuality: 0,
          responsibility: 0,
          hardworking: 0,
          personality: 0,
          activeness: 0,
          feedback: ""
        })
        setTimeout(() => {  clearMessage() }, 1000);
        }
      else{
        setAlert({show:true, title: "error", messageBody:"Please filled up all fields/The length of feedback is not enough!"})
        setOpen2(false)
        setOpen(false)
        setReview({
          punctuality: 0,
          responsibility: 0,
          hardworking: 0,
          personality: 0,
          activeness: 0,
          feedback: ""
        })
        setTimeout(() => {  setAlert({show:false}) }, 1000);
      }
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
      Rate Employees
    </Typography>
    <br></br>
    <br></br>
    {alert.show ?<Alert severity={alert.title === 'success' ? "success" : "error"}>
    <AlertTitle><strong>{alert.title}</strong></AlertTitle>
    <strong>{alert.messageBody}</strong>
    </Alert> : null}
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Employee Name</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {lists.map((list) =>(
              <StyledTableRow key = {list.id}>
              <StyledTableCell align="left" style={{width:100}}>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(list.EmployeeID,list.Name,list.Department,list.Identity)}>
                Rate
              </Button>
              <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open}
              onClose={handleClose}
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
            *One week, one time submission, cannot be edited or deleted.
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleClickOpen2()} color="primary">
                Submit
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
                Are you sure you want to submit the rating? Cannot be changed afterwards.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleSubmitRating()} color="primary" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
              </Dialog>
            </DialogActions>
            </Dialog>
            </StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>{list.Name}</StyledTableCell>
            </StyledTableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
    </div>
  )
}
