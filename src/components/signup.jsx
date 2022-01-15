import styles from "./signup.module.css"
import { useState } from "react"
import axios from "axios"
export default function Signup({change}){
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        image:""
    })
    function handleChange(e){
        let name = e.target.name
        let value = e.target.value;
        setData({...data,[name]:value})
    }

    async function handleSignup(){
        try{
        let resp = await axios.post("http://localhost:3001/signup",data)
        localStorage.setItem("artistKey",JSON.stringify(resp.data.id))
        alert(resp.data.message)
        change(true)
        }catch(err){
            alert(err)
        }
    }
    return(
        <>
            <div className={styles.mainSu}>
                <label>User Name</label>
                <input name="name" value={data.name} placeholder="username" onChange={handleChange}></input>
                <label>Email</label>
                <input name="email" value={data.email} placeholder="email" onChange={handleChange}></input>
                <label>Password</label>
                <input name="password" value={data.password} type="password" placeholder="password" onChange={handleChange}></input>
                <label>image</label>
                <input name="image" value={data.image} type="text" placeholder="image url" onChange={handleChange}></input>
                <button onClick={handleSignup}>Sign Up</button>
            </div>
        </>
    )
}