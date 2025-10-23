<template>
  <div ref="root" class="chart"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'LineChart',
  props: {
    labels: { type: Array as () => string[], required: true },
    values: { type: Array as () => number[], required: true }
  },
  setup(props) {
    const root = ref<HTMLDivElement | null>(null)
    let chart: echarts.ECharts | null = null

    function render() {
      if (!root.value) return
      chart = echarts.init(root.value)
      const option = {
        xAxis: { type: 'category', data: props.labels },
        yAxis: { type: 'value' },
        series: [{ data: props.values, type: 'bar', smooth: true, itemStyle: { color: '#ff9f7f' } }],
        tooltip: {}
      }
      chart.setOption(option)
    }

    onMounted(() => {
      render()
      window.addEventListener('resize', () => chart?.resize())
    })
    onUnmounted(() => chart?.dispose())
    watch([() => props.labels, () => props.values], () => {
      chart?.setOption({ xAxis: { data: props.labels }, series: [{ data: props.values }] })
    })

    return { root }
  }
})
</script>

<style scoped>
.chart{width:100%;height:200px}
</style>
