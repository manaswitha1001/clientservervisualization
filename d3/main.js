
function my() {


    var scaler = document.getElementById("scaling").value;

    var c = document.getElementById("C-value").value;

    url="http://127.0.0.1:5000/api/"
    dataurl = url.concat(scaler).concat("/").concat(c);
    
   
    
    d3.json(dataurl).then(function(data) {



	   console.log(data)


  var margin = {top: 50, right: 50, bottom: 50, left: 50}, width = 600- margin.left - margin.right , height = 1000 - margin.top - margin.bottom; // Use the window's height


  
  var xScale = d3.scaleLinear()
      .domain([0, 1]) 
      .range([0, width]); 

  
  var yScale = d3.scaleLinear()
      .domain([0, 1]) 
      .range([height, 0]); 

  
  var line = d3.line()
      .x(function(d) { return xScale(d.fpr); }) 
      .y(function(d) { return yScale(d.tpr); }) 
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); 

  
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); 
  svg.append("path")
      .datum(data) 
      .attr("class", "line") 
      .attr("d", line)
      .attr("fill", "none")
              .attr("stroke", "green")
              .attr("stroke-width", "3px"); 



  svg.append("text")
         .attr("transform",
               "translate(" + (width / 2) + " ," + 0 + ")")
         .attr("text-anchor", "middle")
         .text("ROC Curve");

 
      svg.append("text")
         .attr("transform",
               "translate(" + (width / 2) + " ," + (height + margin.bottom - 15) + ")")
         .attr("text-anchor", "middle")
         .text("False positive rate");
      
  
      svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 0 - margin.left + 15)
         .attr("x", 0 - (height / 2))
         .attr("text-anchor", "middle")
         .text("True positive rate");



     });
   }
