import styles from "./nav.module.css"
import {Link} from "react-router-dom"
export default function Nav(){
    return(
        <>
            <div className={styles.nav}>
                <h3>Logo Spcae</h3>
                <div className={styles.nav1}>
                <Link to="/">Home</Link>
                <Link to="/verify">Login/Signup</Link>
                <Link to="/profile">Profile</Link>
                </div>
            </div>
        </>
    )
}