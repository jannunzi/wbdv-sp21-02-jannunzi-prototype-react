import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import userService from '../../services/user-service'

const Register = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''}) 
    const history = useHistory()
    const register = () => {
        userService.register(credentials)
            .then((user) => {
                console.log(user)
                if(user === 0) {
                    alert("username already taken")
                } else {
                    history.push("/profile")
                }
            })
    }
    return(
        <div>
            <h1>Register</h1>
            <input
                value={credentials.username}
                onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
                className="form-control"
                placeholder="username"/>
            <input
                value={credentials.password}
                onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
                className="form-control"
                placeholder="password"/>
            <input
                className="form-control"
                placeholder="validate password"/>
            <button onClick={register} className="btn btn-primary">
                Register
            </button>
            <Link to="/login">
                Login
            </Link>
        </div>
    )
}

export default Register;