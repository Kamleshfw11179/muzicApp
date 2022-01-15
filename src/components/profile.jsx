import styles from "./profile.module.css"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function Profile(){
    const navigate = useNavigate()
    const [state,setState] = useState("details")
    const [albums,setAlbums] = useState([])
    const [artist,setArtist] = useState({})
    useEffect(()=>{
        let token = localStorage.getItem("artistKey")
        token = JSON.parse(token)
        if(token==null||token==undefined){
            navigate("/verify")
        }
        getId()
    },[])
    function getId(){
        let id = localStorage.getItem("artistKey")
        id = JSON.parse(id)
        getData(id)
        
    }
    async function getData(id){
        let data = await axios.get(`http://localhost:3001/artist/id/${id}`)
        setArtist(data.data)
        getSongs(data.data.name)
    }
    async function getSongs(artist){
        let data = await  axios.get(`http://localhost:3001/album/artistname/${artist}`)
        setAlbums(data.data)
    }
    function logOut(){
        let data = localStorage.setItem("artistKey",JSON.stringify(null))
        navigate("/")
    }
    return(
        <>
        <div>
            <div className={styles.main1p}>
                <button onClick={()=>{navigate("/update")}}>Change Details</button>
                <button onClick={()=>{navigate("/add")}}>Add Albums</button>
                <button onClick={()=>{navigate("/delete")}}>Delete Albums</button>
                <button onClick={logOut}>Log Out</button>
            </div>
        </div>
        {state=="details"?artist.name?
        <>
        <div className={styles.info}>
            <img src={artist.image}></img>
            <div className={styles.info1}>
            <h3>Name: {artist.name}</h3>
            <h3>Email: {artist.email}</h3>
            </div>
        </div>
        <div>
        <h1 style={{marginLeft:"130px",fontWeight:100,textDecoration:"underline"}}>Albums</h1>
        {albums.map((e)=>{
            return(
                <div className={styles.artAlb} key={e.name}>
                    <img src={e.image} alt={e.name}></img>
                    <h3>{e.name}</h3>
                    <ol>
                        {e.songs.map((f)=>{
                            return(
                                <div className={styles.infos}>
                                <li>
                                    <div className={styles.songl}>
                                    <div>
                                        <p>Name: {f.name}</p>
                                        </div>
                                        <p>Time: {f.duration} secs</p>
                                    </div>
                                </li>
                                </div>
                            )
                        })}
                    </ol>
                </div>
            )
        })}
        </div>
        </>:<h1>"Loading..."</h1>:<div></div>}
        </>
    )
}