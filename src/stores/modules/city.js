import { getAllCity } from "@/service";
import { defineStore } from "pinia";

const useCityStore = defineStore('city',{
  state: () => ({
    allCities:{},
    currentCity:{ 
      cityName:'广州'
    }
  }),
  actions:{
    async fetchAllCitiesData() {
      const res = await getAllCity()
      this.allCities = res.data
    }
  }
})

export default useCityStore