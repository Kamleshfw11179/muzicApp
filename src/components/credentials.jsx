import Login from "./login";
import Signup from "./signup";
import styles from "./credentials.module.css"
import { useState } from "react";
export default function Credentials(){
    const [state,setState] = useState(false)
    return(
        <>
        <div className={styles.maincb}>
        <div className={styles.maincb1}>
            <button onClick={()=>{setState(true)}}>Login</button>
            <button onClick={()=>{setState(false)}}>Signup</button>
        </div>
        <div className={styles.maincb2}>
        {state?<div><Login /></div>:<Signup change={setState}/>}
        </div>
        </div>
        </>
    )
}