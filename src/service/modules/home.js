import knRequest from '../request'

export function getHomeHotSuggests() {
  return knRequest.get({
    url:'/home/hotSuggests'
  })
}