import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import { useContext } from 'react';

function Login() {
  const { setUserData } = useContext(UserContext);
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [name,setName]=useState("");
const [username,setUserName]=useState("");
const [id,seId]=useState("");

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleName= (e) => {
    setName(e.target.value);
  };const handleUserName= (e) => {
    setUserName(e.target.value);
  };
  const history = useNavigate();
  const handleLogin = () => {
    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        "id":"",
        "name":name,
        "userName":username,
        "email": email,
        "password": password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data !== null) {

    setUserData(data);
    console.log(data);
          
          history('/diagnostique');
         // Mettez le console.log(user) ici
        } else {
          alert('Réponse du serveur : ' + JSON.stringify(data));
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  };
  

  
return (
<>

<section class="vh-100">
        <div class="container-fluid h-custom">
        
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">

            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
               
      
             
      
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control form-control-lg"
                    placeholder="Enter email address"  onChange={handleEmailChange}  />
                </div>
      
               
                <div class="form-outline mb-3">
                  <input type="password" id="form3Example4" class="form-control form-control-lg"
                    placeholder="Enter password" onChange={handlePasswordChange}  />
                </div>
                <div class="form-outline mb-3">
                  <input type="text" id="form3Example4" class="form-control form-control-lg"
                    placeholder="Enter Name" onChange={handleName}  />
                </div>
                <div class="form-outline mb-3">
                  <input type="text" id="form3Example4" class="form-control form-control-lg"
                    placeholder="Enter userName" onChange={handleUserName}  />
                </div>
                <div class="d-flex justify-content-between align-items-center">
        
                  <div class="form-check mb-0">
                  
                  </div>
                </div>
      
                <div class="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg" onClick={handleLogin}>
        Login
      </button>
                  <p class="small fw-bold mt-2 pt-1 mb-0"><a href="#!"
                      class="link-danger"></a></p>
                </div>
      
              </form>
            </div>
          </div>
        </div>
        <div
          class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          
      
        </div>
      </section>





</>  )
}

export default Login;