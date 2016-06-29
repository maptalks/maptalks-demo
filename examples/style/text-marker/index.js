
var map = new maptalks.Map('map', {
  center: [121.48542888885189, 31.228541533313702],
  zoom: 14,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains)
  })
});

var layer = new maptalks.VectorLayer('vector');
map.addLayer(layer);
var symbol = {
    'textName'          : 'TEXT MARKER',
    'textFaceName'      : 'monospace',
    'textSize'          : 12,
    'textFill'          : '#6fa8dc'
};
var geometry = new maptalks.Marker([121.485428, 31.228541], {'symbol' : symbol});
layer.addGeometry(geometry);