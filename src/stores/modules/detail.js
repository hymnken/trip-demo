import { defineStore } from 'pinia'
import { getDetailInfos } from "@/service";
const useDetailStore = defineStore('detail',{
  state:() => ({
    houseId:null,
    detailInfos:{},
    mainPart:{},
    topInfos:{},
    houseFacility:{}
  }),
  actions:{
    async fetchDetailData() {
      const res = await getDetailInfos(this.houseId)
      this.detailInfos = res.data
      this.mainPart = this.detailInfos.mainPart
      this.topInfos = this.mainPart.topModule
      this.houseFacility = this.mainPart.dynamicModule.facilityModule.houseFacility
    }
  }
})








export default useDetailStore