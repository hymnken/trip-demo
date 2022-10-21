import {defineStore} from "pinia";
// 处理日期
const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)
const useMainStore = defineStore('main',{
  state: () => ({
    token:'',

    startDate: startDate,
    endDate: endDate
  }),

})


export default useMainStore