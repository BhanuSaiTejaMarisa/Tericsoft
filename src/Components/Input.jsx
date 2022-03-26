import axios from "axios";
import React from "react"


const initState={
    name:"",
    email:"",
    phone:"",
    dob:"",
    gender:"",
    hobbies:""
}
export default function Input(){

    const[data,setData]=React.useState(initState);
    

    function handleChange(e){
        e.preventDefault();
        const {name,value}=e.target
        // if (e.target.type==="checkbox"){
        //     e.target.name==="checked";
        //     console.log(e.target.value);
        // }
        setData({...data,[name]:value})
        // console.log(data);
    }
    function getData(props){
        axios.get("https://json-server-bhanu.herokuapp.com/employees")
        .then(res=>{
          console.log(res.data);
          setData(res.data);
        })
        .catch(err=>{
          console.log(err);
          
        })
        .finally(()=>{
          
        })
      }

    function handleClick(){
        console.log(data);
    }
    function postData(){
        axios.post("https://json-server-bhanu.herokuapp.com/employees",data)
        .then(res=>{
            console.log(res);
            getData();
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{

        })
    }
return <>
<input type="text" name="name" onChange={handleChange} /> Name
<input type="text" name="email" onChange={handleChange} /> Email
<input type="text" name="phone" onChange={handleChange} /> Phone
<input type="date" name="dob" onChange={handleChange}  id="" /> Date
<div>
    <p>Select Gender: </p>
<input type="radio" onChange={handleChange}  name="gender" id="" value="Male"/> Male
<input type="radio" onChange={handleChange}  name="gender" id="" value="Female"/> Female
<input type="radio" onChange={handleChange}  name="gender" id="" value="Other"/> Other
</div>
<div><p>Your fav hobbies: </p>
<input type="checkbox" onChange={handleChange}  name="hobbies" id="" value="Cricket"/> Cricket
<input type="checkbox" onChange={handleChange}  name="hobbies" id="" value="Painting"/> Painting
<input type="checkbox" onChange={handleChange}  name="hobbies" id="" value="Watching Movies"/> Watching Movies
<input type="checkbox" onChange={handleChange}  name="hobbies" id="" value="Reading Novels"/> Reading Novels
</div>
<button onClick={postData} >Add Data</button>
<button onClick={getData}>Refresh</button>
{/* postClick={postClick} */}





</>

}
