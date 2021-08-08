import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://safe-dawn-28691.herokuapp.com/',
})

instance.defaults.headers.common['Access-Control-Allow-Origin'] =
  'http://localhost:3000'

export default instance
