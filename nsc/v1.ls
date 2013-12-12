url = \data.json
org <- d3.json url
data = []
max = null
for name of org => do
  data.push {n: name, v: org[name][0]}
  max = org[name][0] unless org[name][0] < max

scale = d3.scale.linear!
  .domain [0, max]
  .range [0, 500]

data.sort -> d3.descending &0.v, &1.v

d3.select \#visual
  .selectAll \svg
  .data data
  .enter!
    .append \svg .attr \class \c
      ..append \circle
        .attr \r -> scale(&0.v)
        .attr \cy -> 100
        .attr \cx -> 100
        .style \stroke \#00FFFF
        .style \fill \#FF0000
