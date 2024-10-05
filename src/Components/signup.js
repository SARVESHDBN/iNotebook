import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials]= useState({name: "", email: "", password: "", cpassword:""});
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        const {name, email, password, cpassword} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({name, email, password, cpassword}),
        });
        const json = await response.json();
        console.log(json);
        if (json.success){  
            //save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            navigate('/');
            props.showAlert("Account Created Successfuly", "success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger"); 
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"> Name </label>
                    <input type="name" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="cpassword" className="form-control" onChange={onChange} id="cpassword" name="cpassword"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
