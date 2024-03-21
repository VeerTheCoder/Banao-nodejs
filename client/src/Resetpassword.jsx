import React, { useState } from "react";
import "./App.css";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const {id,token}=useParams()
  const navigate = useNavigate();

  const sendData = async () => {
    const burl = `http://localhost:5000/api/v1/user/reset-password/${id}/${token}`;
    const data = {password};
    
      if(password ){
        const dta=await axios.post(burl, data);
        if(dta.data.Status==="Success"){
          navigate('/login')
          return
        }
        }
        else{
          alert("Can't leave any field empty")
        }
    
  };

  return (
    <>
      <div className="submit-container topsubmit">
      </div>
      <div className="container">
        <div className="header">
          <div className="text">
            <span>New Password</span>
          </div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          
           <div className="input">
              <FaLock className="icns" />
              <input
                type="password"
                placeholder="New password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          
          
        </div>
        <div className="submit-container">
          
            <div className="submit" onClick={sendData}>
              Update
            </div>
          
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
