function buildMetadata(sample) {

  var url = `/metadata/${sample}`;
  d3.json(url).then(function (response) {
    var sample_metadata = d3.select("#sample-metadata")


    sample_metadata.html("");


    Object.entries(response).forEach(function([key, value]) {      
     
      var row = sample_metadata.append("tr");
      
     
      var cell = row.append("td");


  cell.text(`${key}: ${value}`);

// Build the Gauge Chart
if(key === "WFREQ") {
  // Pass the wash frequency value into the build gauege function
  buildGauge(value);
}
});
});
}

function buildCharts(sample) {

  var url = `/samples/${sample}`;
  d3.json(url).then(function(response) {

    var tenSamples = response.sample_values.slice(0, 10);
    var tenID = response.otu_ids.slice(0, 10);
    var tenLabels = response.otu_labels.slice(0, 10);


    var pieTrace = {
      values: tenID,
      labels: tenSamples,
      type: 'pie',
      hoverinfo: tenLabels
    };
    var bubbleTrace = {
      x: tenID,
      y: tenSamples,
      mode: 'markers',
      text: tenLabels,
      marker: {
        size: tenSamples,
        color: tenID,
      }
    };
    pie = [pieTrace];
    bubble = [bubbleTrace];


    Plotly.newPlot("pie", pie);
    Plotly.newPlot("bubble", bubble);
  });

}

function init() {

  var selector = d3.select("#selDataset");


  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });


    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {

  buildCharts(newSample);
  buildMetadata(newSample);
}


init();
