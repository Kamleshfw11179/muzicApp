import { useState,useEffect } from "react"
import axios from "axios"
export default function Add(){
    const [album,setAlbum] = useState({
        name:"",
        image:"",
        artist:JSON.parse(localStorage.getItem("artistKey")),
        total_songs:"",
        genre:"",
        release_date:"",
        songs:[]
    })
    const [song,setSong] = useState({
        name:"",
        duration:""
    })
    function handleChange(e){
        const {name,value} = e.target;
        setSong({...song,[name]:value})
    }
    async function addSong(){
        let data = await axios.post("http://localhost:3001/song",song)
        setAlbum({...album,["songs"]:[...album.songs,data.data._id]})
        alert("Added Successfully")
    }
    function handleAlbum(e){
        const {name,value} = e.target
        setAlbum({...album,[name]:value})
    }

    async function handleUpdate(){
        let data = await axios.post("http://localhost:3001/album",album)
        console.log(data) 
    }
    return(
        <div style={{display:"flex",flexDirection:"column",margin:"auto",width:"40%"}}>
            <h1>Add Album</h1>
            <label>Name</label>
            <input type="text" value={album.name} name="name" placeholder="Album Name" onChange={handleAlbum}></input>
            <label>Image</label>
            <input type="text" value={album.image} name="image" placeholder="Album Image" onChange={handleAlbum}></input>
            <label>Total Songs</label>
            <input type="text" value={album.total_songs} name="total_songs" placeholder="Total Songs" onChange={handleAlbum}></input>
            <label>Genre</label>
            <input type="text" value={album.genre} name="genre" placeholder="Genre" onChange={handleAlbum}></input>
            <label>Release Date</label>
            <input type="text" value={album.release_date} name="release_date" placeholder="Release Date" onChange={handleAlbum}></input>
            <br/>
            <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
            <label>Add Songs</label>
            <label>Song Name</label>
            <input type="text" value={song.name} name="name" placeholder="Song Name" onChange={handleChange} style={{width:"100%"}}></input>
            <label>Song Duration</label>
            <input type="text" value={song.duration} name="duration" placeholder="Song duration" onChange={handleChange} style={{width:"100%"}}></input>
            <button onClick={addSong}>Add Song</button>
            </div>
            <br/>
            <button onClick={handleUpdate}>Update</button>
        </div>
    )
}