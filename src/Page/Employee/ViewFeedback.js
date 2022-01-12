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
import { listUsers, listFeedbacks } from '../../graphql/queries'
import { API, graphqlOperation, Auth } from 'aws-amplify'

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
  title:{
    marginTop: '10px'
  }
}));

export default function Feedback(){
  const classes = useStyles();
  const [list,setList] = useState({})
  const [datas,setDatas] = useState([])
  useEffect(() => {
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
      fetchFeedback(res.data.listUsers.items[0].EmployeeID)
    }
  }

  async function fetchFeedback(id) {
    let res = await API.graphql(
      graphqlOperation(listFeedbacks, {filter: { ReceiverID: { eq: id }}})
    )
    if (res.data.listFeedbacks.items){
      setDatas(res.data.listFeedbacks.items)
    }
  }

  return(
    <div>
    <EmployeePage></EmployeePage>
    <Typography component="h1" variant="h4" className={classes.title}>
    View Feedback from Other Employees
    </Typography>
   <br></br>
   <br></br>
    <TableContainer component={Paper} className={classes.bottom}>
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          <StyledTableCell align="left"style={{width:100}}>Feedback</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Sender</StyledTableCell>
          <StyledTableCell align="left"style={{width:100}}>Department</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {datas.map((data)=> (
            <StyledTableRow key={data.id}>
            <StyledTableCell align="left" style={{width:100}}>{data.Description}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{data.SenderName}</StyledTableCell>
            <StyledTableCell align="left" style={{width:100}}>{data.SenderDep}</StyledTableCell>
            </StyledTableRow>))}
          </TableBody>
          </Table>
          </TableContainer>
    </div>
  )
}
