import EmployeePage from './EmployeePage'
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { API, graphqlOperation, Auth} from 'aws-amplify'
import { listUsers,listRatingss } from '../../graphql/queries'

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
}));

export default function ViewPerformanceRecords(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [lists,setLists] = useState([])

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
      fetchRatings(res.data.listUsers.items[0].EmployeeID)
    }
  }

  async function fetchRatings(id){
    let res = await API.graphql(
      graphqlOperation(listRatingss, { filter: { ReceiverID: {eq: id}}})
    )
    if(res.data.listRatingss.items.length > 0){
      setLists(res.data.listRatingss.items)
    }
  }

  return(
    <div>
    <EmployeePage></EmployeePage>
    <Typography component="h1" variant="h4" className={classes.title}>
    View Own Performance Records
    </Typography>
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
        {lists.map((list) => (
          <StyledTableRow key = {list.id}>
          <StyledTableCell align="left" style={{width:100}}>{list.Punctuality}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Responsibility}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Activeness}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Personality}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Hardworking}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Feedback}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.RaterName}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.RaterIdentity}</StyledTableCell>
          <StyledTableCell align="left" style={{width:100}}>{list.Type}</StyledTableCell>
          </StyledTableRow>
        ))}
        </TableBody>
        </Table>
        </TableContainer>
    </div>
  )
}
