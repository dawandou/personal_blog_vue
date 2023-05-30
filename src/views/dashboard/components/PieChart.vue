<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import { getTagCount } from '@/api/index'

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
      list: []
    }
  },
  mounted() {
    getTagCount().then(res => {
        if(res.code === 200) {
          var getData = [];
          for(let i = 0; i < res.data.length; i++) {
            var obj = new Object();
            obj.name = res.data[i].tagName;
            obj.value = res.data[i].tagCount;
            getData[i] = obj;
          }
          this.list = getData;
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
            text: '文章标签占比',
            left: 'left'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
            type: 'pie',
            radius: '50%',
            data: this.list,
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
        
      })
    }
  }
}
</script>
