import {useParams} from "react-router-dom"
import { useEffect,useState } from "react"
import styles from "./song.module.css"
import axios from "axios"
export default function Songs(){
    const {id} = useParams()
    const [datas,setDatas] = useState([])
    useEffect(()=>{
       getData(id)
    },[])

    async function getData(id){
        let data = await axios.get(`http://localhost:3001/album/name/${id}`)
        console.log(data.data)
        setDatas(data.data)
    }
    return(
       <>
       {datas.length==0?<h1>Loading.....</h1>:datas.map((e)=>{
           return(
               <div>
               <div className={styles.main1}>
                   <div className={styles.main1a}>
                       <img src={e.image} alt={e.name}></img>
                       <h2>Name :{e.name} </h2>
                       <h3>Release Date: {e.release_date}</h3>
                   </div>
                   <div className={styles.main1b}>
                       <img src={e.artist.image} alt={e.artist.name}></img>
                       <h2>{e.artist.name}</h2>
                   </div>
               </div>
               <div className={styles.sl}>
                   <ol>
                   {e.songs.map((s)=>{
                       return(
                           <li>
                               <div className={styles.sl1}>
                               <div style={{width:"40%",marginLeft:"10%"}}>
                                   <p>Name: {s.name}</p>
                                   </div>
                                   <p>Time: {s.duration} mins</p>
                               </div>
                           </li>
                       )
                   })}
                   </ol>
               </div>
               </div>
           )
       })}
       </>

    )
}