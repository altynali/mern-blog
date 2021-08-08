import { Link } from 'react-router-dom'
import './post.css'
import noImgPost from '../../images/noImgPost.jpg'
import { Image } from 'cloudinary-react'

export default function Post({ post }) {
  return (
    <div className='post'>
      <div className='postInfo'>
        <div className='postCats'>
          {post?.categories.map((cat, i) => (
            <span className='postCat' key={i}>
              {cat.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          {post?.photo === '' ? (
            <img className='postImg' src={noImgPost} alt='Post' />
          ) : (
            <Image
              cloudName='mern-blog-altynali'
              publicId={post.photo}
              width='300'
              height='300'
              crop='scale'
            />
          )}
        </Link>
        <span className='postTitle'>
          <Link to={`/post/${post._id}`} className='link'>
            {post?.title}
          </Link>
        </span>
        <hr />
        <span className='postDate'>
          {new Date(post?.createdAt).toDateString()}
        </span>
      </div>
      <p className='postDesc'>{post?.desc}</p>
    </div>
  )
}
