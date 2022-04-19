import React, { useState } from 'react';
import axios from "axios";
import "../styles.css"
import { useNavigate } from "react-router-dom"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const LOGIN = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const LOGIN_BUTTON_CLICKED = () => {
    if (username === "" || password === "") {
      NotificationManager.warning('Please, Enter valid username and password.', 'Wrong Credentials', 5000);
      setUsername("")
      setPassword("")
    }
    else {
      axios.get(`http://localhost:5000/login_info/${username},${password}`)
        .then((response) => {
          if (response.data === 200) {
            navigate("/DASHBOARD", { state: { use: username, pass: password, isAdmin : true } }, { replace: true });
          }
          else if (response.data === 201) {
            navigate("/DASHBOARD", { state: { use: username, pass: password, isAdmin : false } }, { replace: true });
          }
          else {
            NotificationManager.warning('Please, Enter valid username and password.', 'Wrong Credentials', 5000);
            setUsername("")
            setPassword("")
          }
        })
        .catch((error) => {
          NotificationManager.warning('Please, Enter valid username and password.', 'Wrong Credentials', 5000);
          setUsername("")
          setPassword("")
        })
    }
  }





  return (
    <div className="LOGIN_DIV">

      <div className='LOGIN_DIV_01'>
      ADMIN PANEL
      </div>


      <div className='LOGIN_DIV_02'>
        <span className='LOGIN_DIV_02_SPAN'>
          Username :
        </span>
        <input className='LOGIN_DIV_02_INPUT' type="text" placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>


      <div className='LOGIN_DIV_02'>
        <span className='LOGIN_DIV_02_SPAN'>
          Password :
        </span>
        <input className='LOGIN_DIV_02_INPUT' type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>

      <div className='LOGIN_DIV_03'>
        <button className='LOGIN_DIV_03_BUTTON' onClick={LOGIN_BUTTON_CLICKED}>Login</button>
      </div>


      <NotificationContainer />
    </div>
  );
}

export default LOGIN;
