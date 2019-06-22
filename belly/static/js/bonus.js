function buildGauge(WFREQ) {
  
    var level = WFREQ;

 
    var degrees = 180 - WFREQ * 20,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z'; 
    var path = mainPath.concat(pathX,space,pathY,pathEnd);


    var data = [{ type: 'scatter',
        x:[0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'WFREQ',
            text: level,
            hoverinfo: 'text+name'},

        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
        rotation: 90,
        text: ['8-9','7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(6, 100, 0, .5)','rgba(20, 120, 10, .5)','rgba(50, 140, 20, .5)', 'rgba(100, 150, 30, .5)',
                                'rgba(150, 160, 40, .5)', 'rgba(180, 180, 60, .5)', 'rgba(202, 204, 95, .5)',
                                'rgba(222, 210, 160, .5)', 'rgba(232, 226, 202, .5)', 'rgba(255, 255, 255, 0)']},
        labels: ['8-9','7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
    }];

    var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 400,
        width: 400,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
}
