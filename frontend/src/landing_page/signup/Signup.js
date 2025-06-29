
import React, { useContext, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.js';
import axios from 'axios'
import { toast } from 'react-toastify'

const SignUp = () => {

  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin , getUserData} = useContext(AppContext)

  const [state, setState] = useState('SignUp')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit =async (e) => {
   try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === 'SignUp') {
        const {data} = await axios.post(backendUrl + '/auth/register', { name, email, password })

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }

      } else {
        const {data} = await axios.post(backendUrl + '/auth/login', { email, password })

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-85">
      <div className="container" style={{ maxWidth: "400px" }}>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {state === 'SignUp' ? 'Create your account' : 'Login '}
        </h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
          className="bg-white p-4 rounded shadow">

          {state === 'SignUp' && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                type="text"
                className="form-control sm-input"
                id="name"
              />
            </div>
          )}


          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              type="email"
              className="form-control sm-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"
              className="form-control sm-input"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {state === 'SignUp' ? "Sign Up" : "Login"}
          </button>

          {state === 'SignUp' ? (
            <p class = "auth-toggle">
              Already have an Account?
              <span
                onClick={() => setState('Login')}
                 class= "auth-link"
              >
                Login here
              </span>
            </p>
          ) : (
            <p class = "auth-toggle">
              Don't have an Account?
              <span
                onClick={() => setState('SignUp')}
                class= "auth-link"
              >
                Sign Up
              </span>
            </p>
          )}

        </form>

      </div>
    </div>

  );
};

export default SignUp;
