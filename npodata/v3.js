nv.addGraph(function() {
  var chart = nv.models.scatterChart()
                .showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
                .showDistY(true)
                .transitionDuration(350)
                .color(d3.scale.category10().range());

  //Configure how the tooltip looks.
  chart.tooltipContent(function(key) {
      return '<h3>' + key + '</h3>';
  });

  //Axis settings
  chart.xAxis.tickFormat(d3.format('0f'));
  chart.yAxis.tickFormat(d3.format('0f'));

  //We want to show shapes other than circles.
  chart.scatter.onlyCircles(false);

  var data = [];
  var groups = {};
  d3.csv('v3.csv', function(rows){
    rows.forEach(function(d){
      if(d.year){
        if(!groups.hasOwnProperty(d.year)){
          groups[d.year] = [];
        }
        if(d.sizeo && d.size){
          var s = 'circle';
          groups[d.year].push({
            x: d.size,
            y: d.sizeo,
            size: d.size - d.sizeo,
            shape: s 
          });
        }
      }
    });
    for(var g in groups){
      if(groups[g].length > 0){
        data.push({
          key: g,
          values: groups[g]
        });
      }
    }
    d3.select('#chart svg')
      .datum(data)
      .call(chart);
    return chart;
  });

  nv.utils.windowResize(chart.update);
});


