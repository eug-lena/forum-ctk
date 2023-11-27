import axios from 'axios'

const Axios = axios.create(
  {
    baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api',
    withCredentials: true
  }
)

export const Api = {

  Axios,

  getPosts: async function () {
    const returnData = {}
    await Axios.get('/posts/')
      .then((response) => {
        returnData.status = response.status
        returnData.post = response.data
      })
      .catch((error) => {
        returnData.status = error.response.status
        returnData.message = error.response.data.message
      })
    return returnData
  },

  postPost: async function (post) {
    const returnData = {}
    await Axios.post('/posts/', post)
      .then((response) => {
        returnData.status = response.status
        returnData.post = response.data
      })
      .catch((error) => {
        returnData.status = error.response.status
        returnData.message = error.response.data.message
      })
    return returnData
  },

  getPostById: async function (id) {
    const returnData = {}
    await Axios.get('/posts/' + id)
      .then((response) => {
        returnData.status = response.status
        returnData.post = response.data
      })
      .catch((error) => {
        returnData.status = error.response.status
        returnData.message = error.response.data.message
      })
    return returnData
  },

  getCommentsByPostId: async function (id) {
    const returnData = {}
    await Axios.get('/posts/' + id + '/comments')
      .then((response) => {
        returnData.status = response.status
        returnData.comments = response.data
      })
      .catch((error) => {
        returnData.status = error.response.status
        returnData.message = error.response.data.message
      })
    return returnData
  },

  postCommentByPostId: async function (id, comment) {
    const returnData = {}
    await Axios.post('/posts/' + id + '/comments', comment)
      .then((response) => {
        returnData.status = response.status
        returnData.comment = response.data
      })
      .catch((error) => {
        returnData.status = error.response.status
        returnData.message = error.response.data.message
      })
    return returnData
  }
}
