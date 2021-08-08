import Post from '../post/Post';
import './posts.css';

export default function Posts({ posts }) {
  return (
    <div className='posts'>
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
}
