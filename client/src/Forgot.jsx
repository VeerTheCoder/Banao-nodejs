import React, { useState } from "react";
import "./App.css";
import { FiMail} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendData = async () => {
    const burl = "http://localhost:5000/api/v1/user/forgot-password";
    const data = {email};
    
      if(email ){
        const dta=await axios.post(burl, data);
        if(dta.data.Status==="Success"){
          alert("Reset link sent to mail")
          return
        }
        else{
          console.log("User not exist")
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
            <span>Reset Password</span>
          </div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          
            <div className="input">
              <FiMail className="icns" />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          
          
        </div>
        <div className="submit-container">
          
            <div className="submit" onClick={sendData}>
              Send
            </div>
          
        </div>
      </div>
    </>
  );
};

export default Forgot;
