import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import hi from '../../images/welc.jpeg'

export default function Sidebar() {
  const [cats, setCats] = useState([])

  const getCats = async () => {
    const res = await axios.get('/categories/')
    setCats(res.data)
  }

  useEffect(() => {
    getCats()
  }, [])

  return (
    <div className='sidebar'>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>ABOUT ME</span>
        <img src={hi} alt='' />
        <p>Hi! I'm Alina. This is my Blog on MERN stack!</p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
          {cats?.map((c, i) => (
            <Link to={`/?cat=${c.name}`} className='link' key={i}>
              <li className='sidebarListItem'>{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
