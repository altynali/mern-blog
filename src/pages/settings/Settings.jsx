import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
import {
  updateStart,
  updateSuccess,
  updateFail,
  logout,
} from '../../context/Actions'
import { Image } from 'cloudinary'
import noImgUser from '../../images/noImgUser.jpg'

export default function Settings() {
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)

  const { user, dispatch } = useContext(Context)
  const PF = 'http://localhost:5000/images/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(updateStart())
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    }

    if (file) {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', 'ml_default')

      axios
        .post(
          'https://api.cloudinary.com/v1_1/mern-blog-altynali/image/upload',
          data
        )
        .then((res) => {
          updatedUser.profilePic = res.data.public_id

          if (updatedUser.profilePic) {
            try {
              axios.put('/users/' + user._id, updatedUser).then((res) => {
                setSuccess(true)
                dispatch(updateSuccess(res.data))
              })
            } catch (err) {
              dispatch(updateFail())
            }
          }
        })
    }
  }

  const handleDelete = async () => {
    console.log(user._id)
    try {
      await axios.delete('/users/' + user._id, { data: { userId: user._id } })
      dispatch(logout())
      window.location.replace('/')
    } catch (err) {}
  }

  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsUpdateTitle'>Update Your Account</span>
          <span className='settingsDeleteTitle' onClick={handleDelete}>
            Delete Account
          </span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settingsPP'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic === ''
                  ? noImgUser
                  : noImgUser
                //     (
                //   <Image
                //     cloudName='mern-blog-altynali'
                //     public_id={user.profilePic}
                //     width='100'
                //     height='100'
                //     crop='scale'
                //   />
                // )
              }
              alt=''
            />
            <label htmlFor='fileInput'>
              <i className='settingsPPIcon far fa-user-circle'></i>
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settingsSubmit' type='submit'>
            Update
          </button>
          {success && (
            <span
              style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
