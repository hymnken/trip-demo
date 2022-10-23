import { defineStore } from 'pinia'
import { getDetailInfos } from "@/service";
const useDetailStore = defineStore('detail',{
  state:() => ({
    houseId:null,
    detailInfos:{},
    mainPart:{},
    topInfos:{},
    houseFacility:{},
    landlord:{},
    comment:{},
    orderRules:[],
    position:{}
  }),
  actions:{
    async fetchDetailData() {
      const res = await getDetailInfos(this.houseId)
      this.detailInfos = res.data
      this.mainPart = this.detailInfos.mainPart
      this.topInfos = this.mainPart.topModule
      this.houseFacility = this.mainPart.dynamicModule.facilityModule.houseFacility
      this.landlord = this.mainPart.dynamicModule.landlordModule
      this.comment = this.mainPart.dynamicModule.commentModule
      this.orderRules = this.mainPart.dynamicModule.rulesModule.orderRules
      this.position = this.detailInfos.mainPart.dynamicModule.positionModule
      console.log(this.position.longitude);
    }
  }
})








export default useDetailStore