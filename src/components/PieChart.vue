<template>
  <div ref="root" class="chart"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'PieChart',
  props: {
    data: { type: Array as () => { name: string; value: number }[], required: true }
  },
  setup(props) {
    const root = ref<HTMLDivElement | null>(null)
    let chart: echarts.ECharts | null = null

    function render() {
      if (!root.value) return
      chart = echarts.init(root.value)
      const option = {
        tooltip: { trigger: 'item' },
        legend: { bottom: 0, left: 'center' },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: { label: { show: true } },
          data: props.data
        }]
      }
      chart.setOption(option)
    }

    onMounted(() => {
      render()
      window.addEventListener('resize', () => chart?.resize())
    })
    onUnmounted(() => {
      chart?.dispose()
    })
    watch(() => props.data, () => {
      chart?.setOption({ series: [{ data: props.data }] })
    }, { deep: true })

    return { root }
  }
})
</script>

<style scoped>
.chart{width:100%;height:220px}
</style>
