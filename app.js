/*
const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let data = [];

let margin = {top: 40, right: 120, bottom: 60, left:40}
let widthChart = 1300 - margin.left - margin.right;
let heightChart = 620 - margin.top - margin.bottom;
const chartHandler = document.getElementById("chart");
let wrapperBox = document.getElementById("wrapper");

function parseTime(timeString) {
  let timeArray = timeString.split(":");
  let min = parseInt(timeArray[0]);
  let sec = parseInt(timeArray[1]);
  return new Date(2000,0,1,0,min,sec);
}

fetch(url)
  .then((resp)=> resp.json())
  .then(function(receivedData) {
      data = receivedData;
    */  /* data processing
      console.log(data[0]);
      const axisMarginY = 1;
      let maxY = data.length + axisMarginY;
      let y =  d3.scaleLinear().domain([maxY,0]).range([heightChart, 0]);
      let firstTime = parseTime(data[0].Time);
      let lastTime = parseTime(data[data.length-1].Time);
      const timeAxisMarginX = 5;
      let timeRange = (Math.ceil(lastTime - firstTime)/1000) + timeAxisMarginX;
      let min = Math.ceil(timeRange/60);
      let sec = timeRange - (min*60);
      let minTime = new Date(2000,0,1,0,0,0);
      let maxTime = new Date(2000,0,1,0,min,sec);
      let chart = d3.select(".chart")
            .attr("width",widthChart+margin.left+margin.right)
            .attr("height",heightChart+margin.top+margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      let x = d3.scaleTime().domain([maxTime, minTime]).range([0, widthChart]);
      let xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%M:%S"));
      let yAxis = d3.axisLeft(y);
*/
/* drawing
      let point = chart.selectAll("g")
          .data(data)
          .enter().append("g");
      const redPoint = "#c40000";
      const greenPoint = "#9dc100";

      point.append("circle")
          .attr("cy", function(d) { return y(d.Place); })
          .attr("cx", function(d) {
            let x1 = d.Seconds-2210;
            let min = Math.floor(x1/60);
            let sec = x1 - (min*60);
            return x(new Date(2000,0,1,0,min,sec)); })
          .attr("r", 6)
          .attr("fill", function(d) {
            if (d.Doping.length>0) return redPoint;
            if (d.Doping.length===0) return greenPoint; })
          .attr("id", function(d) { return d.Place; });

        point.append('text')
          .text(function(d){ return d.Name; })
          .attr("class","point-text")
          .attr('x', function(d) {
            let x1 = d.Seconds-2210;
            let min = Math.floor(x1/60);
            let sec = x1 - (min*60);
            return x(new Date(2000,0,1,0,min,sec))+15; })
          .attr('y', function(d) { return y(d.Place)+5;} )
          .attr('fill', 'black');
*/
/* axes description
      chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + heightChart + ")")
        .call(xAxis);

      chart.append("g").attr("class", "axis").call(yAxis);

      chart.append('text').text('RANKING')
                .attr("class","axis-description")
                .attr('x', 30)
                .attr('y', 90)
                .attr("transform", "rotate(-90 30 90)");

      chart.append('text').text('Source: https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
                .attr("class","source")
                .attr('x', 130)
                .attr('y', heightChart+50)
                .attr('fill', 'black');

      chart.append('text').text("Minutes behinds fastest time")
                .attr("class", "axis-description")
                .attr('x', 900)
                .attr('y', heightChart-10)
                .attr('fill', 'black');
      chart.append('text').text("Scatterplot Graph Visualisation")
                .attr("class", "title")
                .attr('x', 100)
                .attr('y',-10)
                .attr('fill', 'black');

      chart.append('circle')
          .attr("cy", 300)
          .attr("cx", 1000)
          .attr("r", 6)
          .attr("fill", redPoint)
      chart.append('text').text("DOPING")
                .attr("class", "point-text")
                .attr('x', 1020)
                .attr('y', 300+5)
                .attr('fill', 'black');

      chart.append('circle')
          .attr("cy", 320)
          .attr("cx", 1000)
          .attr("r", 6)
          .attr("fill", greenPoint)
      chart.append('text').text("NO DOPING")
                .attr("class", "point-text")
                .attr('x', 1020)
                .attr('y', 320+5)
                .attr('fill', 'black');
*/
/* signature
      chart.append('defs').append('path').attr('id','signature')
                        .attr('d','M550 350 L900 200')
                        //.attr('stroke', 'black')
                        .attr('fill','transparent');
      chart.append('use').attr('xlink:href', '#signature');
      chart.append('text')
                    .append('textPath').attr('xlink:href','#signature')
                        .text('created by Sebastian Sporek')
                  .attr('x', 150)
                  .attr('y', 150)
                  .attr("class", "sign");
*/
/* tooltip
      let tooltip = document.createElement("div");
      tooltip.classList.add('tooltip');
      tooltip.setAttribute("id", "tooltip");
      wrapperBox.appendChild(tooltip);

      chartHandler.addEventListener("mouseover", function(event){
        let ev = parseInt(event.target.id)-1;
        if (!isNaN(ev)) {
          let top = 100;
          let left = 100;
          tooltip.innerHTML =(
            data[ev].Name+","+data[ev].Nationality+"<br>"+
            "Year:"+data[ev].Year+", Time:"+data[ev].Time+"<br><br>"+
            data[ev].Doping
          );
          tooltip.style.top = top.toString()+"px";
          tooltip.style.left = left.toString()+"px";
          tooltip.style.zIndex= "2";
        } else {
          tooltip.style.zIndex= "-2";
        }
      }, false);
*/
})
  .catch(function(error){
    console.log(error);
  });
