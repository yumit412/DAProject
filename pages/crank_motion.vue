 <template>
  <section class="container">
    <h1 class="title">
      Crank Motion Graph
    </h1>
    <div id="chart" ref="chart"></div>
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Graph_of_Piston_Motion.png" alt="Example graph of Piston Motion">
    </div>
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
const d3 = require('d3')
export default {
  name: 'Graph',
  data() {
    return {
      name: 'test',
      vel: [
        { dis: 0, time: 0.0 },
        { dis: 5, time: 1.5 },
        { dis: 5, time: 5.0 },
        { dis: 0, time: 6.0 },
        { dis: 0, time: 6.4 }
      ],
      graphdata: [
        { x: 1, y: 2 },
        { x: 10, y: 1 },
        { x: 1, y: 4 },
        { x: 4, y: 3 },
        { x: 5, y: 6 },
        { x: 5, y: 5 }
      ]
    }
  },
  head: {
    title: 'test'
  },
  mounted: function() {
    this.draw()
  },
  methods: {
    calcAcc: function() {
      let vel = this.vel
      // 속도에 대하여 Align이 되어있다고 가정하자 ...

      // 각 속도에 대하여 가속도 계산
      var V0 = 0
      var V1 = 0
      var T0 = 0
      var T1 = 0

      var dv = V1 - V0
      var dt = T1 - T0
      if (dt === 0.0) {
        return // or continue
      }
      var a = (V1 - V0) / (T1 - T0)
    },
    draw: function() {
      let data = this.vel
      if (data === undefined) {
        return
      }

      var graphWidth = 1000
      var graphHeight = 600

      graphWidth = this.$refs.chart.clientWidth
      graphHeight = this.$refs.chart.clientHeight

      var max = data.reduce(function(previous, current) {
        return previous.time > current.time ? previous : current
      })

      var min = data.reduce(function(previous, current) {
        return previous.time > current.time ? current : previous
      })

      var xScalefnc = d3
        .scaleLinear()
        .domain([min.time, max.time])
        .range([50, graphWidth])

      var yScalefnc = d3
        .scaleLinear()
        .domain([0, 10])
        .range([graphHeight - 50, 10])

      // create a line function that can convert data[] into x and y points
      var line = d3
        .line()
        .x(function(d, i) {
          return xScalefnc(d.time)
        })
        .y(function(d, i) {
          return yScalefnc(d.dis)
        })

      // Add an SVG element
      var graph = d3
        .select('#chart')
        .append('svg:svg')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .append('svg:g')

      // add line graph
      graph
        .append('svg:path')
        .data([data])
        .attr('d', line(data))
        .attr('class', 'displacement')

      // add X Axis
      var xAxis = graph
        .append('g')
        .attr('transform', 'translate(0, ' + (graphHeight - 50) + ')')
        .call(d3.axisBottom(xScalefnc))

      // add Y Axis for displacement
      var yAxisForDisplacement = graph
        .append('g')
        .attr('transform', 'translate(50, 0)')
        .call(d3.axisLeft(yScalefnc))
      // add

      // var yAxisForVelocity = graph
      //   .append('g')
      //   .attr('transform', 'translate(70, 0)')
      //   .call(d3.axisLeft(yScalefnc))

      // var yAxisForAccelation = graph
      //   .append('g')
      //   .attr('transform', 'translate(90, 0)')
      //   .call(d3.axisLeft(yScalefnc))

      // var yAxisForJerk = graph
      //   .append('g')
      //   .attr('transform', 'translate(110, 0)')
      //   .call(d3.axisLeft(yScalefnc))
    }
  }
}
</script>

<style>
/* set the CSS */
#chart {
  width: 800px;
  height: 500px;
  align-content: center;
  align-self: center;
}
.displacement {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
</style>
