import * as React from 'react';
import axios from "axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "../styles.css";

export default function BasicTable() {

  const [data,setData]=React.useState("");
  const [isLoading,setIsLoading]=React.useState(true);
  const [isError,setIsError]=React.useState(false);
  const [modal,setModal]=React.useState(false);

  React.useEffect(()=>{
    getData();
  },[]);

  function getData(){
    setIsLoading(true);
    
    axios.get("https://fake-json-server-bhanu.herokuapp.com//employees")
    .then(res=>{
      console.log(res.data);
      setData(res.data);
    })
    .catch(err=>{
      console.log(err);
      setIsError(true)
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  function updateData(id,e){
    setModal(true);
    console.log(modal);
    e.stopPropagation()

  }
  function deleteData(id){
    setIsLoading(true)
    axios.delete(`https://fake-json-server-bhanu.herokuapp.com/employees/${id}`)
    .then(res=>{
      console.log(res);
      getData();
    })
    .catch(err=>{
      console.log(err);
      setIsError(true);

    })
    .finally(()=>{
      setIsLoading(false)
    })
  }

  return <>
  <div onClick={(e)=>{setModal(false);
  e.stopPropagation()}}>
    {
      isLoading?
      <div>...Loading</div>:
      isError?
      <div>...Error</div>:
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone&nbsp;(+91)</TableCell>
            <TableCell align="center">DOB</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Hobbies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>

              <TableCell align="center">{row.dob}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.hobbies}</TableCell>
              <TableCell align="center"><button onClick={(e)=>{updateData(row.id,e)}}>Update</button></TableCell>
              <TableCell align="center"><button onClick={()=>{deleteData(row.id)}}>Delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }</div>
    { modal &&
    <div id="modal" style={{width:"100px",height:"200px",position:"absolute",left:"500px",top:"40vh", zindex:"1",border :"solid 0.5px black"}}>
    <h1>ABC</h1>
    <button onClick={()=>setModal(false)}>close</button>
    </div>}
    </>
}
