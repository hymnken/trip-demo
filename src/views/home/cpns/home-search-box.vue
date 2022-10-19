<template>
  <div class="search-box">
    <div class="location bottom-grey-line">
      <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="date-range section bottom-grey-line" @click="showCalendar=true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{startDate}}</span>
        </div>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{endDate}}</span>
        </div>
      </div>
      <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" :round="false" :show-confirm="false"
      @confirm="onConfirm" />
    </div>
    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-grey-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <div class="section keyword bottom-grey-line">
      关键字/位置/民宿名
    </div>
    <!-- 热门建议城市 -->
    <div class="section hot-suggests">
      <template v-for="(item,index) in hotSuggests" :key="index">
        <div class="item" :style="{color:item.tagText.color,background:item.tagText.background.color}">
          {{item.tagText.text}}
        </div>
      </template>
    </div>

  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { formatMonthDay, getDiffDays } from "@/utils/format_date";
const router = useRouter()

// defineProps({
//   hotSuggests: {
//     type: Array,
//     default: () => []
//   }
// })

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
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)



const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))
const stayCount = ref(getDiffDays(nowDate, newDate))
//获取开始与结束的日期
const showCalendar = ref(false)
const onConfirm = (value) => {
  // 设置日期
  const selectStart = value[0]
  const selectEnd = value[1]
  startDate.value = formatMonthDay(selectStart)
  endDate.value = formatMonthDay(selectEnd)
  stayCount.value = getDiffDays(selectStart, selectEnd)
  // 确定日期后隐藏
  showCalendar.value = false
}

//热门建议
const homeStore = useHomeStore()
const {hotSuggests} =storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
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

.date-range {
  height: 44px;

  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.section {
  display: flex;
  height: 44px;
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

.price-counter {
  .start {
    border-right: 1px solid #f2f2f2;
  }
}

.hot-suggests{
  margin:10px 0;
  .item{
    padding:4px 8px;
    border-radius: 14px;
    margin:4px 4px;
    font-size: 12px;
    line-height: 1;
  }
}
</style>