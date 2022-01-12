import EmployeePage from './EmployeePage'
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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { listUsers } from '../../customQueries'
import { API, graphqlOperation, Auth} from 'aws-amplify'
import Button from '@material-ui/core/Button';
import { listGoals,getRatings,getGoal } from '../../graphql/queries'

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
  const [goals,setGoals] = useState([])
  const [fblist, setFbList] = useState([])
  const [id,setId] = useState([])
  const [fullWidth, setFullWidth] = useState(true);
  const [ratings, setRatings] = useState([])
  const [maxWidth, setMaxWidth] = useState('sm');
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const handleClickOpen = (id) => {
    setId(id)
    async function fetchData() {
      let res = await API.graphql(graphqlOperation(getRatings, {RatingID: id}))
      let resp = res.data.getRatings
      setRatings(resp)
    }
    fetchData()
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setId([])
    setRatings([])
  };

  const handleClickOpen2 = (id) => {
    setId(id)
    async function fetchData() {
      let res = await API.graphql(graphqlOperation(getGoal, {GoalID: id}))
      let resp = res.data.getGoal.Feedback.items
      if(resp){
        resp = resp.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
        setFbList(resp)
      }
    }
    fetchData()
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
      fetchGoals(res.data.listUsers.items[0].EmployeeID)
    }
  }
  
  async function fetchGoals(id){
    let res = await API.graphql(
      graphqlOperation(listGoals, { filter: { EmployeeID: { eq: id }, Status: {eq:"Rating Completed"}}})
    )
    if (res.data.listGoals.items.length > 0){
      setGoals(res.data.listGoals.items)
    }
  }

  return(
    <div>
    <EmployeePage></EmployeePage>
    <Typography component="h1" variant="h4" className={classes.title}>
    View Goals
    </Typography>
    <Typography component="h1" variant="h6">
    Rating Completed Goals
    </Typography>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Assigned to Employee</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Assigned From</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Goal Description</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Status</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal)=> (
            <StyledTableRow key={goal.id}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen(goal.GoalID)}>
              View Ratings
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">Ratings</DialogTitle>
            <DialogContent>
            <TableContainer component={Paper} className={classes.bottom}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                <StyledTableCell align="left" style={{width:100}}>Responsibility</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>Personality</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>Punctuality</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>Hardworking</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>Activeness</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>Feedback</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <StyledTableRow key={ratings.id}>
                <StyledTableCell align="left" style={{width:100}}>{ratings.Responsibility}</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>{ratings.Personality}</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>{ratings.Punctuality}</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>{ratings.Hardworking}</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>{ratings.Activeness}</StyledTableCell>
                <StyledTableCell align="left" style={{width:100}}>{ratings.Feedback}</StyledTableCell>
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
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => handleClickOpen2(goal.GoalID)}>
              View Feedbacks
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open2}
              onClose={handleClose2}
              aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">Feedbacks</DialogTitle>
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
                <Button onClick={handleClose2} color="primary">
                  Cancel
                </Button>
              </DialogActions>
              </Dialog>
              <StyledTableCell align="left"style={{width:100}}>{goal.ManagerName}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{goal.EmployeeName}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{goal.GoalDescription}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{goal.Status}</StyledTableCell>
            </StyledTableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
    </div>
  )
}