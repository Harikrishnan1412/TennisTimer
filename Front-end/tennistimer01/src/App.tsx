import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/Register';
import Navbar from './components/Navbar'
import Login from './components/Login';
import Home from './components/Home'
import Admin from './components/Admin'
import AddCourt from './components/AddCourt';
import CourtSearch from './components/CourtSearch';
import CourtView from './components/CourtView';
import { ToastContainer,toast } from "react-toastify";
import UserProfile from './components/UserProfile';
import "react-toastify/dist/ReactToastify.css";

function App() {
  
  const[username, setusername] = useState<string>('');
  const[Jwttoken,setjwttoken] = useState<string>('');
  const[isLogin,setisLogin] = useState<string>('false');
  const[role,setrole] = useState<string>('');
  const[courtid,setcourtid] = useState<number>(0);
  console.log("revisit app:",username+","+Jwttoken,isLogin,role);
  const updateusername = (updateusername:string, jwttoken:string, isLogin:string, role:string) => {
    console.log("Inside App.tsx updateusername called");
    setusername(updateusername);
    console.log("Username in App.tsx");
    console.log(username);
    sessionStorage.setItem('Username',updateusername);
    setjwttoken(jwttoken);
    console.log("jwttoken in App.tsx");
    console.log(Jwttoken);
    sessionStorage.setItem('Jwttoken',jwttoken);
    setisLogin(isLogin);
    console.log(isLogin); 
    sessionStorage.setItem('islogin',isLogin);
    setrole(role);
    console.log("Role from App.tsx");
    console.log(role);
    sessionStorage.setItem('role',role);
  }

  const updatecourtid = (courtid:number) => {
    setcourtid(courtid);
  }

  return (
    <>
    <Navbar username= {username} isLogin = {isLogin} role = {role} updateusername={updateusername}/>
    <ToastContainer/>
    <Routes>
      <Route path='/register' element={<RegisterForm/>}/>
      <Route path='/login' element={<Login updateusername={updateusername}/>}/>
      <Route path='/Admin' element={<Admin jwttoken = {Jwttoken} username = {username} updatecourtid={updatecourtid}/>}/>
      <Route path='/CourtSearch' element={<CourtSearch updatecourtid = {updatecourtid}/>}/>
      <Route path='/AddCourt' element={<AddCourt/>} />
      <Route path='/CourtView' element={<CourtView courtId={courtid} username={username}/>}/>
      <Route path='/UserProfile' element={<UserProfile/>}/>
      <Route path='/' element={<Home jwttoken = {Jwttoken} isLogin = {isLogin} username = {username} updateusername = {updateusername}/>}/>
    </Routes>
    </>
  );
}

export default App;
