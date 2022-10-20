import knRequest from '../request'

export function getHomeHotSuggests() {
  return knRequest.get({
    url:'/home/hotSuggests'
  })
}

export function getHomeHotCategories() {
  return knRequest.get({
    url:'/home/categories'
  })
}

export function getHomehouselist(currentPage) {
  return knRequest.get({
    url:'/home/houselist',
    params:{
      page:currentPage
    }
  })
}