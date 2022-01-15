import axios from "axios"
import { useEffect,useState } from "react"
export default function Delete(){
    const [albums,setAlbums] = useState([])
    const [artist,setArtist] = useState({})
    const [name,setName] = useState("")
    useEffect(()=>{
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
        console.log(data)
        setAlbums(data.data)
    }

    async function deleteAlbum(){
        let data = await axios.delete(`http://localhost:3001/album/album/${name}`)
        if(data.status==201){
            alert("Deleted Successfully")
        }else{
            alert("Some error occured.")
        }
    }
    return(
        <div style={{width:"20%",display:"flex",flexDirection:"column",margin:"auto"}}>
            <h1>Delete Album</h1>
            <label>Album Name</label>
            <br></br>
            <input type="text" value={name} name="name" onChange={(e)=>{setName(e.target.value)}} placeholder="Album Name"></input>
            <br></br>
            <button onClick={deleteAlbum}>Delete</button>
            {albums.length==0?<h1>No Data....</h1>:<div>
        <h1 style={{marginLeft:"130px",fontWeight:100,textDecoration:"underline"}}>Albums</h1>
        {albums.map((e)=>{
            return(
                <div key={e.name}>
                    <img src={e.image} alt={e.name}></img>
                    <h3>{e.name}</h3>
                    <ol>
                        {e.songs.map((f)=>{
                            return(
                                <div>
                                <li>
                                    <div>
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
        </div>}
        </div>
    )
}