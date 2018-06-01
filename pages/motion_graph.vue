 <template>
  <section class="container">
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Graph_of_Piston_Motion.png" alt="Example graph of Piston Motion">
    </div>
  </section>
</template>

<style scoped>
.title {
  margin: 50px 0;
}
</style>

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
        { dis: 0, time: 0.0 },
        { dis: 0, time: 0.0 },
        { dis: 0, time: 0.0 },
        { dis: 0, time: 0.0 },
        { dis: 0, time: 0.0 },
        { dis: 0, time: 0.0 },
        { dis: 0, time: 0.0 },
        { dis: 0, time: 0.0 },
        { dis: 0, time: 0.0 }
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
    draw: function() {
      let data = this.graphdata
      if (data === undefined) {
        return
      }

      var graphWidth = 1000
      var graphHeight = 600
      var xScalefnc = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, graphWidth])
      var yScalefnc = d3
        .scaleLinear()
        .domain([0, 10])
        .range([graphHeight, 0])

      // create a line function that can convert data[] into x and y points
      var line = d3
        .line()
        .x(function(d, i) {
          return xScalefnc(i)
        })
        .y(function(d) {
          return yScalefnc(d.y)
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
        .attr('class', 'line')

      // add X Axis
      var xAxis = graph
        .append('g')
        .attr('transform', 'translate(0, ' + (graphHeight - 50) + ')')
        .call(d3.axisBottom(xScalefnc))

      // add Y Axis
      var yAxis = graph
        .append('g')
        .attr('transform', 'translate(50, 0)')
        .call(d3.axisLeft(yScalefnc))
    }
  }
}
</script>

<style>
/* set the CSS */
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
</style>
