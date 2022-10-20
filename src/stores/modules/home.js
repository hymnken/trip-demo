import { getHomeHotSuggests , getHomeHotCategories , getHomehouselist } from '@/service'
import { defineStore } from 'pinia'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houselist:[],
    currentPage: 1
  }),
  actions: {
    async fetchHotSuggestDate() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeHotCategories()
      this.categories = res.data
    },
    async fetchHouselistData() {
      const res = await getHomehouselist(this.currentPage)
      this.houselist.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore