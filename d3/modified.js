
function my() {


    var scaler = document.getElementById("scaling").value;

    var c = document.getElementById("C-value").value;

    url="http://127.0.0.1:5000/api/"
    dataurl = url.concat(scaler).concat("/").concat(c);
    
   
    
    d3.json(dataurl).then(function(data) {



	   console.log(data)


  var margin = {top: 50, right: 50, bottom: 50, left: 50}, width = 600- margin.left - margin.right , height = 1000 - margin.top - margin.bottom; // Use the window's height


  // 5. X scale will use the index of our data
  var xScale = d3.scaleLinear()
      .domain([0, 1]) // input
      .range([0, width]); // output

  // 6. Y scale will use the randomly generate number 
  var yScale = d3.scaleLinear()
      .domain([0, 1]) // input 
      .range([height, 0]); // output 

  // 7. d3's line generator
  var line = d3.line()
      .x(function(d) { return xScale(d.fpr); }) // set the x values for the line generator
      .y(function(d) { return yScale(d.tpr); }) // set the y values for the line generator 
      //.curve(d3.curveMonotoneX) // apply smoothing to the line

  // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number

  // 1. Add the SVG to the page and employ #2
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // 3. Call the x axis in a group tag
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

  // 4. Call the y axis in a group tag
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

  // 9. Append the path, bind the data, and call the line generator 
  svg.append("path")
      .datum(data) // 10. Binds data to the line 
      .attr("class", "line") // Assign a class for styling 
      .attr("d", line)
      .attr("fill", "none")
              .attr("stroke", "green")
              .attr("stroke-width", "3px"); // 11. Calls the line generator 


  //
  svg.append("text")
         .attr("transform",
               "translate(" + (width / 2) + " ," + 0 + ")")
         .attr("text-anchor", "middle")
         .text("ROC Curve");

      // Add the text label for the x axis
      svg.append("text")
         .attr("transform",
               "translate(" + (width / 2) + " ," + (height + margin.bottom - 15) + ")")
         .attr("text-anchor", "middle")
         .text("False positive rate");
      
      // Add the text label for the y axis
      svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 0 - margin.left + 15)
         .attr("x", 0 - (height / 2))
         .attr("text-anchor", "middle")
         .text("True positive rate");



     });
   }
