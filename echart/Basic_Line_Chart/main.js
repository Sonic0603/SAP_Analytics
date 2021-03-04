var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  const line = document.createElement('template')
  line.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class SampleLine extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(line.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      //this.render()
    }

/*     onCustomWidgetResize (width, height) {
      this.render()
    } */

    async render (resultSet) {
      await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')

      const chart = echarts.init(this._root)
	  
		var data = resultSet;
		var category = [];
		var value = [];
		/* for (var i = 0; i <= 360; i++) {
			var t = i / 180 * Math.PI;
			var r = Math.sin(2 * t) * Math.cos(2 * t);
			data.push([r, i]);
		} */
		
		/* if (Array.isArray(data))
		{ */
			console.log(data)
			console.log(data.length)
			
			resultSet.forEach(dp => {

				
			})
			
			const MEASURE_DIMENSION = '@MeasureDimension'
			
			for (var i = 0; i < data.length; i++)
			{
				console.log(data[i])
				value[i] = data[i][MEASURE_DIMENSION].rawValue;
				category[i] = data[i]["Sales_Manager__5w3m5d06b5"]["description"];
				console.log(value)
			}


			console.log(category)
			console.log(value)
			
		
		//}
		const option = {
				xAxis: {
					type: 'category',
					data: category
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: value,
					type: 'line'
				}]
			};
      chart.setOption(option)
    }
  }

  customElements.define('com-sap-sample-echarts-line', SampleLine)
})()