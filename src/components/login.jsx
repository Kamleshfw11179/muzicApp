import styles from "./login.module.css"
import axios from "axios"
import { useState} from "react"
import {useNavigate} from "react-router-dom"
export default function Login(){
    const navigate = useNavigate()
    const [user,setUser] = useState({
        email:"",
        password:""
    })

    function handleChange(e){
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }

    async function getData(){
        let data = await axios.post("http://localhost:3001/login",user);
        if(data.data.status==200){
           localStorage.setItem("artistKey", JSON.stringify(data.data.userinfo._id))
           alert(data.data.message)
            navigate("/profile")
        }
    }
    return(
        <>
            <div className={styles.mainLo}>
                <label>
                    Email
                </label>
                <input name="email" value={user.email} onChange={handleChange} type="text" placeholder="email"></input>
                <label>
                    Password
                </label>
                <input name="password" value={user.password} onChange={handleChange} type="text" placeholder="password"></input>
                <button onClick={getData}>Submit</button>
            </div>
        </>
    )
}