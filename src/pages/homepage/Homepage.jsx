import { useState, useEffect } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import './homepage.css'
import { useLocation } from 'react-router'
import instance from './../../baseUrl'

export default function Homepage() {
  const [posts, setPosts] = useState([])
  const { search } = useLocation()

  async function fetchPosts() {
    const res = await instance.get('/posts/' + search)
    setPosts(res.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [search])

  return (
    <>
      <Header />
      {/* <div className='sidebarList'>
        {cats.map((c, i) => (
          <Link to={`/?cat=${c.name}`} className='link' key={i}>
            <li className='sidebarListItem'>{c.name}</li>
          </Link>
        ))}
      </div> */}
      <div className='home'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
}
