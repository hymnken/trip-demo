import knRequest from "../request";

export function getAllCity(){
  return knRequest({
    url:'/city/all'
  })
}