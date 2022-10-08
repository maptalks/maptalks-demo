const map = new maptalks.Map('map', {
  center: [-0.113049, 51.498568],
  zoom: 14,
  pitch: 80,
  bearing: 180,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains),
    attribution: '$(attribution)',
  }),
  lights: {
    ambient: {
      resource: {
        url: 'env.hdr',
      },
      color: [1, 1, 1],
      exposure: 1,
    },
    directional: {
      color: [1, 1, 1],
      lightColorIntensity: 5000,
      direction: [1, -0.4, -1],
    },
  },
});

const gui = new dat.GUI({
  width: 250,
});
const Config = function () {
  this.setSymbol = false;
};
const options = new Config();
const url = 'alien.glb';
const symbol = {
  url: 'alien.glb',
  rotation: [0, 0, 0],
  scale: [2, 2, 2],
  uniforms: {
    polygonFill: [0.8, 0.0, 0.0, 1.0],
  },
};
const newSymbol = {
  url: 'Fox.gltf',
  rotation: [0, 0, 90],
  scale: [2, 2, 2],
  animation: true,
  loop: true,
  uniforms: {
    polygonFill: [0.0, 0.8, 0.0, 1.0],
  },
};

const gltfLayer = new maptalks.GLTFLayer('gltf');
const position = map.getCenter();
const gltfMarker = new maptalks.GLTFMarker(position, {
  symbol: symbol,
}).addTo(gltfLayer);
const groupGLLayer = new maptalks.GroupGLLayer('gl', [gltfLayer]).addTo(map);

//symbol control
const symbolController = gui.add(options, 'setSymbol').name('set symbol');
symbolController.onChange(function (value) {
  if (value) {
    gltfMarker.setSymbol(newSymbol);
  } else {
    gltfMarker.setSymbol(symbol);
  }
});