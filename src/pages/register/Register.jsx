import axios from 'axios'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import { Context } from './../../context/Context'
import { loginSuccess } from './../../context/Actions'
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
} from './../validation/validation'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMess] = useState('')
  const [errorMessageU, setErrorMessU] = useState('')
  const [errorMessageE, setErrorMessE] = useState('')
  const [errorMessageP, setErrorMessP] = useState('')

  const { dispatch } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessU('')
    setErrorMessE('')
    setErrorMessP('')

    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      })

      res.data &&
        dispatch(loginSuccess(res.data)) &&
        window.location.replace('/')
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)

        setErrorMess(error.response.data.message)
      }
    }

    if (!usernameValidation(username)) {
      setErrorMessU('Username is not valide')
      console.log(errorMessageU)
      //alert(validMessage)
    }

    if (!emailValidation(email)) {
      setErrorMessE('Email is not valide')
      console.log(errorMessageE)
    }

    if (!passwordValidation(password)) {
      setErrorMessP('Password is not valide')
      console.log(errorMessageP)
    }
    if (
      !usernameValidation(username) ||
      !emailValidation(email) ||
      !passwordValidation(password)
    )
      return
  }
  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type='text'
          className='registerInput'
          placeholder='Enter your username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <span style={{ color: 'red' }}>{errorMessageU}</span>
        <label>Email</label>
        <input
          type='text'
          className='registerInput'
          placeholder='Enter your email...'
          onChange={(e) => setEmail(e.target.value)}
        />
        <span style={{ color: 'red' }}>{errorMessageE}</span>
        <label>Password</label>
        <input
          type='password'
          className='registerInput'
          placeholder='Enter your password...'
          onChange={(e) => setPassword(e.target.value)}
        />
        <span style={{ color: 'red' }}>{errorMessageP}</span>
        <button className='registerButton' type='submit'>
          Register
        </button>
      </form>
      <button className='registerLoginButton'>
        <Link className='link' to='/login'>
          Login
        </Link>
      </button>
      <span style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</span>
    </div>
  )
}
