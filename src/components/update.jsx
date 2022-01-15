import axios from "axios"
import {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function Update(){
    const navigate = useNavigate()
    const [user,setUser] = useState({
        name:"",
        image:"",
        email:"",
        password:"",
        _id:"",
        __v:""
    })
    useEffect(()=>{
        getData()
    },[])
    async function getData(){
        let key = localStorage.getItem("artistKey");
        key = JSON.parse(key)
        let data = await axios.get(`http://localhost:3001/artist/id/${key}`);
        setUser(data.data)
    }

    function handleChange(e){
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }

    async function updateData(){
        let key = localStorage.getItem("artistKey");
        key = JSON.parse(key)
        let data = await axios.patch(`http://localhost:3001/artist/update/${key}`,user)
        if(data.status==201){
            alert("Profile Updated")
            navigate("/profile")
        }else{
            alert("Not Updated")
        }
    }
    return(
        <>
        <div style={{width:"20%",display:"flex",flexDirection:"column",margin:"auto"}}>
            <label>Name</label>
            <input type="text" value={user.name} name="name" onChange={handleChange}></input>
            <br/>
            <label>Email</label>
            <input type="text" value={user.email} name="email" onChange={handleChange}></input>
            <br/>
            <label>Image Url</label>
            <input type="text" value={user.image} name="image" onChange={handleChange}></input>
            <br/>
            <label>Password</label>
            <input type="password" value={user.password} name="password" onChange={handleChange}></input>
            <br/>
            <button onClick={updateData}>Update</button>
        </div>
        </>
    )
}