var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  const template = document.createElement('template')
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class SampleGauge extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      const sudu = (Math.random() * 100).toFixed(2) - 0
      const zhuansu = (Math.random() * 7).toFixed(2) - 0
      const youbiao = (Math.random() * 2).toFixed(2) - 0
      const shuibiao = (Math.random() * 2).toFixed(2) - 0
      this.render(sudu, zhuansu, youbiao, shuibiao)
    }

    // ------------------
    // Life cycle methods
    // ------------------
    onCustomWidgetResize (width, height) {
      const sudu = (Math.random() * 100).toFixed(2) - 0
      const zhuansu = (Math.random() * 7).toFixed(2) - 0
      const youbiao = (Math.random() * 2).toFixed(2) - 0
      const shuibiao = (Math.random() * 2).toFixed(2) - 0
      this.render(sudu, zhuansu, youbiao, shuibiao)
    }

    // ------------------
    // Scripting methods
    // ------------------

    async render (sudu, zhuansu, youbiao, shuibiao) {
      await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')

      if (this._myChart) {
        echarts.dispose(this._myChart)
      }
      var myChart = this._myChart = echarts.init(this._root, 'dark')

      const option = {
        backgroundColor: '#1b1b1b',
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '速度',
            type: 'gauge',
            min: 0,
            max: 220,
            splitNumber: 11,
            radius: '50%',
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                width: 3,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisLabel: { // 坐标轴小标记
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            },
            axisTick: { // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            splitLine: { // 分隔线
              length: 25, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: { // 分隔线
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5
            },
            title: {
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            detail: {
              backgroundColor: 'rgba(30,144,255,0.8)',
              borderWidth: 1,
              borderColor: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5,
              offsetCenter: [0, '50%'], // x, y，单位px
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                color: '#fff'
              }
            },
            data: [{ value: 40, name: 'km/h' }]
          },
          {
            name: '转速',
            type: 'gauge',
            center: ['25%', '55%'], // 默认全局居中
            radius: '30%',
            min: 0,
            max: 7,
            endAngle: 45,
            splitNumber: 7,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [[0.29, 'lime'], [0.86, '#1e90ff'], [1, '#ff4500']],
                width: 2,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisLabel: { // 坐标轴小标记
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            },
            axisTick: { // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            splitLine: { // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              width: 5,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5
            },
            title: {
              offsetCenter: [0, '-30%'], // x, y，单位px
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            detail: {
              // backgroundColor: 'rgba(30,144,255,0.8)',
              // borderWidth: 1,
              borderColor: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5,
              width: 80,
              height: 30,
              offsetCenter: [25, '20%'], // x, y，单位px
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                color: '#fff'
              }
            },
            data: [{ value: 1.5, name: 'x1000 r/min' }]
          },
          {
            name: '油表',
            type: 'gauge',
            center: ['75%', '50%'], // 默认全局居中
            radius: '30%',
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                width: 2,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisTick: { // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
              formatter: function (v) {
                switch (v + '') {
                  case '0': return 'E'
                  case '1': return 'Gas'
                  case '2': return 'F'
                }
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              width: 2,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: 'gas' }]
          },
          {
            name: '水表',
            type: 'gauge',
            center: ['75%', '50%'], // 默认全局居中
            radius: '30%',
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                width: 2,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisTick: { // 坐标轴小标记
              show: false
            },
            axisLabel: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
              formatter: function (v) {
                switch (v + '') {
                  case '0': return 'H'
                  case '1': return 'Water'
                  case '2': return 'C'
                }
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              width: 2,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: 'gas' }]
          }
        ]
      }

      option.series[0].data[0].value = sudu
      option.series[1].data[0].value = zhuansu
      option.series[2].data[0].value = youbiao
      option.series[3].data[0].value = shuibiao
      myChart.setOption(option)
    }
  }

  customElements.define('com-sap-sample-echarts-gauge', SampleGauge)
})()