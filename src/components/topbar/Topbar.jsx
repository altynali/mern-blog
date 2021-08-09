import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { useContext } from 'react'
import './topbar.css'
import { logout } from '../../context/Actions'
import noImgUser from '../../images/noImgUser.jpg'

export default function Topbar() {
  const { user, dispatch } = useContext(Context)
  const PF = 'https://safe-dawn-28691.herokuapp.com/images/'

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='top'>
      <div className='topLeft'>
        <Link className='link' to='/'>
          LOGO
        </Link>
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link className='link' to='/'>
              HOME
            </Link>
          </li>
          {/* <li className='topListItem'>ABOUT</li>
          <li className='topListItem'>CONTACT</li> */}
          <li className='topListItem'>
            <Link className='link' to='/write'>
              WRITE
            </Link>
          </li>
          {user && (
            <li className='topListItem' onClick={handleLogout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className='topRight'>
        {user ? (
          <Link className='link' to='/settings'>
            <img className='topImg' src={noImgUser} alt='' />
          </Link>
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link className='link' to='/login'>
                LOGIN
              </Link>
            </li>
            <li className='topListItem'>
              <Link className='link' to='/register'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className='topSearchIcon fas fa-search'></i>
      </div>
    </div>
  )
}
