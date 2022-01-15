import { useEffect,useState } from "react"
import styles from "./album.module.css"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
export default function Home(){
    const navigate = useNavigate()
    const [count,setCount] = useState(1)
    const [total,setTotal] = useState(0)
    useEffect(()=>{
        getData(count)
        getTotal()
    },[])
    const [datas,setDatas] = useState([])
  
    // const [inp,setInp] = useState("")
    function handleKey(){
        let data = localStorage.getItem("artistKey")
        data = JSON.parse(data)
        if(data==undefined){
            localStorage.setItem("artistKey",JSON.stringify(null))
        }
        localStorage.setItem("userKey",JSON.stringify(null))
    }
    handleKey()
    async function getData(count){
        let data = await axios.get(`http://localhost:3001/album/${count}`)
        setDatas(data.data)
    }
    async function getTotal(){
        let data = await axios.get("http://localhost:3001/album/total/count")
        setTotal(Math.round(Number(data.data.count)/8))
    }
   async function handleOption(e){
        let rd = e.target.value
        let data = await axios.get(`http://localhost:3001/album/year/${rd}`)
        setDatas(data.data)
        setTotal(Math.ceil(data.data.length/8))
    }
    const handleInpt = async(e)=>{
        let data = await axios.get(`http://localhost:3001/album/name/${e}`)
        setDatas(data.data)
        setTotal(Math.ceil(data.data.length/8))
    }
    async function handleOption2(e){
        let gen = e.target.value
        let data = await axios.get(`http://localhost:3001/album/genre/${gen}`)
        setDatas(data.data)
        setTotal(Math.ceil(data.data.length/8))
    }

   function inputHandler(e){
       const gett = () =>{
           setTimeout(()=>{
               handleInpt(e)
           },500)
       }
       gett()
    }

    function handleIncrese(){
        if(count+1>total){
            return
        }
        setCount(count+1)
        getData(count+1)
    }
    function handleDecrease(){
        if(count-1<1){
            return
        }
        setCount(count-1)
        getData(count-1)
    }

    function handleSort(e){
        let val = e.target.value
        if(val=="low"){
           let obj = {}
           let arr = []
           for(var i=0;i<datas.length;i++){
               obj[datas[i].release_date] = datas[i];
               arr.push(datas[i].release_date)
           }
           arr = arr.sort((a,b)=>{return a-b})
           let arr2 = []
           for(var j=0;j<arr.length;j++){
               arr2.push(obj[arr[j]])
           }
           setDatas(arr2)
        }else{
            let obj = {}
           let arr = []
           for(var i=0;i<datas.length;i++){
               obj[datas[i].release_date] = datas[i];
               arr.push(datas[i].release_date)
           }
           arr = arr.sort((a,b)=>{return b-a})
           let arr2 = []
           for(var j=0;j<arr.length;j++){
               arr2.push(obj[arr[j]])
           }
           setDatas(arr2)
        }
    }
   
    return(
        <>
        <div className={styles.filter}>
            <div className={styles.filter1}>
                <input onChange={(e)=>inputHandler(e.target.value)} placeholder="Please enter album name."></input>
            </div>
            <div  className={styles.filter2}>
                <select onChange={handleOption}>
                <option value="1999">1999</option>
                <option value="2004">2004</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2011">2011</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                </select>
            </div>
            <div  className={styles.filter3}>
                <select onChange={handleOption2}>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Rock">Rock</option>
                <option value="Jazz">Jazz</option>
                <option value="Lo-Fi">Lo-Fi</option>
                <option value="Rap">Rap</option>
                </select>
            </div>
            <div  className={styles.filter3} onChange={handleSort}>
                <select>
                <option value="low">Low - High</option>
                <option value="high">High - Lows</option>
                </select>
            </div>
        </div>
            <div>
            {datas.length?<div className={styles.main}>{datas.map((e)=>{return(
                <div key={e.name} className={styles.block} onClick={()=>{navigate(`/${e.name}`)}}>
                <img src={e.image} alt={e.name}></img>
                <div className={styles.info}>
                    <h3>{e.name}</h3>
                    <h5>Artist: {e.artist.name}</h5>
                    <p>Songs: {e.total_songs}</p>
                    <p>Genre: {e.genre}</p>
                    <p>Release Date: {e.release_date}</p>
                    </div>
                </div>
            )})}</div>:<h1 style={{fontWeight:100,marginLeft:"45%"}}>No Data</h1>}
            </div>
            <div className={styles.controls}>
                <button onClick={handleDecrease}>{count==1?"End":"Prev"}</button>
                <p>Page {count} of {total}</p>
                <button onClick={handleIncrese}>{count==3?"End":"Next"}</button>
            </div>
        </>
    )
}