<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import { getOnlineCount } from '@/api/index'

require('echarts/theme/macarons') // echarts theme


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
      getOnlineCount().then(res => {
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
          text: '在线用户'
       },
        xAxis: {
            type: 'category',
            data: this.list.map(item => item.date)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: this.list.map(item => item.count),
            type: 'line',
            smooth: true
            }
        ]
        
      })
    }
  }
}
</script>
