
var map = new maptalks.Map('map', {
  center: [-0.113049,51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains),
    attribution: '$(attribution)'
  })
});

var layer = new maptalks.VectorLayer('v').addTo(map);

var center = map.getCenter(), width = 0.055, height = 0.03,
  markers = [];
for (var i = 65; i <= 90; i++) {
  var x = center.x + (Math.random() - 0.5) * width;
  var y = center.y + (Math.random() - 0.5) * height;
  var marker = new maptalks.Marker([x, y], {
    'symbol' : {
      'textName' : String.fromCharCode(i),
      'textSize' : 30,
      'textFill' : 'White',
      'markerType' : 'ellipse',
      'markerFill' : '#0e595e',
      'markerFillOpacity' : 0.4,
      'markerLineWidth' : 2,
      'markerLineColor' : 'white',
      'markerWidth' : 70,
      'markerHeight' : 70
    }
  }).on('mouseenter', function (e) {
    //update markerFill to highlight
    e.target.updateSymbol({
      'markerFill' : '#f00'
    });
  }).on('mouseout', function (e) {
    //reset color
    e.target.updateSymbol({
      'markerFill' : '#0e595e'
    });
  });
  markers.push(marker);
}
layer.addGeometry(markers);
