import axios from 'axios'
import { BASE_URL , TIMEOUT } from "./config";
class KNRequest {
  constructor(baseURL,timeout){
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }
  
  request(config){
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err =>{
        reject(err)
      })
    })
  }
  get(config) {
    return this.request({ ...config, method: 'get' })
  }
  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}

// const knRequest1 = new KNRequest('xxxx')
// const knRequest2 = new KNRequest('xxxx')
export default new KNRequest(BASE_URL,TIMEOUT)