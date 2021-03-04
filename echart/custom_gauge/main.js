var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  const gauge = document.createElement('template')
  gauge.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class SampleGuage extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(gauge.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      this.render()
    }

    onCustomWidgetResize (width, height) {
      this.render()
    }

    async render (p_total, p_value) {
      await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')

      const chart = echarts.init(this._root)
	  
/*****************************************************************************************/
	  
		var _panelImageURL = 'http://localhost/custom_gauge/custom-gauge-panel.png';
		var _animationDuration = 1000;
		var _animationDurationUpdate = 1000;
		var _animationEasingUpdate = 'quarticInOut';
		var _valOnRadianMax = p_total;
		var _outerRadius = 200;
		var _innerRadius = 170;
		var _pointerInnerRadius = 40;
		var _insidePanelRadius = 140;
		var _currentDataIndex = 0;

		function renderItem(params, api) {
			var valOnRadian = api.value(1);
			var coords = api.coord([api.value(0), valOnRadian]);
			var polarEndRadian = coords[3];
			var imageStyle = {
				image: _panelImageURL,
				x: params.coordSys.cx - _outerRadius,
				y: params.coordSys.cy - _outerRadius,
				width: _outerRadius * 2,
				height: _outerRadius * 2
			};

			return {
				type: 'group',
				children: [{
					type: 'image',
					style: imageStyle,
					clipPath: {
						type: 'sector',
						shape: {
							cx: params.coordSys.cx,
							cy: params.coordSys.cy,
							r: _outerRadius,
							r0: _innerRadius,
							startAngle: 0,
							endAngle: -polarEndRadian,
							transition: 'endAngle',
							enterFrom: { endAngle: 0 }
						}
					}
				}, {
					type: 'image',
					style: imageStyle,
					clipPath: {
						type: 'polygon',
						shape: {
							points: makePionterPoints(params, polarEndRadian)
						},
						extra: {
							polarEndRadian: polarEndRadian,
							transition: 'polarEndRadian',
							enterFrom: { polarEndRadian: 0 }
						},
						during: function (apiDuring) {
							apiDuring.setShape(
								'points',
								makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
							);
						}
					}
				}, {
					type: 'circle',
					shape: {
						cx: params.coordSys.cx,
						cy: params.coordSys.cy,
						r: _insidePanelRadius
					},
					style: {
						fill: '#fff',
						shadowBlur: 25,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowColor: 'rgba(76,107,167,0.4)'
					}
				}, {
					type: 'text',
					extra: {
						valOnRadian: valOnRadian,
						transition: 'valOnRadian',
						enterFrom: { valOnRadian: 0 }
					},
					style: {
						text: makeText(valOnRadian),
						fontSize: 50,
						fontWeight: 700,
						x: params.coordSys.cx,
						y: params.coordSys.cy,
						fill: 'rgb(0,50,190)',
						align: 'center',
						verticalAlign: 'middle',
						enterFrom: { opacity: 0 }
					},
					during: function (apiDuring) {
						apiDuring.setStyle('text', makeText(apiDuring.getExtra('valOnRadian')));
					}
				}]
			};
		}

		function convertToPolarPoint(renderItemParams, radius, radian) {
			return [
				Math.cos(radian) * radius + renderItemParams.coordSys.cx,
				-Math.sin(radian) * radius + renderItemParams.coordSys.cy
			];
		}

		function makePionterPoints(renderItemParams, polarEndRadian) {
			return [
				convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
				convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian + Math.PI * 0.03),
				convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
			];
		}

		function makeText(valOnRadian) {
			// Validate additive animation calc.
			if (valOnRadian < -10) {
				alert('illegal during val: ' + valOnRadian);
			}
			return (valOnRadian / _valOnRadianMax * 100).toFixed(0) + '%';
		}

		const option = {
			animationEasing: _animationEasingUpdate,
			animationDuration: _animationDuration,
			animationDurationUpdate: _animationDurationUpdate,
			animationEasingUpdate: _animationEasingUpdate,
			dataset: {
				source: [[1, p_value]]
			},
			tooltip: {},
			angleAxis: {
				type: 'value',
				startAngle: 0,
				axisLine: { show: false },
				axisTick: { show: false },
				axisLabel: { show: false },
				splitLine: { show: false },
				min: 0,
				max: _valOnRadianMax
			},
			radiusAxis: {
				type: 'value',
				axisLine: { show: false },
				axisTick: { show: false },
				axisLabel: { show: false },
				splitLine: { show: false }
			},
			polar: {},
			series: [{
				type: 'custom',
				coordinateSystem: 'polar',
				renderItem: renderItem
			}]
		};

/* 		setInterval(function () {
			var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
			chart.setOption({
				dataset: {
					source: nextSource
				}
			});
		}, 3000); */
	  
/*****************************************************************************************/

      chart.setOption(option)
    }
  }
//com-sap-sac-sample-echarts-gauge
  customElements.define('com-sap-sample-echarts-gauge', SampleGuage)
})()