<template>
  <div class="dashboard-container">
    <panel-group ></panel-group>

    <!-- 数据分析 -->
    <el-row :gutter="32" class="row-chart">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
           <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
           <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart />
        </div>
      </el-col>
    </el-row>

    <!-- 功能 -->
    <el-row :gutter="32" class="row-chart">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
         <div class="e-title">文章标签统计</div>
         <word-cloud />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div class="e-title">最新公告</div>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="(item,index) in list" :key="index">
              <template slot="title">
                {{item.noticeTitle}}
                <i class="ssf ssf-colse" @click.stop="close(item,index)"></i>    
              </template>
              <div>{{item.noticeContent}}</div>
            </el-collapse-item>
          </el-collapse>
          
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
           <div class="con">
            <div class="now-data-myself">
              <div class="now-data-myself-time">{{ date }}</div>
              <div class="now-data-myself-week">{{ week }}</div>
            </div>
            <Calendar
              v-on:choseDay="clickDay"
              v-on:changeMonth="changeDate"
              v-on:isToday="clickToday"
            ></Calendar>
          </div>
        </div>
      </el-col>
    </el-row>
 
  </div>
  
</template>

<script>

import PanelGroup from './components/PanelGroup'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import Calendar from 'vue-calendar-component'
import WordCloud from './components/WordCloud.vue'
import { getNoticeList } from '@/api/index'


export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    BarChart,
    PieChart,
    LineChart,
    Calendar,
    WordCloud
  },
  
  data() {
    return {
     date: "",
     week: "",
     activeName: '1',
     list: []
    }
  },
   created() {

    getNoticeList().then(res => {
        if(res.code === 200) {
          this.list = res.data;
        } else {
            this.$message({
              type: 'error',
              message: res.msg
            });
        }
    })

    var now = new Date();
    this.date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    this.week = arr_week[day];
  },

  methods: {
    clickDay(data) {},
    changeDate(data) {},
    clickToday(data) {}

  },
  

}
</script>

<style rel="stylesheet/scss" lang="scss">

.dashboard {
  &-container {
    padding: 32px;
    background-color: #f0f2f5;
  }
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
.row-chart{
  margin-top: 30px;
}
.now-data-myself {
  width: 40%;
  position: absolute;
  border-right: 1px solid rgba(227, 227, 227, 0.6);
}
.con {
  position: relative;
  max-width: 400px;
  margin: auto;
}
.con .wh_content_all {
  background: transparent !important; 
}
.wh_top_changge li {
  color: #F56C6C !important;
  font-size: 15px !important;
}
.wh_content_item, .wh_content_item_tag {
  color: #303133 !important;
}
.wh_content_item .wh_isToday {
  background: #00d985  !important;
  color: #fff  !important;
}
.wh_content_item .wh_chose_day {
  background: #409EFF  !important;
  color: #ffff  !important;
}
.wh_item_date:hover {
    background: rgb(217, 236, 255) !important;
    border-radius: 100px !important;
    color: rgb(102, 177, 255)  !important;
}
.wh_jiantou1[data-v-2ebcbc83] {
    border-top: 2px solid #909399;
    border-left: 2px solid #909399;
    width: 7px;
    height: 7px;
}
.wh_jiantou2[data-v-2ebcbc83] {
    border-top: 2px solid #909399;
    border-right: 2px solid #909399;
    width: 7px;
    height: 7px;
}
.wh_top_tag[data-v-2ebcbc83] {
  color: #409EFF;
  border-top: 1px solid rgba(227, 227, 227, 0.6);
  border-bottom: 1px solid rgba(227, 227, 227, 0.6);
}
.wh_container[data-v-2ebcbc83] {
    max-width: 400px;
}
.wh_top_changge[data-v-2ebcbc83] {
    display: flex;
    width: 50%;
    margin-left: 43%;
}
.now-data-myself-time {
  color: #F56C6C;
  font-size: 28px;
  margin-left:60px;
  height: 33px;
  font-family: "Helvetica Neue";
}
.now-data-myself-week {
  margin-left:60px;
  font-size: 10px;
  color: #909399;
}
.wh_top_changge .wh_content_li[data-v-2ebcbc83] {
  font-family: Helvetica;
}

</style>
