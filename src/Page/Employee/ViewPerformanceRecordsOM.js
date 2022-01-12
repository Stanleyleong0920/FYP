import EmployeePage from './EmployeePage'
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { listUsers } from '../../customQueries'
import { listRatingss } from '../../graphql/queries'
import { API, graphqlOperation, Auth} from 'aws-amplify'

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
    bottom: {
      color: 'red',
      width:'1000',
    }
  }));

export default function ViewPerformanceRecordsOM(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [lists,setLists] = useState([])
  const [ratings, setRatings] = useState([])
  const [id, setId] = useState([])
  const [open, setOpen] = useState(false)
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id)
    async function fetchRatings(id){
      let res = await API.graphql(
        graphqlOperation(listRatingss, { filter: { ReceiverID: {eq: id}}})
      )
      if(res.data.listRatingss.items.length > 0){
        setRatings(res.data.listRatingss.items)
      }
    }
    fetchRatings(id)
  };

  const handleClose = () => {
    setOpen(false);
    setId([])
    setRatings([])
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
    }
  }

  async function fetchUser(department){
    let res = await API.graphql(
      graphqlOperation(listUsers, { filter: { Identity: { eq: 'Manager' } , Department:{ eq:department } }})
    )
    if (res.data.listUsers.items){
      setLists(res.data.listUsers.items)
    }
  }

  return(
      <div>
      <EmployeePage></EmployeePage>
      <Typography component="h1" variant="h4" className={classes.title}>
      View Managers' Performance Records
      </Typography>
      <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Operation</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Name</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Email</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {lists.map((list) => (
            <StyledTableRow key={list.id}>
            <StyledTableCell align="left" style={{width:100}}>
            <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={()=>handleClickOpen(list.EmployeeID)}>
            View Records
          </Button>
          <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Performance Records</DialogTitle>
            <DialogContent>
            <TableContainer component={Paper} className={classes.bottom}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
            <StyledTableCell align="left"style={{width:100}}>Punctuality</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Responsibility</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Activeness</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Personality</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Hardworking</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Comments</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Rater</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Identity</StyledTableCell>
            <StyledTableCell align="left"style={{width:100}}>Type</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {ratings.map((rating)=>(
                <StyledTableRow key={rating.id}>
                <StyledTableCell align="left"style={{width:100}}>{rating.Punctuality}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{rating.Responsibility}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{rating.Activeness}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{rating.Personality}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{rating.Hardworking}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{rating.Feedback}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{rating.RaterName}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{rating.RaterIdentity}</StyledTableCell>
                <StyledTableCell align="left"style={{width:100}}>{rating.Type}</StyledTableCell>
                </StyledTableRow>
            ))}
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
          </StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{list.Name}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{list.Email}</StyledTableCell>
            </StyledTableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
      </div>
  )
}