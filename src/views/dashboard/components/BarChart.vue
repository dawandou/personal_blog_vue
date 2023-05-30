<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getWeekArticleCount } from '@/api/index'


export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },

  data() {
    return {
      chart: null,
      list: [],
    }
  },

  mounted() {
    getWeekArticleCount().then(res => {
        if(res.code === 200) {
          this.list = res.data;
          this.initChart();
        } else {
            this.$message({
              type: 'error',
              message: res.msg
            });
        }
    })
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '发文数量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.list.map(item => item.date),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '文章数',
            type: 'bar',
            barWidth: '60%',
            data: this.list.map(item => item.count)
          }
        ]
        
      })
    }
  }
}
</script>
