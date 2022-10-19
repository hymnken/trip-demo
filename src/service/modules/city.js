import knRequest from "../request";

export function getAllCity(){
  return knRequest.get({
    url:'/city/all'
  })
}