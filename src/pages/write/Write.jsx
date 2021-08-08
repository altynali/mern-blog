import './write.css'
import { useContext, useState, useEffect } from 'react'
import { Context } from './../../context/Context'
import axios from 'axios'
import Cat from './Cat'

export default function Write() {
  const { user } = useContext(Context)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState()

  const [cats, setCats] = useState([])
  const finalCats = []

  const getCats = async () => {
    const res = await axios.get('/categories')
    setCats(res.data)
  }

  useEffect(() => {
    getCats()
  }, [])

  const handleCat = (name) => {
    if (finalCats.find((cat) => cat.name === name)) {
      finalCats.map((cat, i) => {
        if (cat.name === name) finalCats.splice(i, 1)
        return i
      })
    } else {
      finalCats.push({
        name,
      })
    }

    console.log(finalCats)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: finalCats,
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
          console.log(res)
          newPost.photo = res.data.public_id
          console.log(newPost)
          if (newPost.photo) {
            try {
              console.log(newPost)
              axios.post('/posts', newPost).then((res) => {
                console.log(res)
                //window.location.replace('/post/' + res.data._id)
                window.location.replace('/')
              })
            } catch (e) {
              console.log(e)
            }
          }
        })
    }
  }

  return (
    <div className='write'>
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt='Post' />
      )}
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput' className='writePic'>
            <i className='writeIcon fas fa-plus'></i>
          </label>
          <input
            id='fileInput'
            type='file'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className='writeInput'
            placeholder='Title'
            type='text'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='writeCats'>
          <span className='writeChoose'>Choose categories:</span>
          {cats.map((cat, i) => (
            <Cat key={i} cat={cat} handleCat={handleCat} />
          ))}
        </div>
        <div className='writeFormGroup'>
          <textarea
            className='writeInput writeText'
            placeholder='Tell your story...'
            type='text'
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className='writeSubmit' type='submit'>
          Publish
        </button>
      </form>
    </div>
  )
}
