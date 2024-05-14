import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FryingPan from "./FryingPan";
import Recipe from "./Recipe";
import Spinner from "./Spinner";

const Contact = () => {


  return (
    <div style={{height:"100vh", width:"100%", display:"flex",justifyContent:"center", alignItems:"center" }}>
      <div style={{height:"400px", width:"500px", backgroundColor:"#ffd3be", borderRadius:"10px", display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
        <h2 style={{fontWeight:"bold", fontSize:"30px", alignItems:"center",textDecoration:"underline", marginBottom:"20px"}}>Contact</h2>
        <p>Mobile: +91-9876789876</p>
        <p>Email: santhiya@gmail.com</p>
      </div>
      
    </div>
  );
};

export default Contact;
