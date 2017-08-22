const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
let data = [];

let margin = {top: 40, right: 120, bottom: 60, left:60}
let widthChart = 1300 - margin.left - margin.right;
let heightChart = 460 - margin.top - margin.bottom;
const chartHandler = document.getElementById("chart");
let wrapperBox = document.getElementById("wrapper");
const monthName = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October", "November", "December"];
const colors = [
  {r: 32, g: 96, b: 255},
  {r: 32, g: 159, b: 255},
  {r: 0,  g:207, b: 255},
  {r: 170, g: 255, b: 255},
  {r: 255, g: 255, b: 84},
  {r: 255, g: 240, b: 0},
  {r: 255, g: 191, b: 0},
  {r: 255, g: 168, b: 0},
  {r: 255, g: 138, b: 0},
  {r: 255, g: 112, b: 0},
  {r: 255, g: 77, b: 0},
  {r: 255, g: 0, b: 0} ];

fetch(url)
  .then((resp)=> resp.json())
  .then(function(receivedData) {
      data = receivedData;
      /* data processing */
      const minTime = new Date(data.monthlyVariance[0].year, data.monthlyVariance[0].month);
      const maxTime = new Date(data.monthlyVariance[data.monthlyVariance.length-1].year,
        data.monthlyVariance[data.monthlyVariance.length-1].month);
      let maxY = 12; //months
      let y =  d3.scaleLinear().domain([0,maxY]).range([0, heightChart]);
      let x = d3.scaleTime().domain([minTime, maxTime]).range([0, widthChart]);
      let chart = d3.select(".chart")
            .attr("width",widthChart+margin.left+margin.right)
            .attr("height",heightChart+margin.top+margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      let xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y"));
      let yAxis = d3.axisLeft(y);
      let rectangleHeight = heightChart/maxY;
      let rectangleWidth = widthChart/Math.ceil(data.monthlyVariance.length/12);
      const baseTemperature = data.baseTemperature;

/* drawing */
      let rectangle = chart.selectAll("g")
          .data(data.monthlyVariance)
          .enter().append("g")

          rectangle.append("rect")
            .attr("y", function(d){ return y(parseInt(d.month)-1);})
            .attr("x", function(d){ return x(new Date(d.year,0));})
            .attr("height",rectangleHeight)
            .attr("width", rectangleWidth)
            .attr("id",function(d){ return data.monthlyVariance.indexOf(d)+1;})
            .attr("fill", function(d){
                  let temp = (baseTemperature + d.variance).toFixed(2);
                  let colorIndex;
                  if (temp < 2) { colorIndex = 0; }
                  else if (temp > 12 ) { colorIndex = 11;}
                  else if (temp >=2 && temp <=12) {
                    colorIndex = Math.round(temp)-2; };
                  let color = "rgb("+colors[colorIndex].r+","+
                                    colors[colorIndex].g+","+
                                    colors[colorIndex].b+")";
                  return color;
              });

/* axes description */
      chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + heightChart + ")")
        .call(xAxis);

      chart.append("g").attr("class", "axis").call(yAxis);

      chart.append('text').text('MONTHS')
                .attr("class","axis-description")
                .attr('x', -30)
                .attr('y', 90)
                .attr("transform", "rotate(-90 -30 90)");

      chart.append('text').text('text')
                .attr("class","source")
                .attr('x', 130)
                .attr('y', heightChart+50)
                .attr('fill', 'black');

      chart.append('text').text("X axis")
                .attr("class", "axis-description")
                .attr('x', 900)
                .attr('y', heightChart+40)
                .attr('fill', 'black');
      chart.append('text').text("title")
                .attr("class", "title")
                .attr('x', 100)
                .attr('y',-10)
                .attr('fill', 'black');
      /* key
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
/* tooltip */
      let tooltip = document.createElement("div");
      tooltip.classList.add('tooltip');
      tooltip.setAttribute("id", "tooltip");
      wrapperBox.appendChild(tooltip);

      chartHandler.addEventListener("mouseover", function(event){
        let ev = parseInt(event.target.id)-1;
        if (!isNaN(ev)) {
          let top = event.layerY-20;
          let left = event.layerX+30;
          let month = monthName[parseInt(data.monthlyVariance[ev].month)-1];
          tooltip.innerHTML =(
            data.monthlyVariance[ev].year + " " + month +"<br>"+
            ((baseTemperature + data.monthlyVariance[ev].variance).toFixed(2))+
            "<br>"+data.monthlyVariance[ev].variance);
          tooltip.style.top = top.toString()+"px";
          tooltip.style.left = left.toString()+"px";
          tooltip.style.zIndex= "2";
        } else {
          tooltip.style.zIndex= "-2";
        }
      }, false);

})
  .catch(function(error){
    console.log(error);
  });
