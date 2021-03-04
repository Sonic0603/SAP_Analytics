var getScriptPromisify = (src) => {
  // Workaround with conflict between geo widget and echarts.

  return new Promise(resolve => {
    $.getScript(src, () => {
     
      resolve()
    })
  })
}

(function () {
  const circle = document.createElement('template')
  circle.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class Samplecircle extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(circle.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      this.render()
    }

      onCustomWidgetResize (width, height) {
      this.render()
    }

    async render () {
      await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')

      const chart = echarts.init(this._root, 'dark')
    var data = [];

for (var i = 0; i <= 100; i++) {
    var theta = i / 100 * 360;
    var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
    data.push([r, theta]);
}

const option = {
	
    title: {
        text: ''
    },
    legend: {
        data: ['line']
    },
    polar: {},
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    angleAxis: {
        type: 'value',
        startAngle: 0
    },
    radiusAxis: {
    },
    series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        data: data
    }]
};

      chart.setOption(option)
    }
  }

  customElements.define('com-sap-sample-echarts-circle', Samplecircle)
})()