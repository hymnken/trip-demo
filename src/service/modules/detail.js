import knRequest from '../request'
export function getDetailInfos(houseId) {
  return knRequest.get({
    url: '/detail/infos',
    params: {
      houseId,
    },
  })
}
