<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="date-range section" @click="showCalendar=true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{startDate}}</span>
        </div>
      </div>
      <div class="stay">共一晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{endDate}}</span>
        </div>

      </div>
    </div>

    <van-calendar 
    v-model:show="showCalendar"
    type="range"
    color="#ff9854"
    :round="false"
    :show-confirm="false"
    @confirm="onConfirm" />
  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {formatMonthDay} from "@/utils/format_date";
const router = useRouter()
const cityClick = () => { 
  router.push('/city')
}


const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log(res);
  }, err => {
    console.log(err);
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

//当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
// 处理日期
const nowDate = new Date()
const newDate = nowDate.setDate(nowDate.getDate() + 1)
const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))

//获取开始与结束的日期
const showCalendar = ref(false)
const onConfirm = (value) =>{
  // 设置日期
  const selectStart = value[0]
  const selectEnd = value[1]
  startDate.value = formatMonthDay(selectStart)
  endDate.value = formatMonthDay(selectEnd)
  // 确定日期后隐藏
  showCalendar.value = false
}
</script>

<style lang="less" scoped>
.search-box{
  --van-calendar-popup-height:100%;
}
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      font-size: 12px;
      top: 2px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.date-range{
  height: 44px;
  .stay{
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>