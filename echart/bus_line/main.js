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
  class SampleBusLine extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      this.render()
    }

    // ------------------
    // Life cycle methods
    // ------------------
    onCustomWidgetResize (width, height) {
      this.render()
    }

    async render () {
      await getScriptPromisify('https://api.map.baidu.com/getscript?v=2.0&ak=5kcQTUe1WxudZLl92VRuLRgazlTR4B7d')
      await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')
      await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/extension/bmap.min.js')

      if (this._myChart) {
        echarts.dispose(this._myChart)
      }
      var myChart = this._myChart = echarts.init(this._root, 'dark')

      $.get('https://cdn.jsdelivr.net/gh/apache/incubator-echarts-website@asf-site/examples' + '/data/asset/data/lines-bus.json', function (data) {
        var hStep = 300 / (data.length - 1)
        var busLines = [].concat.apply([], data.map(function (busLine, idx) {
          var prevPt
          var points = []
          for (var i = 0; i < busLine.length; i += 2) {
            var pt = [busLine[i], busLine[i + 1]]
            if (i > 0) {
              pt = [
                prevPt[0] + pt[0],
                prevPt[1] + pt[1]
              ]
            }
            prevPt = pt

            points.push([pt[0] / 1e4, pt[1] / 1e4])
          }
          return {
            coords: points,
            lineStyle: {
              normal: {
                color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
              }
            }
          }
        }))
        myChart.setOption({
          bmap: {
            center: [116.46, 39.92],
            zoom: 10,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  featureType: 'water',
                  elementType: 'all',
                  stylers: {
                    color: '#031628'
                  }
                },
                {
                  featureType: 'land',
                  elementType: 'geometry',
                  stylers: {
                    color: '#000102'
                  }
                },
                {
                  featureType: 'highway',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'arterial',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'arterial',
                  elementType: 'geometry.stroke',
                  stylers: {
                    color: '#0b3d51'
                  }
                },
                {
                  featureType: 'local',
                  elementType: 'geometry',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'railway',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'railway',
                  elementType: 'geometry.stroke',
                  stylers: {
                    color: '#08304b'
                  }
                },
                {
                  featureType: 'subway',
                  elementType: 'geometry',
                  stylers: {
                    lightness: -70
                  }
                },
                {
                  featureType: 'building',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'all',
                  elementType: 'labels.text.fill',
                  stylers: {
                    color: '#857f7f'
                  }
                },
                {
                  featureType: 'all',
                  elementType: 'labels.text.stroke',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'building',
                  elementType: 'geometry',
                  stylers: {
                    color: '#022338'
                  }
                },
                {
                  featureType: 'green',
                  elementType: 'geometry',
                  stylers: {
                    color: '#062032'
                  }
                },
                {
                  featureType: 'boundary',
                  elementType: 'all',
                  stylers: {
                    color: '#465b6c'
                  }
                },
                {
                  featureType: 'manmade',
                  elementType: 'all',
                  stylers: {
                    color: '#022338'
                  }
                },
                {
                  featureType: 'label',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                }
              ]
            }
          },
          series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              // color: '#c23531',
              // color: 'rgb(200, 35, 45)',
              opacity: 0.2,
              width: 1
            },
            progressiveThreshold: 500,
            progressive: 200
          }, {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            lineStyle: {
              width: 0
            },
            effect: {
              constantSpeed: 20,
              show: true,
              trailLength: 0.1,
              symbolSize: 1.5
            },
            zlevel: 1
          }]
        })
      })
    }
  }

  customElements.define('com-sap-sample-echarts-bus_line', SampleBusLine)
})()