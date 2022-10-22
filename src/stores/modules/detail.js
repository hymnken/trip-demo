import { defineStore } from 'pinia'
import { getDetailInfos } from "@/service";
const useDetailStore = defineStore('detail',{
  state:() => ({
    houseId:null,
    detailInfos:{},
    mainPart:{}
  }),
  actions:{
    async fetchDetailData() {
      const res = await getDetailInfos(this.houseId)
      this.detailInfos = res.data
      this.mainPart = this.detailInfos.mainPart
    }
  }
})








export default useDetailStore