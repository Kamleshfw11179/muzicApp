import Home from "./components/Home"
import Nav from "./components/nav"
import Songs from "./components/Songs"
import Credentials from "./components/credentials"
import Profile from "./components/profile"
import Update from "./components/update"
import Delete from "./components/Delete"
import Add from "./components/Add"
import {Routes,Route} from "react-router-dom"
export default function App(){
  return(
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<Songs />}></Route>
        <Route path="/verify" element={<Credentials />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/update" element={<Update />}></Route>
        <Route path="/delete" element={<Delete />}></Route>
        <Route path="/add" element={<Add />}></Route>
      </Routes>
    </div>
  )
}